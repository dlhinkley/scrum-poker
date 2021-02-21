import { browser, logging } from 'protractor';
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
    page = new AppPage();
    addGame = new AddGamePage();
    addUser = new AddUserPage();
    play = new PlayPage();
  });

  it('should accept game  name', async () => {
    await page.navigateTo();
    expect(await addGame.getTitleText()).toEqual(addGame.title);

    await addGame.setNameText();
    await addGame.clickSubmit();
  });

  it('should accept user  name', async () => {
    await browser.sleep(5 * 1000)
    expect(await addUser.getTitleText()).toEqual(addUser.title);
    
    await addUser.setNameText();
    await addUser.clickSubmit();
  });
/*
  it('should display play page', async () => {

    expect(await play.getGameNameText()).toEqual(play.gameName);

  });
  */
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
