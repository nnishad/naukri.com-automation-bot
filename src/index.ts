import dotenv from 'dotenv';
import log from './utility/logger';
import {handleError} from './utility/errorHandler';
import {XPaths} from './utility/constants';
import {randomWait} from './utility/util';
import {getBrowser, getPage} from "./core/puppeteerInstance";

dotenv.config();

// Rest of the code remains unchanged

async function doAutomation() {
    const browser = await getBrowser();
    const page = await getPage();

    try {
        // Use the browser and page instances to perform your automation tasks
        await page.goto('https://www.naukri.com/');

        // Wait for a random period between 0.1 and 5 seconds (optional)
        await randomWait();

        // Wait for the element with id "login_Layer" and title "Jobseeker Login" to appear
        await page.waitForSelector(XPaths.loginButton);

        // Click on the element
        await page.click(XPaths.loginButton);

        log('Clicked on the "Jobseeker Login" button.');

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
