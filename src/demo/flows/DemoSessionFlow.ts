import { demoWebshopCredentials } from '../../config/env';
import type { DemoHeader } from '../components/DemoHeader';
import type { DemoHomePage } from '../pages/DemoHomePage';
import type { DemoLoginPage } from '../pages/DemoLoginPage';

type Deps = {
  header: DemoHeader;
  homePage: DemoHomePage;
  loginPage: DemoLoginPage;
};

/** Opening the Demo Web Shop, logging in and logging out: the start and end of every demo test case. */
export class DemoSessionFlow {
  constructor(private readonly deps: Deps) {}

  /** Open Demowebshop and wait for the page (window title begins with "Demo"). */
  async openSite(): Promise<void> {
    await this.deps.homePage.open();
  }

  /**
   * Click Log in, enter the email and password from .env (Tosca {PL[Email]} / {PL[Password]}) and submit.
   * Test cases that list these as separate steps (TC04) call the login page directly instead.
   */
  async login(): Promise<void> {
    const { header, loginPage } = this.deps;
    const { username, password } = demoWebshopCredentials();
    await header.clickLogin();
    await loginPage.expectDisplayed();
    await loginPage.enterEmail(username);
    await loginPage.enterPassword(password);
    await loginPage.submit();
  }

  /** After login, the account link in the header is present and shows the logged-in user. */
  async expectLoggedIn(): Promise<void> {
    await this.deps.header.expectLoggedInAs(demoWebshopCredentials().username);
  }

  /** Click Log out. The browser itself is closed by Playwright after the test. */
  async logout(): Promise<void> {
    await this.deps.header.logout();
  }
}
