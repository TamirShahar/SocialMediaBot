const POSSIBLE_SITES = ['twitter', 'instagram', 'tiktok'];
const INVALID_LINK_STR = "ERR";

//function checks whether the link is valid, and makes sure the lang is en
// /
function checkValidLink(link) {

  // Check if the link is in the correct format
  const urlPattern = new RegExp(`^(https?://)?(www\\.)?(${allowedSites.join('|')})\\.com/post/\\d+`);

  if (!urlPattern.test(link)) {
    return INVALID_LINK_STR;
  }

  // Parse the URL
  const url = new URL(link);

  // Check if the 'lang' parameter is present and set to 'en'
  if (url.searchParams.has('lang') && url.searchParams.get('lang') === 'en') {
    return link; // No change needed
  } else {
    // Add or update the 'lang' parameter to 'en'
    url.searchParams.set('lang', 'en');
    return url.toString();
  }
}


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
    return element;
  } else {
    console.log(msg_false);
    return false;
  }
};


