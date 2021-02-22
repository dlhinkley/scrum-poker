import { browser, by, element } from 'protractor';

export class AddGamePage {
  gameName: string = "Test Game";
  title: string = 'Create Game';

  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getTitleText(): Promise<string> {
    return element(by.id('title')).getText();
  }

  async setNameText(): Promise<void> {
    return element(by.id('name')).sendKeys(this.gameName);
  }

  async clickSubmit(): Promise<void> {
    return element(by.css('#submit')).click();
  }


}
