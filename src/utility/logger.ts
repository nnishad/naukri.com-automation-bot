import fs from 'fs';
import path from 'path';

const logsDir = path.join(__dirname, '../../logs'); // Change the path to the desired log directory

export function log(message: string): void {
    const logMessage = `[${new Date().toISOString()}] ${message}\n`;

    try {
        // Check if the logs directory exists, and create it if it doesn't
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir);
        }

        // Append the log message to the log file
        fs.appendFileSync(path.join(logsDir, 'automation.log'), logMessage);
    } catch (error) {
        console.error('Error writing to log file:', error);
    }
}
