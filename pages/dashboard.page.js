const { test, expect } = require('@playwright/test');
const NavBar = require('../pages/navBar')

class DashboardPage {
    constructor(page) {
        this.page = page;
        this.navBar = new NavBar(page)

        //Page Locators
        this.pageHeader = page.getByRole('banner').getByRole('heading');
        this.pageBanner = page.getByRole('banner');
        this.logOutButton = page.getByRole('button', { name: 'Logout' });
        //Columns
        this.columnHeader = page.locator('.px2');
        this.column = page.locator('.rounded-lg.p-4');
        //Cards
        this.card = page.locator('.bg-white');
        this.cardTitle = page.locator('.mb-2');
        this.cardDescrption = page.locator('.mb-3');
        this.cardTag = page.locator('.rounded-full');
        this.cardOwner = page.locator('div:nth-child(1)');
        this.cardDate = page.locator('div:nth-child(2)');

    }
    //Log Out of Application
    async logOut() {
        await this.logOutButton.click()
    }

    //CARDS
    //->Assert Card is in Column
    async verifyCardInColumn(cardName, columnName) {
        const column = this.column.filter({ hasText: new RegExp(`${columnName}`, "i") });
        const card = this.card.filter({ hasText: new RegExp(`${cardName}`, "i") }).first();
        const cardIsVisible = await card.isVisible();
        return cardIsVisible;
    }

    //TAGS
    //->Assert Tag
    async verifyCardTags(tagName, cardName) {
        const card = this.card.filter({ hasText: cardName }).first();
        const tag = card.locator('.rounded-full').filter({ hasText: tagName }).first();
        const isTagVisible = await tag.isVisible();
        return isTagVisible;
    }

    //Validate Card Details (Column Name, Card Name, Tags)
    async verifyCardDetails(navBar, sectionName, columnName, cardName, tags) {
        await navBar.menuNavigation(sectionName);
        // Assert Card is in Column
        const isCardPresent = await this.verifyCardInColumn(cardName, columnName);
        expect(isCardPresent).toBe(true);
        // Assert Tags are in Card
        for (const tag of tags) {
            const isTagPresent = await this.verifyCardTags(tag, cardName);
            expect(isTagPresent).toBe(true);
        }
    }
} module.exports = DashboardPage;