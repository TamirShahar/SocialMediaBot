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
    
      like_post(link) {
        // Implement like_post logic for Instagram
      }
    

    save_post(link) {
    // Implement save_post logic for Instagram
    }

    comment_on_post(link, comment_str) {
    // Implement comment_on_post logic for Instagram
    }

    signup(mail, username, password) {
    // Implement signup logic for Instagram
    }

    send_dm(username, msg_str) {
    // Implement send_dm logic for Instagram
    }

}

module.exports = TwitterBot;