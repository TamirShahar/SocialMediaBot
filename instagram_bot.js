import { test, expect } from '@playwright/test';

const waitForElement = async (selector, time_ms=3000) => {
    return Promise.race([
      page.waitForSelector(selector),
      new Promise((resolve) => setTimeout(resolve, time_ms))
    ]);
  };

class InstagramBot {
    constructor() {
      this.logged_in = false;
      this.cookies = NaN;
    }


    login(username, password)
    {
        test('test', async ({ page }) => {
            await page.goto('https://www.instagram.com/');
            await page.getByLabel('Phone number, username, or email').click();
            await page.getByLabel('Phone number, username, or email').fill(username);
            await page.getByLabel('Password').click();
            await page.getByLabel('Password').fill(password);
            await page.getByRole('button', { name: 'Log in', exact: true }).click();    
            await page.goto('https://www.instagram.com/');
            const continueButton = await waitForElement('button:has-text("not now")');
            if (continueButton) {
              await continueButton.click();
            }


          });
          this.logged_in = true;
    }

    like_post(link='https://www.instagram.com/p/CylvVqopGni/')
    {        
        test('save_post', async ({ page }) => {
        await page.goto(link);
        await page.locator('div').filter({ hasText: /^LikeCommentShare PostShare Post$/ }).getByRole('button').first().click();
        }); 
    }

    save_post(link='https://www.instagram.com/p/CylvVqopGni/')
    {        
        test('save_post', async ({ page }) => {
        await page.goto(link);
        await page.getByRole('button', { name: 'Save' }).nth(1).click();
        }); 
    }
    

    comment_on_post(link='https://www.instagram.com/p/CylvVqopGni/', comment_str='delete this :(')
    {
        
        test('test', async ({ page }) => {
            await page.goto(link);
            await page.getByRole('button', { name: 'Comment', exact: true }).click();
            await page.getByPlaceholder('Add a comment...').click();
            await page.getByPlaceholder('Add a comment...').fill(comment_str);
            await page.getByRole('button', { name: 'Post' }).click();
        });
    }







}  


