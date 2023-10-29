const { chromium } = require('playwright');
const { webkit } = require('playwright-webkit');
const { test, expect } = require('@playwright/test');
const {delay} = require('./utils.js');


class SocialMediaBot {
      constructor() {
    this.browser = null;
    this.page = null;
    this.cookies = null;
    this.response = null;
    this.logged_in= false;
  }

  async initialize() {
    await this._init_driver();
    
  }

  async _init_driver(contextPath = 'twitterContext')
  {
   // this.browser = await webkit.launch({ headless: false });
    this.browser = NaN;
    try {
      this.context = await webkit.launchPersistentContext(contextPath, { headless: false });
    } catch (error) {
      console.log("ERR:", error);
      this.browser = await webkit.launch({ headless: false });
      this.context = await this.browser.newContext();
    }

    this.page = await this.context.newPage(); // Create a new page within the existing context.
    console.log(this.browser, this.page);

  }


  
 async waitForElement (selector, time_ms=3000){
  return Promise.race([
    this.page.waitForSelector(selector),
    new Promise((resolve) => setTimeout(resolve, time_ms))
  ]);
}


  async checkElement(selector, msg_true="", msg_false="", time_ms=3000){
    const element = await this.waitForElement(selector, time_ms);
    if (element) {
      console.log(msg_true);
      return element;
    } else {
      console.log(msg_false);
      return false;
    }
  }

  // Abstract methods (to be overridden by subclasses)
  async  log_in(username, password) {
    throw new Error('This method must be implemented in a subclass');
  }

  async like_post(link) {
    throw new Error('This method must be implemented in a subclass');
  }

  async save_post(link) {
    throw new Error('This method must be implemented in a subclass');
  }

  
  async report_post(link) {
    throw new Error('This method must be implemented in a subclass');
  }

  
  async comment_on_post(link, comment_str) {
    throw new Error('This method must be implemented in a subclass');
  }

  async signup(mail, username, password) {
    throw new Error('This method must be implemented in a subclass');
  }

  async send_dm(username, msg_str) {
    throw new Error('This method must be implemented in a subclass');
  }
}


module.exports = SocialMediaBot;
