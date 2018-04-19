import {Message} from "discord.js";
import ICommand from "../ICommand";
import CommandsSingleton from "../singletons/CommandsSingleton";
const { prefix } = require("../../config.json");

const help: ICommand = {
    name: "help",
    aliases: ["info", "commands"],
    description: "List all of my commands or info about a specific command.",
    usage: "[command name]",

    cooldown: 5,
    isGuildOnly: false,
    hasArgs: true,
    minimumArgsNb: 0,

    execute(message: Message, args: string[]): void {
        const commands = CommandsSingleton.Instance.commands;
        const data = [];

        if (!args.length) {
            data.push("Here's a list of all my commands:");
            data.push(commands.map((command) => command.name).join(", "));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);
        } else {
            const command = commands.get(args[0]);
            if (!command) {
                message.reply("That\'s not a valid command!");
                return;
            }

            data.push(`**Name:** ${command.name}`);
            data.push(`**Description:** ${command.description}`);
            if (command.aliases.length) {
                data.push(`**Aliases:** ${command.aliases.join(", ")}`);
            }
            data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
            data.push(`**Cooldown:** ${command.cooldown} second(s)`);
        }

        message.author.send(data, { split: true })
            .then(() => {
                if (message.channel.type !== "dm") {
                    message.channel.send("I've sent you a DM with all my commands!");
                }
            })
            .catch(() => message.reply("It seems like I can't DM you!"));
    },
};

module.exports = help;
