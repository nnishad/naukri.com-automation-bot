import fs from 'fs';
import { join } from 'path';

const logFilePath = join(__dirname, 'logs', 'app.log');

function log(message: string): void {
    const formattedMessage = `${new Date().toISOString()} - ${message}\n`;

    // Log to console
    console.log(formattedMessage);

    // Log to file
    fs.appendFile(logFilePath, formattedMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}

export default log;
