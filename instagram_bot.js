const { test, expect } = require('@playwright/test');
const SocialMediaBot = require('./social_media_bot.js');
const { delay } = require('./utils.js');

const LOGGED_OUT_ERR = 1;
const LANGUAGE_ERR = 2;
const INVALID_LINK_ERR = 3;
const UNKNOWN_ERR = -1;

// Example of a subclass implementing the methods
class InstagramBot extends SocialMediaBot {
  
  constructor() {
    super();
    this.POST_ACTIONS = [this.like_post, this.comment_on_post, this.save_post];
  }

  async get_error_type(post_link)
  {
    await this.page.goto('https://www.instagram.com/?lang=en');
    try
    {
      const instagramImg = await this.page.$('//html/body/div[2]/div/div/div[2]/div/div/div/div[1]/section/main/article/div[2]/div[1]/div[1]/div/i');
      if(instagramImg)
      {
        return LOGGED_OUT_ERR;
      }      
    }
    catch(error)
    {//Timeout Error - we assume that it's because the element isn't found - meaning that we are logged in
    }

    try
    {
      await this.page.locator('div').filter({ hasText: /^HomeHome$/ }).nth(2).click();
    }
    catch(error)
    {//Timeout Error - we assume that it's because the element isn't found - meaning that it's in a different language
      return LANGUAGE_ERR;
    }
  }

  async inside_post_get_error_type(post_link)
  {

    await this.page.goto('https://www.instagram.com/?lang=en');
    try
    {
      const instagramImg = await this.page.$('//html/body/div[2]/div/div/div[2]/div/div/div/div[1]/section/main/article/div[2]/div[1]/div[1]/div/i');
      if(instagramImg)
      {
        return LOGGED_OUT_ERR;
      }      
    }
    catch(error)
    {//Timeout Error - we assume that it's because the element isn't found - meaning that we are logged in
    }

    try
    {
      await this.page.locator('div').filter({ hasText: /^HomeHome$/ }).nth(2).click();
    }
    catch(error)
    {//Timeout Error - we assume that it's because the element isn't found - meaning that it's in a different language
      return LANGUAGE_ERR;
    }

    try
    {
      await this.page.goto(post_link)
        try
        {//if this crashes - then the text isn't available - meaning that the post is available
          await this.page.$('//html/body/div[2]/div/div/div[2]/div/div/div/div[1]/section/main/div/div');
       //   await this.page.getByText('Sorry, this page isn\'t available.');
          return INVALID_LINK_ERR;
        }
        catch(err)
        {//meaning that the post is available
          return UNKNOWN_ERR;
        }     
    }
    catch(error)
    {
      return INVALID_LINK_ERR;
    }    
    return UNKNOWN_ERR;
  }

  async post_action_wrapper(action, ...args)
  {
    let prev_vals = [];
    while(true)
    {
      try{
        const ret_val = await action(...args);
        console.log(ret_val);

        if(ret_val == true)
        {
          return true;
        }
        if( prev_vals.includes(ret_val))
        {//if we got an error which we have already had - the fix didnt work - we return
          console.log('Error occured twice - fix failed');
          return false;
        }
        else if(ret_val == LOGGED_OUT_ERR)
        {
          const {email, password, ...otherArgs} = args;
          const did_log_in = await this.log_in(email, password);
          if(!did_log_in)
          {//means that we failed to fix the issue
            console.log('failed to fix log out error');
            return false;
          }
          prev_vals.push(ret_val);

        }
        else
        {
          var err_type = NaN;
          if(this.POST_ACTIONS.includes(action))
          {
            err_type =await this.inside_post_get_error_type(args.link);
          }
          else
          {
            err_type =await this.get_error_type(args.link);
          }
          
          prev_vals.push(err_type)
         console.log(err_type);
         if(prev_vals.includes(err_type))
         {
          console.log('Error occured twice - fix failed');
          return false;
         }
         switch (err_type)
         {
            case LOGGED_OUT_ERR:
              const {email, password, ...otherArgs} = args;
              const did_log_in = await this.log_in(email, password);
              if(!did_log_in)
              {//means that we failed to fix the issue
                console.log('failed to fix log out error');
                return false;
              }      
              break;
            case LANGUAGE_ERR:
              this.change_language_to_english();
              break;
            case INVALID_LINK_ERR:
              console.log("Action failed - Invalid link given");  
              return false;
            case UNKNOWN_ERR:
              console.log("Action failed - Unknown error");  
              return false;
         }
         
        }

      }catch(error)
      {
        console.log(error);
        return false;
        //to differentiate error:
      }

    }
  }

