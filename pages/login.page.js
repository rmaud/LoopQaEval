const DashboardPage = require('../pages/dashboard.page');
const NavBar = require('../pages/navBar')

class LoginPage {
    constructor(page) {
        this.page = page;
        this.dashboardPage = new DashboardPage(page)
        this.navBar = new NavBar(page)

        //Page Locators
        this.logInHeader = page.locator('div').filter({ hasText: /^Project Board Login$/ });
        this.usernameLabel = page.getByText('Username');
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordLabel = page.getByText('Password');
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.signInButton = page.getByRole('button', { name: 'Sign in' });
        this.errorMessage = page.getByText('Invalid username or password');
    }
    //Log In to Application
    async logIn(username, password) {
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.signInButton.click()
        await this.dashboardPage.pageHeader.waitFor()
        await this.navBar.marketingLink.waitFor({ state: 'visible' })
    }
} module.exports = LoginPage;