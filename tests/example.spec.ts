import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('test', async ({ page }) => {
  await page.goto('https://twitter.com/vloot_io/status/1715706268684280140');
  var element = page.getByTestId('app-bar-close').first();
  if(element !== null)
  {
    await element.click();
  }
  await page.getByTestId('login').click();
  await page.getByLabel('Phone, email, or username').click();
  await page.getByLabel('Phone, email, or username').fill('@bsh_adi');
  await page.getByLabel('Phone, email, or username').press('Enter');
  await page.getByLabel('Password', { exact: true }).press('CapsLock');
  await page.getByLabel('Password', { exact: true }).press('CapsLock');
  await page.getByLabel('Password', { exact: true }).fill('adibsh77');
  await page.getByTestId('LoginForm_Login_Button').click();
  await new Promise(r => setTimeout(r, 1000));
  await page.getByTestId('retweet').click();
  await new Promise(r => setTimeout(r, 1000));
  await page.getByTestId('retweetConfirm').click();

});