  async check_logged_in(to_load_homepage=true)
  {
    if(to_load_homepage)
    {
      await this.page.goto('https://www.instagram.com/?lang=en');
    }
    try
    {
      const instagramImg = await this.page.$('//html/body/div[2]/div/div/div[2]/div/div/div/div[1]/section/main/article/div[2]/div[1]/div[1]/div/i');
      if(instagramImg)
      {
        return false;
      }
      return true;
    }
    catch(error)
    {
      return true;
    }

  }
  
  async log_in(username, password) {
        try {
            await this.page.goto('https://www.instagram.com/?lang=en');
          /*  if(this.check_logged_in(false))
            {
              return true;
            }*/
            await this.page.getByLabel('Phone number, username or email address').click();
            await this.page.getByLabel('Phone number, username or email address').fill(username);
            await this.page.getByLabel('Password').click();
            await this.page.getByLabel('Password').fill(password);
            await this.page.getByRole('button', { name: 'Log in', exact: true }).click();
            const continueButton = await this.waitForElement('button:has-text("not now")');
            if (continueButton) {
                await continueButton.click();
            }
            return this.check_logged_in(false);
          } catch (error) {
            console.log('ERR:');
            console.error(error);
            return false; // Return false in case of any errors
        }
    }
//POSSIBLE ERRORS - 
//LANG
//LOGGED OUT
//POST DOESNT EXIST
// PAGE BLOCKED
  async like_post(link) {
        // Implement like_post logic for Instagram
          const login_popup_xpath = '//html/body/div[7]/div[1]/div/div[2]/div/div/div';
        try {
            await this.page.goto(link);
              const likeBtn = await this.page.getByRole('button', { name: 'Like'}).first();
              if(likeBtn)
              {
                await likeBtn.click();
              }
              else{
                return false;
              }
              //const like_button = await this.page.$('//html/body/div[2]/div/div/div[2]/div/div/div/div[1]/div[1]/div[2]/section/main/div/div[1]/div/div[2]/div/div[3]/div[1]/div[1]/span[1]/div');
              //await like_button.click();
            try
            {
              const newElement = await this.page.waitForSelector(login_popup_xpath, { state: 'visible' });
              if(newElement)
              {
                return LOGGED_OUT_ERR;
              }
            }catch(err){
//              console.log(err);
            }
            //we need to check whether we actually liked
            return true;
        } catch (error) {
            console.error(error);
            return false;
            // Return false in case of any errors
        }
    }

  async send_dm(username, msg_str) {
    // Implement send_dm logic for Instagram
  }

