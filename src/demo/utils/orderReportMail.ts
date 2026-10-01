import path from 'path';
import nodemailer from 'nodemailer';
import { ImapFlow } from 'imapflow';
import type { DemoMailSettings } from '../../config/env';

/**
 * Tosca TC04 steps 22-23: connects to the sender mailbox (SMTP) and sends the report as an attachment.
 * Fails if the server rejects the login or the mail.
 */
export async function sendOrderReportMail(settings: DemoMailSettings, subject: string, body: string, reportPath: string): Promise<void> {
  const { sender, receiver } = settings;
  const transport = nodemailer.createTransport({
    host: sender.host,
    port: sender.port,
    secure: sender.secure,
    auth: { user: sender.user, pass: sender.password },
  });
  try {
    await transport.verify();
    await transport.sendMail({
      from: sender.from,
      to: receiver.address,
      subject,
      text: body,
      attachments: [{ filename: path.basename(reportPath), path: reportPath }],
    });
  } finally {
    transport.close();
  }
}

/**
 * Tosca TC04 steps 24-25: connects to the receiver mailbox (IMAP) and counts the messages in the inbox
 * whose subject contains `subject`. Mail can take a while to arrive, so it searches again until at least
 * one is found or `timeoutMs` has passed.
 */
export async function countReportMails(settings: DemoMailSettings, subject: string, timeoutMs = 120000): Promise<number> {
  const { receiver } = settings;
  const client = new ImapFlow({
    host: receiver.host,
    port: receiver.port,
    secure: receiver.secure,
    auth: { user: receiver.user, pass: receiver.password },
    logger: false,
  });
  await client.connect();
  try {
    const deadline = Date.now() + timeoutMs;
    for (;;) {
      const lock = await client.getMailboxLock('INBOX');
      let found = 0;
      try {
        const matches = await client.search({ subject });
        found = Array.isArray(matches) ? matches.length : 0;
      } finally {
        lock.release();
      }
      if (found > 0 || Date.now() > deadline) return found;
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  } finally {
    await client.logout();
  }
}
