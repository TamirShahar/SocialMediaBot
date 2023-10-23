
const InstagramBot = require('./instagram_bot.js'); // Relative path to the class file
const TwitterBot = require('./twitter_bot.js');
//const TwitterBot = require('./twitter_bot.js');
//const TikTokBot = require('./tiktok_bot.js');
//const SocialMediaBot = require('./social_media_bot.js');    
const {delay, checkValidLink, INVALID_LINK_STR} = require('./utils.js');

async function main() {
    const bot = new TwitterBot();    
    console.log("let's go twitter");
    await delay(1000);
    await delay(1000);

  //  bot.page.goto('https://twitter.com/nocontextfooty/status/171605429040021950?lang=en');
    
    await bot.log_in('Uchitel44','159258357456');
    //await delay(3000);
    await bot.watch_video_until('https://twitter.com/CollinRugg/status/1716213636635500948', 80);
    await delay(1000);
    await bot.page.close();
    // /await bot.report_user('https://twitter.com/aysardm?lang=en');


    //link = checkValidLink('https://www.instagram.com/p/CyqmW_gALA4?lang=en');
    /*if(link == INVALID_LINK_STR)
    {
        console.log("Invalid link given");
        return 100;
    }*/
    //await bot.watch_video_until('https://twitter.com/HananyaNaftali/status/1716226724902449154', 50);
    /*if(bot.logged_in)
    {
      await bot.like_post('https://www.instagram.com/p/CyqmW_gALA4?lang=en');
    }
    else
    {
      console.log("");
    }*/
        return 0;       
  }
  
main();   
  
  
  