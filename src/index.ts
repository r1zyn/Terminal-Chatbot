import type { BrainResponse, Sender } from "./types";

import chalk from "chalk";
import dotenv from "dotenv";
import fetch, { RequestInit, Response } from "node-fetch";
import readline from "readline";

dotenv.config();

/**
 * Fetch options for making requests to the API.
 * @type {RequestInit}
 */
const options: RequestInit = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": process.env.RAPID_KEY,
        "X-RapidAPI-Host": process.env.RAPID_HOST
    }
};

/**
 * Command line interface handler.
 * @type {readline.Interface}
 */
const cli: readline.Interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Formats messages to be displayed in the console.
 * @function
 * @param {Sender} sender The type of message sender
 * @param {string | undefined} message The message to send
 * @returns {string}
 */
function format(sender: Sender, message?: string): string {
    switch (sender) {
        case "user": return `${chalk.bgYellowBright(" You ")} ${message || ""}`;
        case "bot": return `${chalk.bgBlueBright(" Bot ")} ${message || ""}\n`;
    }
}

cli.on("line", async (): Promise<void> => {
    cli.question(format("user", ""), (input: string): void => {
        /**
         * API url to fetch response from.
         * @type {string}
         */
        const url: string = `http://api.brainshop.ai/get?bid=${process.env.BID}&key=${process.env.KEY}&uid=User&msg=${encodeURIComponent(input)}`;

        fetch(url, options)
            .then((res: Response): Promise<BrainResponse> => res.json() as Promise<BrainResponse>)
            .then((json: BrainResponse): void => cli.write(format("bot", json.cnt.replaceAll(/\<[A-Za-z]+\>[A-Za-z\c\s\S\d\D\w\W\x\O]*/g, ""))))
            .catch(console.error);
    });
});

cli.write(format("bot", "Hi, I'm a chatbot! Say something to start talking."));