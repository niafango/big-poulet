import {Collection} from "discord.js";
import fs = require("fs");
import path = require("path");
import ICommand from "../interfaces/ICommand";

export default class SCommands {
    private static _instance: SCommands;
    private readonly _commands: Collection<string, ICommand>;

    private constructor() {
        this._commands = new Collection();

        const commandFiles: string[] = fs.readdirSync("./dist/commands");

        for (const file of commandFiles) {
            if (path.extname(file) === ".js") {
                const command: ICommand = require(`../commands/${file}`);
                this._commands.set(command.name, command);
            }
        }
    }

    get commands(): Collection<string, ICommand> {
        return this._commands;
    }

    public static get Instance(): SCommands {
        return this._instance || (this._instance = new SCommands());
    }
}
