const { test, expect } = require('@playwright/test');
const SocialMediaBot = require('./social_media_bot.js');



// Example of a subclass implementing the methods
class TikTokBot extends SocialMediaBot {
  constructor() {
    super();
  }

  async log_in(username, password) {
    
    this.logged_in = true;
  }

  async like_post(link) {
    

  }

  async save_post(link) {
    
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
    // Implement comment_on_post logic for Tiktok
  }

  async signup(mail, username, password) {
    // Implement signup logic for Instagram
  }

  async send_dm(username, msg_str) {
    // Implement send_dm logic for Instagram
  }
}


module.exports = TikTokBot;


