const { test, expect } = require('@playwright/test');
const SocialMediaBot = require('./social_media_bot.js');


class TwitterBot extends SocialMediaBot {
    constructor() {
    super();
    }

    async log_in(username, password) {

        // Implement login logic for Instagram
        // Set this.logged_in and this.cookies accordingly               
        try{    
            await this.page.goto('https://twitter.com/?lang=en');
            await this.page.getByTestId('loginButton').click();
            await this.page.getByLabel('Phone, email, or username').click();
            await this.page.getByLabel('Phone, email, or username').fill(username);
            await this.page.getByRole('button', { name: 'Next' }).click();

           if(checkElement('[role="button"][aria-label="Next"]', msg_false="Login failed, username incorrect"))
           {
                return false;
           }

            await this.page.getByLabel('Password', { exact: true }).click();
            await this.page.getByLabel('Password', { exact: true }).fill(password);
            await this.page.getByTestId('LoginForm_Login_Button').click(); 
            

            
            if(checkElement('[data-testid="LoginForm_Login_Button"]',msg_true="Logged in successfully", msg_false="Login failed, password incorrect"))
            {
                 return false;
            }

            return true;
            
        }
        catch (error) {
            console.error(error);
            return false; // Return false in case of any errors
          }

    }
    
      async like_post(link) {
        // Implement like_post logic for Instagram
        //if the user is looged in already (no need to re-login)
        await page.goto(link);
        await page.getByTestId('like').first().click();

      }
    

    async save_post(link) {
    // Implement save_post logic for Instagram
    //if the user is looged in already (no need to re-login)
    await page.goto(link);
    await page.getByTestId('bookmark').first().click();

    }

    async comment_on_post(link, comment_str) {
    // Implement comment_on_post logic for Instagram
    await page.goto(link);
    await page.getByTestId('reply').first().click();
    await page.getByRole('textbox', { name: 'Post text' }).fill(comment_str);
    await page.getByTestId('tweetButton').click();

    }

    signup(mail, username, password) {
    // Implement signup logic for Instagram
    }
    
    async retweet(link){
      await page.goto(link);
      await page.getByTestId('retweet').first().click();
      await page.getByTestId('retweetConfirm').click();
    }

    send_dm(username, msg_str) {
    // Implement send_dm logic for Instagram
    }

    async watch_video_until(percentage){

    }

    

}

module.exports = TwitterBot;