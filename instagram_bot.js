const { test, expect } = require('@playwright/test');
const SocialMediaBot = require('./social_media_bot.js');
const { delay } = require('./utils.js');

// Example of a subclass implementing the methods
class InstagramBot extends SocialMediaBot {
    constructor() {
        super();
    }

    async log_in(username, password) {
        try {
            await this.page.goto('https://www.instagram.com/?lang=en');
            await this.page.getByLabel('Phone number, username, or email').click();
            await this.page.getByLabel('Phone number, username, or email').fill(username);
            await this.page.getByLabel('Password').click();
            await this.page.getByLabel('Password').fill(password);
            await this.page.getByRole('button', { name: 'Log in', exact: true }).click();
            const continueButton = await this.waitForElement('button:has-text("not now")');
            if (continueButton) {
                await continueButton.click();
            }
        } catch (error) {
            console.log('ERR:');
            console.error(error);
            this.logged_in = false; // Return false in case of any errors
        }

        this.logged_in = true;
    }

    async like_post(link) {
        // Implement like_post logic for Instagram
        try {
            await this.page.goto(link);
            await this.page.getByRole('button', { name: 'Log in', exact: true }).click();
        } catch (error) {
            console.error(error);
            // Return false in case of any errors
        }
    }

    async save_post(link) {
        // Implement save_post logic for Instagram

        try {
            await this.page.goto(link);
            await this.page.getByRole('button', { name: 'Save' }).nth(1).click();
        } catch (error) {
            console.error(error);
            return false; // Return false in case of any errors
        }
    }

    async comment_on_post(link, comment_str) {
        // Implement comment_on_post logic for Instagram
        try {
            await this.page.goto(link);
            await this.page.getByRole('button', { name: 'Comment', exact: true }).click();
            await this.page.getByPlaceholder('Add a comment...').click();
            await this.page.getByPlaceholder('Add a comment...').fill(comment_str);
            await this.page.getByRole('button', { name: 'Post' }).click();
        } catch (error) {
            console.error(error);
            return false; // Return false in case of any errors
        }
    }

    async signup(mail, username, password) {
        // Implement signup logic for Instagram
    }

    async send_dm(username, msg_str) {
        // Implement send_dm logic for Instagram
    }

    async report_user(username) {
        // report user logic for Instagram
        await this.page.goto("https://www.instagram.com/" + username + "/", { timeout: 120000 })
        await this.page.getByRole('button', { name: 'Options' }).click();
        await this.page.getByRole('button', { name: 'Report' }).click();
        await this.page.getByRole('button', { name: 'Report Account chevron' }).click();
        await this.page.getByRole('button', { name: 'It\'s posting content that shouldn\'t be on Instagram chevron' }).click();
        await this.page.getByRole('button', { name: 'Hate speech or symbols chevron' }).click();
        await this.page.getByRole('button', { name: 'Submit report' }).click();
        await this.page.getByRole('button', { name: 'Close' }).click();
    }

    async watch_video(link, duration) {
        // watch a video for a certain duration(seconds) on Instagram
        await this.page.goto(link, { timeout: 120000, waitUntil: 'load' });
        await delay(duration * 1000);
        await this.page.locator('video').click();

    }
}



module.exports = InstagramBot;