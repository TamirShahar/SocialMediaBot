const { test, expect } = require('@playwright/test');
const SocialMediaBot = require('./social_media_bot.js');
const {delay} = require('./utils.js');

// Example of a subclass implementing the methods
class InstagramBot extends SocialMediaBot {
  constructor() {
    super();
  }

  async log_in(username, password) {
    try{
      await this.page.goto('https://www.instagram.com/?lang=en');
      
      await this.page.getByLabel("Phone number, username, or email").click();
      await this.page.getByLabel("Phone number, username, or email").fill(username);
      await this.page.getByLabel('Password').click();
      await this.page.getByLabel('Password').fill(password);
      await this.page.getByRole('button', { name: 'Log in', exact: true }).click();    
      await delay(1000);
      await this.page.goto('https://www.instagram.com/?lang=en');
      const continueButton = await this.waitForElement('button:has-text("not now")');
      if (continueButton) {
        await continueButton.click();
      }
    }
    catch (error) {
        console.log('ERR:');
        console.error(error);
        this.logged_in = false; // Return false in case of any errors
      }
  
    this.logged_in = true;
  }

  async like_post(link) {
    // Implement like_post logic for Instagram
    try{
      await this.page.goto(link);
      await this.page.getByRole('button', { name: 'Log in', exact: true }).click();
      }catch (error) {
        console.error(error);
         // Return false in case of any errors
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

  // TODO: methods upload_post, upload_story, and upload_reel aren't implementations of SocialMediaBot's abstract methods.
  // TODO: These methods also have not been properly tested.
  async upload_post(inputFiles, captions, location=NaN) {
    // UNTESTED CODE:
    try {
      // Click on create new post button
      await this.page.getByRole('link', { name: 'New post Create' }).click();
      await delay(2000);
      // Select the file from computer
      const fileInput = await this.page.$('input[accept="image/jpeg,image/png,image/heic,image/heif,video/mp4,video/quicktime"][type="file"]');

      //const send_files_element = await this.page.getByRole('button', { name: 'Select From Computer' });
      //await this.page.getByRole('button', { name: 'Select From Computer' }).click();
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

}


  
module.exports = InstagramBot;
