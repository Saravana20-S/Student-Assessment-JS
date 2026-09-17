import * as fs from "fs";
import * as path from "path";

export class FileHandler {

    public static readJson<T>(
        filePath: string
    ): T[] {

        try {

            const absolutePath =
                path.resolve(filePath);

            if (!fs.existsSync(absolutePath)) {
                return [];
            }

            const fileContent =
                fs.readFileSync(
                    absolutePath,
                    "utf-8"
                );

            if (!fileContent.trim()) {
                return [];
            }

            return JSON.parse(fileContent) as T[];

        } catch (error) {

            throw new Error(
                `Failed to read JSON file: ${filePath}`
            );
        }
    }

    public static writeJson<T>(
        filePath: string,
        data: T[]
    ): void {

        try {

            const absolutePath =
                path.resolve(filePath);

            const directory =
                path.dirname(absolutePath);

            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory, {
                    recursive: true
                });
            }

            fs.writeFileSync(
                absolutePath,
                JSON.stringify(data, null, 4),
                "utf-8"
            );

        } catch (error) {

            throw new Error(
                `Failed to write JSON file: ${filePath}`
            );
        }
    }
}