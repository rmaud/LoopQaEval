const { test, expect } = require('@playwright/test');

class NavBar {
    constructor(page) {
        this.page = page;

        //Page Locators
        this.projectsHeader = page.locator('div').filter({ hasText: 'Projects' }).nth(3);
        this.navBar = page.locator('.flex-1.overflow-y-auto')
        this.webAppLink = page.getByRole('button', { name: 'Web Application Main web' });
        this.mobileAppLink = page.getByRole('button', { name: 'Mobile Application Native' });
        this.marketingLink = page.getByRole('button', { name: 'Marketing Campaign Q2' });
    }

    //Navigate to Section
    async menuNavigation(sectionName) {
        const sectionMap = {
            "Web Application": this.webAppLink,
            "Mobile Application": this.mobileAppLink,
            "Marketing": this.marketingLink
        };
        const sectionLocator = sectionMap[sectionName];
        await sectionLocator.click();
    }
} module.exports = NavBar;