import dotenv from 'dotenv';
import {log} from './utility/logger';
import {handleError} from './utility/errorHandler';
import {XPaths} from './utility/constants';
import {enterOTP, getElementAndClick, getElementAndType, randomWait, waitSeconds} from './utility/util';
import {getBrowser, getPage} from "./core/puppeteerInstance";
import * as readline from "readline";

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

        await getElementAndClick(page, XPaths.loginPopUpButton);

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

        // Wait for a random period between 0.1 and 5 seconds (optional)
        await randomWait();

        // Perform actions on the password input element using the getElementAndType utility function
        await getElementAndType(page, XPaths.passwordInput, yourPassword);
        log('Entered password.');

        // Optionally wait for a random period between 0.1 and 5 seconds (optional)
        await randomWait();

        // Click on the "Login" button using the getElementAndClick utility function
        // await getElementAndClick(page, XPaths.loginButton);
        await page.keyboard.press('Enter');

        // Use readline to prompt the user for the 6-digit code
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Please enter the 6-digit code: ', async (code) => {
            rl.close();

            if (code.length !== 6 || !/^\d+$/.test(code)) {
                handleError(new Error('Invalid input. Please enter a valid 6-digit code.'));
                return;
            }

            // Enter the OTP using the utility function
            await enterOTP(page, code);

            // After entering the OTP, you can continue with other automation tasks
            await page.keyboard.press('Enter');

            // Optionally wait for a random period between 0.1 and 5 seconds (optional)
            await randomWait();

            // ... (Other code)
        });

        await waitSeconds(100)
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
