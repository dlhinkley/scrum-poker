import { browser, by, element } from 'protractor';
import { AppPage } from './app.po';

export class AddGamePage {
  private page = new AppPage();
  gameName: string = "Test Game";
  title: string = 'Create Game';
  titleId: string = 'title';

  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async waitForTitle(): Promise<void> {
    return this.page.waitForTextById(this.titleId, this.title);
  }

  async setNameText(): Promise<void> {
    return element(by.id('name')).sendKeys(this.gameName);
  }

  async clickSubmit(): Promise<void> {
    return element(by.css('#submit')).click();
  }


}
