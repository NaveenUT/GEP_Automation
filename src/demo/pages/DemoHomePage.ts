import { BasePage } from '../../core/BasePage';

/** Demo Web Shop home page. */
export class DemoHomePage extends BasePage {
  /** Open the home page (the project's baseURL) and wait until the window title begins with "Demo". */
  async open(): Promise<void> {
    await this.openUrl('/');
    await this.expectLoaded();
  }

  /** Tosca "Wait On Open" for the window caption "Demo*": the window title begins with "Demo". */
  async expectLoaded(): Promise<void> {
    await this.expectTitle(/^Demo/);
  }
}
