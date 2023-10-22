const { test, expect } = require('@playwright/test');
const SocialMediaBot = require('./social_media_bot.js');

// Example of a subclass implementing the methods
class InstagramBot extends SocialMediaBot {
  constructor() {
    super();
  }

  async log_in(username, password) {
    try{
      await this.page.goto('https://www.instagram.com/?lang=en');
      await this.page.getByLabel('Phone number, username, or email').click();
      await this.page.getByLabel('Phone number, username, or email').fill(username);
      await this.page.getByLabel('Password').click();
      await this.page.getByLabel('Password').fill(password);
      await this.page.getByRole('button', { name: 'Log in', exact: true }).click();    
      await this.page.goto('https://www.instagram.com/?lang=en');
      const continueButton = await this.waitForElement('button:has-text("not now")');
      if (continueButton) {
        await continueButton.click();
      }
    }
    catch (error) {
        console.log('ERR:');
        console.error(error);
        return false; // Return false in case of any errors
      }
  
    this.logged_in = true;
  }

  async like_post(link) {
    // Implement like_post logic for Instagram
    try{
      await this.page.goto(link);
      await this.page.locator('div').filter({ hasText: /^LikeCommentShare PostShare Post$/ }).getByRole('button').first().click();
      }catch (error) {
        console.error(error);
        return false; // Return false in case of any errors
      } 
  }

  async save_post(link) {
    // Implement save_post logic for Instagram
    
    try{
      await this.page.goto(link);
      await this.page.getByRole('button', { name: 'Save' }).nth(1).click();
      }catch (error) {
        console.error(error);
        return false; // Return false in case of any errors
      } 
  }

  async comment_on_post(link, comment_str) {
    // Implement comment_on_post logic for Instagram
    try{
      await this.page.goto(link);
      await this.page.getByRole('button', { name: 'Comment', exact: true }).click();
      await this.page.getByPlaceholder('Add a comment...').click();
      await this.page.getByPlaceholder('Add a comment...').fill(comment_str);
      await this.page.getByRole('button', { name: 'Post' }).click();
    }catch (error) {
    console.error(error);
    return false; // Return false in case of any errors
    }
  }

  async signup(mail, username, password) {
    // Implement signup logic for Instagram
  }

  async send_dm(username, msg_str) {
    // Implement send_dm logic for Instagram
  }
}


  
module.exports = InstagramBot;
