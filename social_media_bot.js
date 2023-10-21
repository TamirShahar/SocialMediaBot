

const waitForElement = async (selector, time_ms=3000) => {
  return Promise.race([
    page.waitForSelector(selector),
    new Promise((resolve) => setTimeout(resolve, time_ms))
  ]);
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

  send_dm(username, msg_str) {
    // Implement send_dm logic for Instagram
  }
}
