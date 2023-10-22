
const InstagramBot = require('./instagram_bot.js'); // Relative path to the class file
//const TwitterBot = require('./twitter_bot.js');
//const TikTokBot = require('./tiktok_bot.js');
//const SocialMediaBot = require('./social_media_bot.js');    
const {checkValidLink, INVALID_LINK_STR} = require('./utils.js');

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    const bot = new InstagramBot();
    console.log("let's go");
    await delay(1000);
    await delay(1000);
    await bot.log_in('_dave_u_', '19283746');
    console.log('https://www.instagram.com/p/CyqmW_gALA4')
    link = checkValidLink('https://www.instagram.com/p/CyqmW_gALA4?lang=en');
    /*if(link == INVALID_LINK_STR)
    {
        console.log("Invalid link given");
        return 100;
    }*/
    await bot.like_post(link);
    return 0;       
  }
  
main();   
  
  
  
/*
class AsyncInitializer {
  constructor() {
    this.field1 = this.initializeField1();
    this.field2 = this.initializeField2();
  }

  async initializeField1() {
    // Simulate an asynchronous operation, like fetching data from a server
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Field 1 Initialized");
      }, 1000);
    });
  }

  async initializeField2() {
    // Simulate another asynchronous operation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Field 2 Initialized");
      }, 2000);
    });
  }
}

async function main() {
  const asyncInitializer = new AsyncInitializer();

  // Wait for the async field initializations to complete
  const field1Value = await asyncInitializer.field1;
  const field2Value = await asyncInitializer.field2;

  console.log("Field 1:", field1Value);
  console.log("Field 2:", field2Value);
}

main();
*/