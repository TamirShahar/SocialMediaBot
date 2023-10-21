const { chromium } = require('playwright');
const { test, expect } = require('@playwright/test');

class SocialMediaBot {
  constructor() {
    (async() => {
    this.logged_in= false;
    await this._init_driver();  
    this.cookies = NaN;
  })()
  }

  async _init_driver(params=NaN)
  {
    this.browser = await chromium.launch();
    this.page = await browser.newPage();
    console.log(this.browser, this.page);
  
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
