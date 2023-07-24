import dotenv from 'dotenv';
import log from './logger';

dotenv.config();

export function randomWait(): Promise<void> {
    const minWaitTime = parseInt(process.env.MIN_WAIT_TIME || '100', 10);
    const maxWaitTime = parseInt(process.env.MAX_WAIT_TIME || '5000', 10);

    if (isNaN(minWaitTime) || isNaN(maxWaitTime)) {
        log('Invalid MIN_WAIT_TIME or MAX_WAIT_TIME in the .env file. Using default values.');
        return Promise.resolve();
    }

    if (minWaitTime >= maxWaitTime) {
        log('MIN_WAIT_TIME should be less than MAX_WAIT_TIME in the .env file. Using default values.');
        return Promise.resolve();
    }

    const waitTime = Math.floor(Math.random() * (maxWaitTime - minWaitTime + 1)) + minWaitTime;

    log(`Generated wait time: ${waitTime} milliseconds`);

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, waitTime);
    });
}
