import dotenv from 'dotenv';
import {log} from './utility/logger';
import {handleError} from './utility/errorHandler';
import {XPaths} from './utility/constants';
import {getElementAndClick, getElementAndType, randomWait, waitSeconds} from './utility/util';
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

        await getElementAndClick(page, XPaths.loginButton);

        log('Clicked on the "Jobseeker Login" button.')


        // Perform actions on the email input element using the getElementAndType utility function
        // Get the email and password from environment variables with null checks
        const yourEmailAddress = process.env.YOUR_EMAIL_ADDRESS;
        const yourPassword = process.env.YOUR_PASSWORD;

        if (!yourEmailAddress || !yourPassword) {
            throw new Error('Email address and password environment variables are not set.');
        }

        await getElementAndType(page, XPaths.emailInput, yourEmailAddress);
        log(`Entered email address: ${yourEmailAddress}`);

        await waitSeconds(10)
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
