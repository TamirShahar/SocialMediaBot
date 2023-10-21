import { test, expect } from '@playwright/test';

const waitForElement = async (selector, time_ms=3000) => {
  return Promise.race([
    page.waitForSelector(selector),
    new Promise((resolve) => setTimeout(resolve, time_ms))
  ]);
};


const checkElement = async (selector, msg_true="", msg_false="", time_ms=3000) => {
  const element = await waitForElement(selector, time_ms);
  if (element) {
    console.log(msg_true);
  } else {
    console.log(msg_false);
  }
};


class SocialMediaBot {
  constructor() {
    this.logged_in = false;
    this.cookies = NaN;
  }

  // Abstract methods (to be overridden by subclasses)
  log_in(username, password) {
    throw new Error('This method must be implemented in a subclass');
  }

  like_post(link) {
    throw new Error('This method must be implemented in a subclass');
  }

  save_post(link) {
    throw new Error('This method must be implemented in a subclass');
  }

  comment_on_post(link, comment_str) {
    throw new Error('This method must be implemented in a subclass');
  }

  signup(mail, username, password) {
    throw new Error('This method must be implemented in a subclass');
  }

  send_dm(username, msg_str) {
    throw new Error('This method must be implemented in a subclass');
  }
}
