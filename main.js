
const InstagramBot = require('./instagram_bot.js'); // Relative path to the class file
const TwitterBot = require('./twitter_bot.js');
//const TwitterBot = require('./twitter_bot.js');
//const TikTokBot = require('./tiktok_bot.js');
//const SocialMediaBot = require('./social_media_bot.js');    
const {delay, checkValidLink, INVALID_LINK_STR} = require('./utils.js');

async function main() {
    const bot = new TwitterBot();  
    
    await bot.initialize();
   // await delay(1000);
   await bot.page.goto('https://twitter.com/?lang=en');
   var is_logged_in =await bot.check_logged_in();
   console.log("LOGGED in:", is_logged_in);
 // console.log(is_logged_in);
//    var currentURL = await bot.page.url();
  //  bot.page.goto('https://twitter.com/nocontextfooty/status/171605429040021950?lang=en');
//  console.log("URL before login:", currentURL);
    if(!is_logged_in)
    {
      await bot.log_in('Uchitel44','159258357456');
    }
    
    await bot.page.close();
    await bot.context.close();
    if(bot.browser)
    {
      await bot.browser.close();
    }
    return;
    await delay(2000);
    console.log("WE INNNN");
   // is_logged_in = await bot.check_logged_in(false);
   // console.log(is_logged_in);
    await bot.post("Good morning:}", true, 'follow');

  return;
    //await delay(3000);
    await bot.watch_video_until('https://twitter.com/BarkolAmir/status/1716525300308165016', 50);
    await bot.like_post("", false);
    await bot.save_post("", false);
    await delay(1000);    
    await bot.page.close();

    return 0;       
  }
  
main();   
  
  
  