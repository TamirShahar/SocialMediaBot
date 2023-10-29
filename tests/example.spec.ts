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
  await page.goto('https://www.tiktok.com/explore');
  await page.locator('#header-login-button').click();
  await page.getByRole('link', { name: 'Use phone / email / username' }).click();
  await page.getByRole('link', { name: 'Log in with email or username' }).click();
  await page.getByPlaceholder('Email or username').click();
  await page.getByPlaceholder('Email or username').fill('xf0rdfad');
  await page.getByPlaceholder('Email or username').press('Tab');
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('adibsh77!');
  await page.getByLabel('Log in').getByRole('button', { name: 'Log in' }).click();
});
