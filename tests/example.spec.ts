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
  await page.goto('https://twitter.com/yarinlubliner');
  await page.goto('https://twitter.com/i/flow/login?redirect_after_login=%2Fyarinlubliner');
  await page.getByLabel('Phone, email, or username').click();
  await page.getByLabel('Phone, email, or username').fill('@bsh_adi');
  await page.getByLabel('Phone, email, or username').press('Enter');
  await page.getByLabel('Password', { exact: true }).fill('adibsh77');
  await page.getByLabel('Password', { exact: true }).press('Enter');
  //await page.getByTestId('ocfEnterTextTextInput').fill('0523672257');
  //await page.getByTestId('ocfEnterTextTextInput').press('Enter');
  await page.getByTestId('sendDMFromProfile').click();
  await page.getByTestId('dmComposerTextInput').fill('היי');
  await page.getByTestId('dmComposerSendButton').click();

});
