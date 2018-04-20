export default class SConfig {
    private static _instance: SConfig;
    private readonly _token: string;
    private readonly _prefix: string;

    private constructor() {
        if (process.env.DISCORD_TOKEN) {
            this._token = process.env.DISCORD_TOKEN;
        } else {
            this._token = require("../../config.json").token;
        }

        if (process.env.DISCORD_PREFIX) {
            this._prefix = process.env.DISCORD_PREFIX;
        } else {
            this._prefix = require("../../config.json").prefix;
        }
    }

    get token(): string {
        return this._token;
    }

    get prefix(): string {
        return this._prefix;
    }

    public static get Instance(): SConfig {
        return this._instance || (this._instance = new SConfig());
    }
}
