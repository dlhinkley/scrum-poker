import { browser, by, element, logging } from 'protractor';
import { AppPage } from './app.po';
import { AddGamePage } from './app.add-game';
import { AddUserPage } from './app.add-user';
import { PlayPage } from './app.play';

describe('workspace-project App', () => {
  let page: AppPage;
  let addGame: AddGamePage;
  let addUser: AddUserPage;
  let play: PlayPage;

  beforeEach(() => {
    browser.ignoreSynchronization = true;
    page = new AppPage();
    addGame = new AddGamePage();
    addUser = new AddUserPage();
    play = new PlayPage();
  });

  it('should ask for game name', async () => {
    await page.navigateTo();
    expect(await addGame.getTitleText()).toEqual(addGame.title);
  });

 it('should accept game name', async () => {
    await addGame.setNameText();
    await addGame.clickSubmit();

    await addUser.waitForTitle();

    expect(await addUser.getTitleText()).toEqual(addUser.title);
 });
 it('should accept user name', async () => {
    await addUser.setNameText();
    await addUser.clickSubmit();
    await play.waitForGameName();
    
    expect(await play.getGameNameText()).toEqual(play.gameName);
  });

//  it('should display play page', async () => {

//  });
 /*
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);

    await page.printConsole();
    
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
  */
});
