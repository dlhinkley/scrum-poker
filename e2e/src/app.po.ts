import { browser, protractor, by, element } from 'protractor';

export class AppPage {
  private EC = protractor.ExpectedConditions;
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText();
  }
  async printConsole(): Promise<void> {
    return browser.manage().logs().get('browser').then(browserLog => {
        browserLog.forEach(log => console.error(log.message));
    })
    .catch(() => console.log('Could not get browser log.'));
  }
   async waitForElementById(id: string): Promise<void> {
      const el = element(by.id(id));
    return browser.wait(this.EC.presenceOf(el), 2000, 'Element ' + id + ' not found');
  }
   async waitForTextById(id: string, text: string): Promise<void> {
      const el = element(by.id(id));
    return browser.wait(this.EC.textToBePresentInElement(el, text), 2000, text + ' not found in ' + id);
  }

}
