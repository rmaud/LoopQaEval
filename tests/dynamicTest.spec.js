import { test, expect } from '@playwright/test';
const DashboardPage = require('../pages/dashboard.page')
const { loadTestData } = require('../utils/loadTestData')
const LogInPage = require('../pages/login.page')
const NavBar = require('../pages/navBar')

test.describe('Dashboard Verification Tests', () => {
  let dashboardPage
  let loginPage
  let navBar
  const testData = loadTestData()

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page)
    loginPage = new LogInPage(page)
    navBar = new NavBar(page)
    //Navigate to login screen and log in 
    await page.goto('/');
    await loginPage.logIn(testData.adminUsername, testData.adminPassword)
  });

  test.afterEach(async () => {
    //Log out after each test
    await dashboardPage.logOut()
    await loginPage.logInHeader.waitFor()
  });

  //Validate JSON Data 
  testData.testCases.forEach(({ testName, sectionName, columnName, cardName, tags }) => {
    test(`${testName} - Verify ${cardName} is in the ${columnName} column on the ${sectionName} page`, async ({ page }) => {
      await dashboardPage.verifyCardDetails(navBar, sectionName, columnName, cardName, tags);
    });
  });
});