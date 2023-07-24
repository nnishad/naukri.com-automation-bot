import {getBrowser, getPage, close} from './core/puppeteerInstance';
import log from './utility/logger';
import {handleError} from './utility/errorHandler';
import {XPaths} from './utility/constants';

async function doAutomation() {
    const browser = await getBrowser();
    const page = await getPage();

    try {
        // Use the browser and page instances to perform your automation tasks
        await page.goto('https://www.naukri.com/');

        // Wait for the element with id "login_Layer" and title "Jobseeker Login" to appear
        await page.waitForSelector(XPaths.loginButton);

        // Click on the element
        await page.click(XPaths.loginButton);

        log('Clicked on the "Jobseeker Login" button.');

        // Wait for a few seconds (optional) to see the result before closing the browser
        await page.waitForTimeout(5000);

    } catch (error: any) {
        handleError(error);
    } finally {
        try {
            await browser.close();
        } catch (error: any) {
            handleError(error);
        }
    }
}

// Call the function
doAutomation().then(() => {
    console.log('Automation Completed');
});
