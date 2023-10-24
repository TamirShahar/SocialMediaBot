const { test, expect } = require('@playwright/test');
const SocialMediaBot = require('./social_media_bot.js');
const {delay} = require('./utils.js');
const { time } = require('console');
const { writeHeapSnapshot } = require('v8');


const VIEW_TO_ACTION = {
  'everyone': TwitterBot.prototype._click_everyone,
  'follow': TwitterBot.prototype._click_follow,
  'verified': TwitterBot.prototype._click_verified,
  'mention':  TwitterBot.prototype._click_mention
};

class TwitterBot extends SocialMediaBot {
    constructor() {
    super();
    }
//we should turn on notifications upon log in - so that the pop up doesn't appear
    async log_in(username, password) {

        // Implement login logic for Instagram
        // Set this.logged_in and this.cookies accordingly               
        try{    
            await this.page.goto('https://twitter.com/?lang=en');
            await this.page.getByTestId('loginButton').click();
            await this.page.getByLabel('Phone, email, or username').click();
            await this.page.getByLabel('Phone, email, or username').fill(username);
            await this.page.getByRole('button', { name: 'Next' }).click();
            await delay(3000);

           /*if(this.checkElement('[role="button"][aria-label="Next"]', "","Login failed, username incorrect"))
           {
                return false;
           }*/

            await this.page.getByLabel('Password', { exact: true }).fill(password);
            await this.page.getByTestId('LoginForm_Login_Button').click(); 
            

            await delay(3000);
            if(this.checkElement('[data-testid="LoginForm_Login_Button"]',"Logged in successfully", "Login failed, password incorrect"))
            {
                 return false;
            }

            return true;
            
        }
        catch (error) {
          console.log("ERR:");  
          console.error(error);
            return false; // Return false in case of any errors
          }

    }
    
    //to_load_page - whether we need to load the page that is liked. The value is false when in the flow
    // the page is already opened - there is no need to load it again
      async like_post(link, to_load_page=true) {
        // Implement like_post logic for Instagram
        //if the user is looged in already (no need to re-login)
        if(to_load_page){
          await this.page.goto(link);
        }
        await this.page.getByTestId('like').first().click();

      }
    

    async save_post(link,to_load_page=true) {
      // Implement like_post logic for Instagram
      //if the user is looged in already (no need to re-login)
      if(to_load_page){
        await this.page.goto(link);
      }
    await this.page.getByTestId('bookmark').first().click();

    }

    async comment_on_post(link, comment_str,to_load_page=true) {      
    // Implement comment_on_post logic for Instagram
    if(to_load_page)
    {
      await page.goto(link);
    }
    await page.getByTestId('reply').first().click();
    await page.getByRole('textbox', { name: 'Post text' }).fill(comment_str);
    await page.getByTestId('tweetButton').click();

    }
    
    async retweet(link){
      await this.page.goto(link);
      await this.page.getByTestId('retweet').first().click();
      await this.page.getByTestId('retweetConfirm').click();
    }

    send_dm(username, msg_str) {
    // Implement send_dm logic for Instagram
    }


      async wait_until_percentage(videoElement, percentage)
      {
        let isVideoPercentPlayed = false;
        while (!isVideoPercentPlayed) {
         
          if (!this.page.isClosed()) {
            // Get the current time and duration of the video
          const currentTime = await videoElement.evaluate((video) => video.currentTime);
          const duration = await videoElement.evaluate((video) => video.duration);
          // Calculate the percentage of the video played
          const percentagePlayed = (currentTime / duration) * 100;

          if (percentagePlayed >= percentage) {
            isVideoPercentPlayed = true;
          } else {
            // Wait for a short interval before checking again
            await this.page.waitForTimeout(1000); // Adjust the interval as needed (in milliseconds)
          }
          }
        }
      }
    async watch_video_until(link, percentage)
    {
      await this.page.goto(link);
      console.log("entered vid");
      
      const videoElement = await this.page.waitForSelector('div[data-testid="videoComponent"] video');
      await videoElement.evaluate((video) => {
      video.play();
    });
  
      await this.wait_until_percentage(videoElement, percentage);
      return;
    }

    static get_username_from_link(link)
    {
      const match = link.match(/twitter\.com\/([^/?]+)/);
      if (match) {
      return match[1];
        }
        return NaN;
    }
    
    async report_user(link_to_profile, to_reload_page=true)
    {
      if(to_reload_page)
      {
        await this.page.goto(link_to_profile);
      }
      await this.page.getByTestId('userActions').click();
      const username = TwitterBot.get_username_from_link(link_to_profile);
      if(!username)
      {
          console.log("invalid link.");
          return false;
      }
      console.log(username);

      const report_button_name = 'Report @' + username;
      await this.page.getByRole('menuitem', {  name: report_button_name}).click();
      
      await this.page.locator('div').filter({ hasText: /^Hate$/ }).click();
      await this.page.getByTestId('ChoiceSelectionNextButton').click();
      await this.page.locator('div').filter({ hasText: /^Dehumanization$/ }).click();
      await this.page.getByTestId('ChoiceSelectionNextButton').click();
      await this.page.getByTestId('ocfSettingsListNextButton').click();
    }
    
    async set_who_can_view_post(who_can_view)
    {
      await page.locator('div:nth-child(3) > div:nth-child(2) > div > div > div > div > div:nth-child(2) > div > div > div').first().click();
      await VIEW_TO_ACTION[who_can_view].call();
    }

    async _click_everyone()
    {  
      await this.page.getByRole('menuitem', { name: 'Everyone' }).click();
    }
    async _click_follow()
    {  
      await page.getByRole('menuitem', { name: 'Accounts you follow' }).click();
    }
    async _click_verified()
    {  
      await page.getByRole('menuitem', { name: 'Verified accounts' }).click();
    }
    async _click_mention()
    {  
      await page.getByRole('menuitem', { name: 'Only accounts you mention' }).click();
    }


    async post(text, is_home_page=false, who_can_view='everyone')
    {
      if(!is_home_page)
      {
        await this.page.goto('https://twitter.com/home?lang=en');
      }
//todo - replace with this.page
      await page.getByTestId('SideNav_NewTweet_Button').click(); //clicking the post button
      await page.getByRole('textbox', { name: 'Post text' }).locator('div').nth(2).click();
      await page.getByRole('textbox', { name: 'Post text' }).fill(text);//filling the text

      await this.set_who_can_view_post(who_can_view);


      await page.getByTestId('tweetButton').click();


    }



}

module.exports = TwitterBot;