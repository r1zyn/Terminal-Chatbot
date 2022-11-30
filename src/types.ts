/**
 * Type structure for API response.
 * @exports
 * @interface
 */
export interface BrainResponse {
    /**
     * The message response from the bot.
     * @type {string}
     */
    cnt: string;
}

/**
 * Represents the type of message sender.
 * @exports
 */
export type Sender = "user" | "bot";