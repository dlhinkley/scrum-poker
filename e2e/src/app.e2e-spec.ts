import { browser, by, element, logging } from 'protractor';
import { AppPage } from './app.po';
import { AddGamePage } from './app.add-game';
import { AddUserPage } from './app.add-user';
import { PlayPage } from './app.play';

describe('scrum poker App', () => {
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

    describe('Normal Path', () => {

        it('should ask for game name', async () => {
            await page.navigateTo();
            await addGame.waitForTitle();
            await addGame.setNameText();
            await addGame.clickSubmit();
            await browser.sleep(1000);
        });

        it('should accept user name', async () => {
            await addUser.waitForTitle();
            await addUser.setNameText(0);
            await addUser.clickSubmit();
            await browser.sleep(1000);
        });

        it('should be in voting mode', async () => {
            await play.waitForGameName();
            await browser.sleep(1000);
            expect(await play.getGameNameText()).toEqual(play.gameName);

            expect(await play.getStatusTitleText()).toEqual(play.statusTitleVoting);
            await play.waitForCardButton(0);

            expect(await play.getCardButtonText(0)).toEqual(play.cardVotingText);
            expect(await play.getCardNameText(0)).toEqual(addUser.userName[0]);
        });

        it('should set users points', async () => {
            await play.clickPointButton(1); // 1 point
            await browser.sleep(1000);

            expect(await play.getCardButtonText(0)).toEqual(play.cardVotedText);
            expect(await play.getCardNameText(0)).toEqual(addUser.userName[0]);
        });

        it('should display user points', async () => {
            await play.clickShowButton();
            await browser.sleep(1000);
            expect(await play.getShowButtonText()).toEqual(play.showTrueText);
            expect(await play.getCardButtonText(0)).toEqual('1');
            expect(await play.getCardNameText(0)).toEqual(addUser.userName[0]);
        });

        it('should hide user points', async () => {
            await play.clickShowButton();
            await browser.sleep(1000);
            expect(await play.getShowButtonText()).toEqual(play.showFalseText);
            expect(await play.getCardButtonText(0)).toEqual(play.cardVotedText);
            expect(await play.getCardNameText(0)).toEqual(addUser.userName[0]);
        });

        it('should add user 2', async () => {
            const url = browser.getCurrentUrl();
            browser.manage().deleteAllCookies();
            browser.navigate().refresh();

            await addUser.waitForTitle();

            await addUser.setNameText(1);
            await addUser.clickSubmit();
            await play.waitForGameName();
            await browser.sleep(1000);

            expect(await play.getGameNameText()).toEqual(play.gameName);
        });

        it('should show voted for both users', async () => {
             await play.clickPointButton(2); // 1 point
             await browser.sleep(1000);

             play.waitForCardButtonText(0, play.cardVotedText);
             expect(await play.getCardButtonText(0)).toEqual(play.cardVotedText);
             expect(await play.getCardNameText(0)).toEqual(addUser.userName[0]);
             expect(await play.getCardButtonText(1)).toEqual(play.cardVotedText);
             expect(await play.getCardNameText(1)).toEqual(addUser.userName[1]);
        });

        it('should display points for both users', async () => {
            await play.clickShowButton();
            await browser.sleep(1000);
            expect(await play.getShowButtonText()).toEqual(play.showTrueText);
            await play.waitForCardButtonText(0, '1');
            expect(await play.getCardButtonText(0)).toEqual('1');
            expect(await play.getCardNameText(0)).toEqual(addUser.userName[0]);
            expect(await play.getCardButtonText(1)).toEqual('2');
            expect(await play.getCardNameText(1)).toEqual(addUser.userName[1]);
        });

        it('should start new game', async () => {
            await play.clickNewRoundButton();
            await browser.sleep(1000);
            await play.waitForCardButtonText(0, play.cardVotingText);

            expect(await play.getShowButtonText()).toEqual(play.showFalseText);
            expect(await play.getCardButtonText(0)).toEqual(play.cardVotingText);
            expect(await play.getCardNameText(0)).toEqual(addUser.userName[0]);
            expect(await play.getCardButtonText(1)).toEqual(play.cardVotingText);
            expect(await play.getCardNameText(1)).toEqual(addUser.userName[1]);
        });
    });
    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);

        await page.printConsole();

        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});