  async upload_post(inputFiles, captions, location=NaN) { 
    try {
      // Click on create new post button
      await this.page.getByRole('link', { name: 'New post Create' }).click();
      await delay(2000);
//      const newPostButton = await this.page.waitForSelector('button:has-text("New post Create")', options);
      // Select the file from computer
      const fileInput = await this.page.$('input[accept="image/jpeg,image/png,image/heic,image/heif,video/mp4,video/quicktime"][type="file"]');
      await fileInput.setInputFiles(inputFiles);

      // Hit "Next" twice
      await this.page.locator('div').filter({ hasText: /^Next$/ }).nth(1).click();
      await this.page.getByRole('button', { name: 'Next' }).click();

      // Add captions
      if (captions) {
        await this.page.getByRole('paragraph').click();
        // await this.page.getByLabel('Write a caption...').click();
        await this.page.getByLabel('Write a caption...').fill(captions);
      }

      // Optionally, add location
      if (location) {
        await this.page.getByPlaceholder('Add Location').click();
        await this.page.getByPlaceholder('Add Location').fill(location);
        await this.page.getByRole('button', { name: location, exact: true }).first().click();
      }
      
      // Finally, share.
      await this.page.getByRole('button', { name: 'Share' }).click();
      await delay(3000);
      await this.page.locator('div').filter({ hasText: /^Your post has been shared\.$/ }); // Make sure the success indicator exists
      await this.page.getByRole('button', { name: 'Close' }).click();      

    } catch (error) {
      console.error(error);
      return false; // Return false in case of any errors
    }
  }

  async upload_story(inputFile) {
    // UNTESTED CODE:
    try {
      // TODO: Here, add a line of code to convert the viewport to mobile.
      // There's no option to add a story on PC view, but you can trick Instagram by shifting to mobile screen aspect ratio.
      try {
        await this.page.getByRole('button', { name: 'Not now' }).click();
      } catch (error) {
        await this.page.reload();
      }
      await this.page.getByRole('button', { name: 'Story Story' }).setInputFiles(inputFile);
    } catch (error) {
      console.error(error);
      return false; // Return false in case of any errors
    }
  }

  async upload_reel(inputFiles, captions, location) {
    // UNTESTED CODE:
    // Instagram prompts you that "video posts are now shared as reels".
    // This is expressed in the code: it's almost identical to upload_post.
    try {
      // Click on create new post button
      await this.page.getByRole('link', { name: 'New post Create' }).click();
      await delay(2000);
      // Select the file from computer
      const fileInput = await this.page.$('input[accept="image/jpeg,image/png,image/heic,image/heif,video/mp4,video/quicktime"][type="file"]');

      //const send_files_element = await this.page.getByRole('button', { name: 'Select From Computer' });
      //await this.page.getByRole('button', { name: 'Select From Computer' }).click();
      await fileInput.setInputFiles(inputFiles);
      await delay(5000);
      // Hit "Next" twice
      await this.page.locator('div').filter({ hasText: /^Next$/ }).nth(1).click();
      await this.page.getByRole('button', { name: 'Next' }).click();

      // Add captions
      if (captions) {
        await this.page.getByRole('paragraph').click();
        // await this.page.getByLabel('Write a caption...').click();
        await this.page.getByLabel('Write a caption...').fill(captions);
      }

      // Optionally, add location
      if (location) {
        await this.page.getByPlaceholder('Add Location').click();
        await this.page.getByPlaceholder('Add Location').fill(location);
        await this.page.getByRole('button', { name: location, exact: true }).first().click();
      }
      
      // Finally, share.
      await this.page.getByRole('button', { name: 'Share' }).click();
      await delay(3000);
      await this.page.locator('div').filter({ hasText: /^Your reel has been shared\.$/ }); // Make sure the success indicator exists
      await this.page.getByRole('button', { name: 'Close' }).click();      
    } catch (error) {
      console.error(error);
      return false; // Return false in case of any errors
    }
  }

