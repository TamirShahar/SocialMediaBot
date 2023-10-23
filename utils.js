const POSSIBLE_SITES = ['twitter', 'instagram', 'tiktok'];
const INVALID_LINK_STR = "ERR";

//function checks whether the link is valid, and makes sure the lang is en
// 
async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function checkValidLink(link) {

  // Check if the link is in the correct format
  const urlPattern = new RegExp(`^(https?://)?(www\\.)?(${POSSIBLE_SITES.join('|')})\\.com/\\d+`);

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


module.exports = { POSSIBLE_SITES, INVALID_LINK_STR, checkValidLink,delay };