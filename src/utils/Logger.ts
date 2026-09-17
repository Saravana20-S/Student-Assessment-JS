import * as fs from "fs";
import * as path from "path";

export class Logger {

    private static readonly logDirectory =
        path.join(process.cwd(), "logs");

    private static readonly logFile =
        path.join(
            Logger.logDirectory,
            "application.log"
        );

    private static ensureLogDirectory(): void {

        if (!fs.existsSync(Logger.logDirectory)) {
            fs.mkdirSync(Logger.logDirectory, {
                recursive: true
            });
        }
    }

    private static writeLog(
        level: string,
        message: string
    ): void {

        Logger.ensureLogDirectory();

        const timestamp =
            new Date().toISOString();

        const logMessage =
            `[${timestamp}] [${level}] ${message}\n`;

        fs.appendFileSync(
            Logger.logFile,
            logMessage,
            "utf-8"
        );
    }

    public static info(message: string): void {
        Logger.writeLog("INFO", message);
    }

    public static error(message: string): void {
        Logger.writeLog("ERROR", message);
    }
}