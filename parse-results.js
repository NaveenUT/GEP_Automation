const fs = require('fs');
const data = JSON.parse(fs.readFileSync('test-results/results.json', 'utf8'));
function walk(suite, path) {
  const p = path.concat(suite.title).filter(Boolean);
  if (suite.specs) {
    for (const spec of suite.specs) {
      if (!spec.ok) {
        console.log('=== SPEC:', p.join(' > '), '>', spec.title);
        for (const test of spec.tests) {
          for (const result of test.results) {
            console.log('--- status:', result.status);
            for (const err of (result.errors||[])) {
              console.log('ERROR:', err.message);
            }
            for (const att of (result.attachments||[])) {
              console.log('ATTACHMENT:', att.name, att.path);
            }
          }
        }
      }
    }
  }
  if (suite.suites) {
    for (const s of suite.suites) walk(s, p);
  }
}
for (const s of data.suites) walk(s, []);
