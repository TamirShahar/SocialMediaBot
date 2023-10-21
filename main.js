const InstagramBot = require('./instagram_bot.js'); // Relative path to the class file
//const TwitterBot = require('./twitter_bot.js');
//const TikTokBot = require('./tiktok_bot.js');
//const SocialMediaBot = require('./social_media_bot.js');    
const {checkValidLink, INVALID_LINK_STR} = require('./utils.js');


async function main() {
    const bot = new InstagramBot();
    console.log("let's go");
    await bot.log_in('_dave_u_', '');
    link = checkValidLink('https://www.instagram.com/p/CyqmW_gALA4/');
    if(link == INVALID_LINK_STR)
    {
        console.log("Invalid link given");
        return 1;
    }
    await bot.like_post(link);
    return 0;       
  }
  
main();   
  
  
  
  
  