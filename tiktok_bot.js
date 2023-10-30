const { test, expect } = require('@playwright/test');
const SocialMediaBot = require('./social_media_bot.js');
const {delay} = require('./utils.js');


// Example of a subclass implementing the methods
class TikTokBot extends SocialMediaBot {
  constructor() {
    super();
  }



  

  async log_in_by_username(username, password) {  
      
    await this.page.goto('https://www.tiktok.com/explore');
    await this.page.locator('#header-login-button').click();
    await this.page.getByRole('link', { name: 'Use phone / email / username' }).click();
    await this.page.getByRole('link', { name: 'Log in with email or username' }).click();
    await this.page.getByPlaceholder('Email or username').click();
    await this.page.getByPlaceholder('Email or username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByLabel('Log in').getByRole('button', { name: 'Log in' }).click();
    this.logged_in = true;
  }
async log_in_by_mail(mail, password){
  await this.page.goto('https://www.tiktok.com/login?lang=en'); 
  //await this.page.goto('https://www.google.com/search?client=firefox-b-d&q=tiktok');
  //await this.page.getByRole('link', { name: 'TikTok - Make Your Day tiktok.com https://www.tiktok.com' }).click();
 // await this. page.goto('https://www.tiktok.com/explore?lang=en');
  //  await this.page.locator('#header-login-button').click();
    const page1Promise = this.page.waitForEvent('popup');
    await delay(1000);
  await this.page.getByRole('link', { name: 'Continue with Google' }).click();
  const page1 = await page1Promise;
  await delay(1000);
  //chhangin site lanuage to english
 // const currentURL = page1.url();
//  //*[@id="identifierId"]
  // Append the "lang=en" query parameter to the current URL.
  //const newURL = currentURL + (currentURL.includes('?') ? '&' : '?') + 'lang=en';
  //await page1.goto(newURL);
  await this.page.click('#identifierId');

  // Fill the element with a string
  await this.page.fill('#identifierId', 'your_string_here');
  const element = await this.page.getByTestId("identifierId").first();
//  await this.page.type('xpath=//*[@id="identifierId"]', mail);

  const xpath = '//*[@id="identifierId"]';
  //const element = await this.page.$(xpath);

//  https://accounts.google.com/v3/signin/identifier?opparams=%253Fplatform%253Dgoogle&dsh=S-1844468471%3A1698345919920321&client_id=1096011445005-sdea0nf5jvj14eia93icpttv27cidkvk.apps.googleusercontent.com&o2v=2&prompt=consent&redirect_uri=https%3A%2F%2Fwww.tiktok.com%2Flogin%2F&response_type=token&scope=openid+profile&service=lso&state=%7B%22client_id%22%3A%221096011445005-sdea0nf5jvj14eia93icpttv27cidkvk.apps.googleusercontent.com%22%2C%22network%22%3A%22google%22%2C%22display%22%3A%22popup%22%2C%22callback%22%3A%22_hellojs_94dpkzx4%22%2C%22state%22%3A%22%22%2C%22redirect_uri%22%3A%22https%3A%2F%2Fwww.tiktok.com%2Flogin%2F%22%2C%22scope%22%3A%22basic%22%7D&theme=glif&flowName=GeneralOAuthFlow&continue=https%3A%2F%2Faccounts.google.com%2Fsignin%2Foauth%2Fconsent%3Fauthuser%3Dunknown%26part%3DAJi8hANMADJIB1eJWeplmS2ETIxS3E0hfXUPv9-5Jh40xDcYaA8zsoS7PH_exOTNeBJkaih8rcvywkp3AOadsCX_ytD54jGQYb6Hgs6dm7liNBbY-oD_a4wTGcuzfaPyx6tMrl2N2Wy6MX3VI0JYWQnJhgG3e0oppj3airL7HhgBLqIIsGLa5_mvBTfyZ70ZXjV21zL5AjYDTKf5MZD-rMPpVVn36BV54AqT-8-Um42ZyuZxnRiob6LI011t9_zSPSoj8CBYzqIdOwDIUS6Dulc2V6_uQGNI3mjwsXg7sIAtVBae08DrZyoHleNbVZSKcIS6le35RRX83OGm3GDtgbBimKOAX8qIQveI2GQMYIKV3if3d36UEI6UhBfnHIJ9P-xmxbJmSg6d3b__pU-GCMS74HKEC3t2X2u0Kpi6b5ya-nDSd1VceRd1UQTzPrC9nvwg5WynAqZGnERgZ5IqsiBdr2KZYo95LQ%26as%3DS-1844468471%253A1698345919920321%26client_id%3D1096011445005-sdea0nf5jvj14eia93icpttv27cidkvk.apps.googleusercontent.com%26theme%3Dglif%23&app_domain=https%3A%2F%2Fwww.tiktok.com&rart=ANgoxccYnTIA9uvE4W4-a-E08Vn7gR_cameYXTHakFnQa7zchq_4O_luDsmskVkdXkZaalUnD44BOXA7TvM4ef6abzAdvGpomQ
  element.click();
  await element.fill(mail);
  await page1.getByLabel('Email or phone').press('Enter');
  await page1.getByLabel('Enter your password').fill(password);
  await page1.getByLabel('Enter your password').press('Enter');
  await this.page.goto('https://www.tiktok.com/explore');
}
  async like_post(link) {
    await this.page.goto(link);
    var like_btn = await this.page.waitForSelector('span[data-e2e="like-icon"]');
     like_btn?.click();
  }

  async save_post(link) {
      await this.page.goto(link);
      var bookmark_btn = await this.page.waitForSelector('span[data-e2e="undefined-icon"]');
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
    await this.page.goto('https://www.tiktok.com/@nothinghere12222/video/7278602512754543890');
    await this.page.getByText('Add comment...Post').click();
    await this.page.getByRole('textbox').fill('נייס');
    await this.page.getByLabel('Post').click();

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


  const videoElement = await this.page.waitForSelector('video');
  await videoElement.evaluate((video) => {
  video.play();
});

  await this.wait_until_percentage(videoElement, percentage);
  return;
}


}


module.exports = TikTokBot;


