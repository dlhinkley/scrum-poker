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
            expect(await addGame.getTitleText()).toEqual(addGame.title);
        });

        it('should accept game name', async () => {
            await addGame.setNameText();
            await addGame.clickSubmit();

            await addUser.waitForTitle();

            expect(await addUser.getTitleText()).toEqual(addUser.title);
        });

        it('should accept user name', async () => {
            await addUser.setNameText(0);
            await addUser.clickSubmit();
            await play.waitForGameName();

            expect(await play.getGameNameText()).toEqual(play.gameName);
        });

        it('should be in voting mode', async () => {

            expect(await play.getStatusTitleText()).toEqual(play.statusTitleVoting);
            await play.waitForCardButton(0);

            expect(await play.getCardButtonText(0)).toEqual(play.cardVotingText);
            expect(await play.getCardNameText(0)).toEqual(addUser.userName[0]);
        });

        it('should set users points', async () => {
            await play.clickPointButton(1); // 1 point

            expect(await play.getCardButtonText(0)).toEqual(play.cardVotedText);
        });

        it('should display user points', async () => {
            await play.clickShowButton();
            expect(await play.getShowButtonText()).toEqual(play.showTrueText);
            expect(await play.getCardButtonText(0)).toEqual('1');
        });

        it('should hide user points', async () => {
            await play.clickShowButton();
            expect(await play.getShowButtonText()).toEqual(play.showFalseText);
            expect(await play.getCardButtonText(0)).toEqual(play.cardVotedText);
        });

        it('should add user 2', async () => {
            const url = browser.getCurrentUrl();
            browser.manage().deleteAllCookies();
            browser.navigate().refresh();

            await addUser.waitForTitle();

            await addUser.setNameText(1);
            await addUser.clickSubmit();
            await play.waitForGameName();

            expect(await play.getGameNameText()).toEqual(play.gameName);
        });

        it('should show voted for both users', async () => {
             await play.clickPointButton(2); // 1 point

            expect(await play.getCardButtonText(0)).toEqual(play.cardVotedText);
            expect(await play.getCardButtonText(1)).toEqual(play.cardVotedText);
        });

        it('should display pointsfor both users', async () => {
            await play.clickShowButton();
            expect(await play.getShowButtonText()).toEqual(play.showTrueText);
            expect(await play.getCardButtonText(0)).toEqual('1');
            expect(await play.getCardButtonText(1)).toEqual('2');
        });

        it('should start new game', async () => {
            await play.clickNewRoundButton();
            await play.waitForCardButtonText(0, play.cardVotingText);

            expect(await play.getShowButtonText()).toEqual(play.showFalseText);
            expect(await play.getCardButtonText(0)).toEqual(play.cardVotingText);
            expect(await play.getCardButtonText(1)).toEqual(play.cardVotingText);
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
