const { test, expect } = require('@playwright/test');
const SocialMediaBot = require('./social_media_bot.js');
const {delay} = require('./utils.js');


// Example of a subclass implementing the methods
class TikTokBot extends SocialMediaBot {
  constructor() {
    super();
  }

  async log_in_by_username(username, password) {
      
    await page.goto('https://www.tiktok.com/explore');
    await page.locator('#header-login-button').click();
    await page.getByRole('link', { name: 'Use phone / email / username' }).click();
    await page.getByRole('link', { name: 'Log in with email or username' }).click();
    await page.getByPlaceholder('Email or username').click();
    await page.getByPlaceholder('Email or username').fill(username);
    await page.getByPlaceholder('Password').fill(password);
    await page.getByLabel('Log in').getByRole('button', { name: 'Log in' }).click();
    this.logged_in = true;
  }
async log_in_by_mail(mail, password){
  
  await page.goto('https://www.google.com/search?client=firefox-b-d&q=tiktok');
  await page.getByRole('link', { name: 'TikTok - Make Your Day tiktok.com https://www.tiktok.com' }).click();
  await page.locator('#header-login-button').click();
  await page.locator('#header-login-button').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Continue with Google' }).click();
  const page1 = await page1Promise;
  await page1.getByLabel('Email or phone').click();
  await page1.getByLabel('Email or phone').fill('xf0rd777');
  await page1.getByLabel('Email or phone').press('Enter');
  await page1.getByLabel('Enter your password').fill('adi2005233');
  await page1.getByLabel('Enter your password').press('Enter');
  await page.goto('https://www.tiktok.com/explore');
}
  async like_post(link) {
    await page.goto(link);
    var like_btn = await page.waitForSelector('span[data-e2e="like-icon"]');
    like_btn?.click();
  }

  async save_post(link) {
      await page.goto(link);
      var bookmark_btn = await page.waitForSelector('span[data-e2e="undefined-icon"]');
      bookmark_btn?.click();
  }

  async report_post(link="https://www.tiktok.com/@jihadpalestina/video/7292027761080700162?lang=en")
  {
    try
    {
        await this.page.goto(link);
        await this.page.getByLabel('Close').click();
        await this.page.locator('div').filter({ hasText: /^SpeedReportKeyboard$/ }).getByRole('img').nth(2).click();
        await this.page.locator('li').filter({ hasText: 'Report' }).click();
        await this.page.locator('label').filter({ hasText: 'Hate and harassment' }).click();
        await this.page.locator('label').filter({ hasText: 'Hate speech and hateful behaviors' }).click();
        await this.page.getByRole('button', { name: 'Submit' }).click();
        await this.page.getByRole('button', { name: 'Done' }).click();
        return true;
    }
    catch (error) {
        console.error(error);
        return false; // Return false in case of any errors
      }


  }

  async comment_on_post(link, comment_str) {
    await page.goto('https://www.tiktok.com/@nothinghere12222/video/7278602512754543890');
    await page.getByText('Add comment...Post').click();
    await page.getByRole('textbox').fill('נייס');
    await page.getByLabel('Post').click();

  }

  async signup(mail, username, password) {
    // Implement signup logic for Instagram
  }

  async send_dm(username, msg_str) {
    // Implement send_dm logic for Instagram
  }
}


module.exports = TikTokBot;


