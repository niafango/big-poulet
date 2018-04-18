import {Client, Collection, Message} from "discord.js";
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

const coolDowns: Collection<string, Collection<string, number>> = new Collection();

client.on("ready", () => {
    console.log("Ready!");
});

client.on("message", (message: Message): void => {
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    const args: string[] = message.content.slice(prefix.length).split(/ +/);
    const firstArg = args.shift();

    if (!firstArg) {
        return;
    }

    const commandName = firstArg.toLowerCase();

    const command = commands.get(commandName) ||
        commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) {
        return;
    }

    if (command.isGuildOnly && message.channel.type !== "text") {
        message.reply("I can't execute that command inside DMs!");
        return;
    }

    if (command.hasArgs && args.length < command.minimumArgsNb) {
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

    if (!coolDowns.has(command.name)) {
        coolDowns.set(command.name, new Collection());
    }

    const timestamps = coolDowns.get(command.name);
    if (timestamps) {
        const now = Date.now();
        const coolDownAmount = command.coolDown * 1000;

        const timestamp = timestamps.get(message.author.id);
        if (!timestamp) {
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), coolDownAmount);
        } else {
            const expirationTime = timestamp + coolDownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                message.reply(`Please wait ${timeLeft.toFixed(1)} ` +
                    `more second(s) before reusing the \`${command.name}\` command.`);
                return;
            }

            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), coolDownAmount);
        }
    }

    try {
        command.execute(message, args);
    } catch (error) {
        message.reply("There was an error trying to execute that command!");
    }
});

client.login(token);
