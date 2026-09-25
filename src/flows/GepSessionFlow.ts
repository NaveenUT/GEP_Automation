import type { Market } from '../config/markets';
import { credentialsFor } from '../config/env';
import type { RegionBehaviour } from '../regions';
import type { GepHeader } from '../components/GepHeader';
import type { GepPopups } from '../components/GepPopups';
import type { GepHomePage } from '../pages/GepHomePage';
import type { GepLoginPage } from '../pages/GepLoginPage';
import { COMMON } from '../../data/common';

type Deps = {
  market: Market;
  region: RegionBehaviour;
  homePage: GepHomePage;
  header: GepHeader;
  popups: GepPopups;
  loginPage: GepLoginPage;
};

/**
 * Tosca: Preconditions (launch the website, sign in) and the post condition (sign out).
 * Flows don't create report steps themselves: each test wraps the calls in named test.step() blocks.
 */
export class GepSessionFlow {
  constructor(private readonly deps: Deps) {}

  /** Tosca: Precondition-Launch the HS Website. Opens the market's site and clears the launch popups. */
  async openSite(): Promise<void> {
    const { market, region, homePage, header, popups } = this.deps;
    await homePage.open(region.siteUrl(market));
    await region.clearLaunchPopups({ home: homePage, header, popups, market });
  }

  /** Tosca: Sign in. `tcId` picks per-test credentials from .env (see credentialsFor). */
  async login(tcId?: string): Promise<void> {
    const { market, header, loginPage } = this.deps;
    const { username, password } = credentialsFor(market, tcId);
    await header.clickSignIn();
    await loginPage.login(username, password);
    await loginPage.answerSecurityQuestionsIfShown(COMMON.securityAnswer);
    await header.expectLoggedIn();
  }

  /** Tosca: Post condition CloseBrowser (signs out on Gen Z sites only). */
  async signOutAtEnd(): Promise<void> {
    await this.deps.region.signOutAtEnd(this.deps.header);
  }
}
