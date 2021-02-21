import { browser, by, element } from 'protractor';

export class AppPage {
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
  };
}
