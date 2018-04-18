import { Client, Collection } from "discord.js";
import fs = require("fs");
import ICommand from "./ICommand";
const { prefix, token } = require("../config.json");

const client = new Client();
const commands: Collection<string, ICommand> = new Collection();

const commandFiles: string[] = fs.readdirSync("./dist/commands");

for (const file of commandFiles) {
    const command: ICommand = require(`./commands/${file}`);
    commands.set(command.name, command);
}

client.on("message", (message): void => {
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    const args: string[] = message.content.slice(prefix.length).split(/ +/);
    const firstArg = args.shift();

    if (!firstArg) {
        return;
    }

    const commandName = firstArg.toLowerCase();

    if (!commands.has(commandName)) {
        return;
    }
    const command = commands.get(commandName);

    if (!command) {
        return;
    }

    if (command.args && args.length < command.minimumArgsNb) {
        let reply: string;

        if (!args.length) {
            reply = ("You didn't provide any arguments!");
        } else {
            reply = ("You didn't provide enough arguments!");
        }
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;

        message.reply(reply);
        return;
    }

    try {
        command.execute(message, args);
    } catch (error) {
        message.reply("There was an error trying to execute that command!");
    }
});

client.login(token);
