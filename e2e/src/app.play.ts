import { browser, protractor,  by, element } from 'protractor';
import { AppPage } from './app.po';

export class PlayPage {
    private page = new AppPage();
    gameName = 'Game: Test Game';
    statusTitleVoting = 'Voting...';
    cardVotingText = '?';
    cardVotedText = '✓';
    showTrueText = 'Hide Scores';
    showFalseText = 'Display Scores';
    private gameNameId = 'game-name';
    private newRoundButtonId = 'new-round-button';
    private showButtonId = 'show-button';
    private cardButtonId = 'card-button-';
    private pointButtonId = 'point-button-';
    private cardNameId = 'card-name-';
    private statusTitleId = 'status-title';
    private gameNameEl = element(by.id(this.gameNameId));
    private showButtonEl = element(by.id(this.showButtonId));
    private newRoundButtonEl = element(by.id(this.newRoundButtonId));
    private statusTitleEl = element(by.id(this.statusTitleId));

    private cardNameEl(i: number) {
        return element(by.id(this.cardNameId + i));
    }

    private pointButtonEl(i: number) {
        return element(by.id(this.pointButtonId + i));
    }
    async clickNewRoundButton(): Promise<void> {
        return this.newRoundButtonEl.click();
    }
    async clickShowButton(): Promise<void> {
        return this.showButtonEl.click();
    }
    async getShowButtonText(): Promise<string> {
        return this.showButtonEl.getText();
    }
    async clickPointButton(i: number): Promise<void> {
        return this.pointButtonEl(i).click();
    }
    private cardButtonEl(i: number) {
        return element(by.id(this.cardButtonId + i));
    }

    async getCardNameText(i: number) {
        return this.cardNameEl(i).getText();
    }

    async waitForCardButtonText(i: number, text: string): Promise<void> {
        return this.page.waitForTextById(this.cardButtonId + i, text);
    }
    async waitForCardButton(i: number): Promise<void> {
        return this.page.waitForElementById(this.cardButtonId + i);
    }
    async getCardButtonText(i: number) {
        return this.cardButtonEl(i).getText();
    }

    async navigateTo(): Promise<unknown> {
        return browser.get(browser.baseUrl);
    }

    async getStatusTitleText(): Promise<string> {
        return this.statusTitleEl.getText();
    }

    async getGameNameText(): Promise<string> {
        return this.gameNameEl.getText();
    }

    async waitForGameName(): Promise<void> {
        return this.page.waitForTextById(this.gameNameId, this.gameName);
    }
}