  async change_language_to_english()
  {
    await this.page.goto('https://instagram.com/?lang=en');
    await delay(1000);
    const element = await this.page.$('//html/body/div[2]/div/div/div[2]/div/div/div/div[1]/div[1]/div[1]/div/div/div/div/div[2]/div[8]/div');
    await element.click();
    ///html/body/div[2]/div/div/div[2]/div/div/div/div[1]/div[1]/div[2]/div[2]/section/main/div/header/section/div[1]/div[2]/div
    await delay(2000);
  //  await this.page.goto()
//    await this.page.locator('div:nth-child(8) > div > .x4k7w5x > div').click();
    const optionsButton = await this.page.$('//html/body/div[2]/div/div/div[2]/div/div/div/div[1]/div[1]/div[2]/div[2]/section/main/div/header/section/div[1]/div[2]/div');
    await optionsButton.click();
//    await this.page.getByRole('button', { name: 'Settings and privacy' }).click();
    await delay(2000);
    const privacyButton = await this.page.$('//html/body/div[5]/div[1]/div/div[2]/div/div/div/div/div[2]/div/div/div/button[4]');
    await privacyButton.click();
    await delay(1000);
    const languageButton = await this.page.$('//html/body/div[2]/div/div/div[2]/div/div/div/div[1]/div[1]/div[2]/section/main/div/div[1]/div/div/div/div/div[4]/a');
    await languageButton.click();
   // await this.page.getByRole('link', { name: 'Language preferences' }).click();
   await delay(1000);
   const searchButton = await this.page.$('//html/body/div[2]/div/div/div[2]/div/div/div/div[1]/div[1]/div[2]/section/main/div/div[3]/div/div/div[2]/input');
   await searchButton.click();
   //    await this.page.getByPlaceholder('Search').click();
    await searchButton.fill('English');
    //await this.page.getByRole('button', { name: 'English Checkmark filled icon' }).click();
    const englishButton = await this.page.$('//html/body/div[2]/div/div/div[2]/div/div/div/div[1]/div[1]/div[2]/section/main/div/div[3]/div/div/div[2]/div[2]/div[1]');
   await englishButton.click();
  }

    async save_post(link) {
        // Implement save_post logic for Instagram

        try {
          const login_popup_xpath = '//html/body/div[7]/div[1]/div/div[2]/div/div/div';
            await this.page.goto(link);
            await this.page.getByRole('button', { name: 'Save' }).nth(1).click();
            try
            {
              const newElement = await this.page.waitForSelector(login_popup_xpath, { state: 'visible' });
              if(newElement)
              {
                return LOGGED_OUT_ERR;
              }
            }catch(err){
//              console.log(err);
            }
        } catch (error) {
            console.error(error);
            return false; // Return false in case of any errors
        }
    }

    async comment_on_post(link, comment_str) {
        // Implement comment_on_post logic for Instagram
        try {
          const login_popup_xpath = '//html/body/div[7]/div[1]/div/div[2]/div/div/div';
            await this.page.goto(link);
            await this.page.getByRole('button', { name: 'Comment', exact: true }).click();
            try
            {
              const newElement = await this.page.waitForSelector(login_popup_xpath, { state: 'visible' });
              if(newElement)
              {
                return LOGGED_OUT_ERR;
              }
            }catch(err){ }

            await this.page.getByPlaceholder('Add a comment...').click();
            await this.page.getByPlaceholder('Add a comment...').fill(comment_str);
            await this.page.getByRole('button', { name: 'Post' }).click();
        } catch (error) {
            console.error(error);
            return false; // Return false in case of any errors
        }
    }


    async report_user(username) {
        // report user logic for Instagram
        await this.page.goto("https://www.instagram.com/" + username + "/", { timeout: 120000 });
        await this.page.getByRole('button', { name: 'Options' }).click();
        await this.page.getByRole('button', { name: 'Report' }).click();
        await this.page.getByRole('button', { name: 'Report Account' }).click();
        await this.page.getByRole('button', { name: 'It\'s posting content that shouldn\'t be on Instagram' }).click();
        await this.page.getByRole('button', { name: 'Hate speech or symbols' }).click();
        await this.page.getByRole('button', { name: 'Submit report' }).click();
        await this.page.getByRole('button', { name: 'Close' }).click();
    }

    async watch_video(link, duration_in_secs) {
        // watch a video for a certain duration(seconds) on Instagram
        await this.page.goto(link, { timeout: 120000, waitUntil: 'load' });
        await delay(duration_in_secs * 1000);
        await this.page.locator('video').click();

    }
}



module.exports = InstagramBot;