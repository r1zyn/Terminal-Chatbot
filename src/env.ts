declare global {
	namespace NodeJS {
		interface ProcessEnv {
            /**
             * The brain ID.
             * @type {string}
             */
			BID: string;

            /**
             * The access key for the brain.
             * @type {string}
             */
            KEY: string;

            /**
             * The Rapid API key.
             * @type {string}
             */
            RAPID_KEY: string;

            /**
             * The Rapid API host.
             * @type {string}
             */
            RAPID_HOST: string;
		}
	}
}

export const env: NodeJS.ProcessEnv = global.process.env || {
	NODE_ENV: process.env.NODE_ENV,
	TZ: process.env.TZ,
    BID: process.env.BID,
    KEY: process.env.KEY,
    RAPID_KEY: process.env.RAPID_KEY,
    RAPID_HOST: process.env.RAPID_HOST
};

if (process.env.NODE_ENV !== "production") global.process.env = env;