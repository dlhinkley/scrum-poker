import { browser, by, element } from 'protractor';
import { AppPage } from './app.po';

export class AddUserPage {
  private page = new AppPage();
  userName = ['Tester1', 'Tester2'];
  title = 'Create User';
  private userTitleId = 'user-title';
  private userTitleEl = element(by.id(this.userTitleId));

  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async waitForTitle(): Promise<void> {
    return this.page.waitForTextById(this.userTitleId, this.title);
  }

  async getTitleText(): Promise<string> {
    return element(by.id('user-title')).getText();
  }

  async setNameText(i: number): Promise<void> {
    return element(by.id('name')).sendKeys(this.userName[i]);
  }

  async clickSubmit(): Promise<void> {
    return element(by.id('submit')).click();
  }


}
