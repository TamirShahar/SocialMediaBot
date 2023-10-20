from playwright.sync_api import Playwright, sync_playwright, expect


def run(playwright: Playwright) -> None:
    browser = playwright.chromium.launch(headless=False)
    context = browser.new_context()
    page = context.new_page()
    page.goto("https://www.tiktok.com/@slemanabu5/video/7061739368691649794")
    page.locator("div").filter(has_text=re.compile(r"^SpeedReportKeyboard$")).get_by_role("img").nth(2).click()
    page.get_by_role("dialog").locator("div").nth(2).click()
    page.get_by_role("button", name="Submit").click()
    page.get_by_role("button", name="Done").click()

    # ---------------------
    context.close()
    browser.close()


with sync_playwright() as playwright:
    run(playwright)
