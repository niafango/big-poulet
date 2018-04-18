import {Collection} from "discord.js";
import fs = require("fs");
import ICommand from "../ICommand";

export default class CommandsSingleton {
    private static _instance: CommandsSingleton;
    public commands: Collection<string, ICommand>;

    private constructor() {
        this.commands = new Collection();

        const commandFiles: string[] = fs.readdirSync("./dist/commands");

        for (const file of commandFiles) {
            const command: ICommand = require(`../commands/${file}`);
            this.commands.set(command.name, command);
        }
    }

    public static get Instance(): CommandsSingleton {
        return this._instance || (this._instance = new this());
    }
}
