const { test, expect } = require('@playwright/test');
const SocialMediaBot = require('./social_media_bot.js');
const {delay} = require('./utils.js');

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

    ////*[@id="id__spcq3cwwt5j"]/div/div/div/div/div/div/div/div/div[2]/div/div/div/div[2]/div/div[2]/div
    /*
    */
    async watch_video_until(link, percentage)
    {
      await this.page.goto(link);
      console.log("entered vid");
      const element = await this.page.$('div[data-testid="videoComponent"]');
      if (element) {
        console.log("element found");
        const boundingBox = await element.boundingBox();
        if (boundingBox) {
          const x = boundingBox.x + boundingBox.width * 0.5;// (0.5 + Math.random() * 0.5);
          const y = boundingBox.y + boundingBox.height * 0.5;// (0.5 + Math.random() * 0.5);
          await this.page.mouse.move(x, y);
          console.log("moved mouse");
        }
      }
      await delay(1000);
      //method watches viedo until certain percentage, then pauses/exits
      /*
      <div aria-label="Seek slider" role="slider" aria-valuemax="52.1" aria-valuemin="0" aria-valuenow="27.77245" aria-valuetext="0:27 of 0:52" tabindex="0" class="css-1dbjc4n r-1awozwy r-sdzlij r-1loqt21 r-mabqd8 r-1777fci r-bz4dqc r-1ny4l3l r-u8s1d r-o7ynqc r-6416eg r-1yvhtrz" style="left: calc(53.306% - 8.52897px);"><div class="css-1dbjc4n r-14lw9ot r-sdzlij r-9hvr93 r-10ptun7 r-a0m21o r-13tjlyg r-axxi2z r-1janqcz"></div></div>
      
      <div aria-label="Seek slider" role="slider" aria-valuemax="52.1" aria-valuemin="0" aria-valuenow="27.77245" aria-valuetext="0:27 of 0:52" tabindex="0" class="css-1dbjc4n r-1awozwy r-sdzlij r-1loqt21 r-mabqd8 r-1777fci r-bz4dqc r-1ny4l3l r-u8s1d r-o7ynqc r-6416eg r-1yvhtrz" style="left: calc(53.306% - 8.52897px);"><div class="css-1dbjc4n r-14lw9ot r-sdzlij r-9hvr93 r-10ptun7 r-a0m21o r-13tjlyg r-axxi2z r-1janqcz"></div></div>
      //*[@id="id__kdh193ptksg"]/div/div/div/div/div/div/div/div/div[2]/div/div/div/div[2]/div/div[2]/div/div/div[4]/div
      */

    }

    static get_username_from_link(link)
    {
      const match = link.match(/twitter\.com\/([^/?]+)/);
      if (match) {
      return match[1];
        }
        return NaN;
    }
    
    async report_user(link_to_profile)
    {
      await this.page.goto(link_to_profile);
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
    

}

module.exports = TwitterBot;