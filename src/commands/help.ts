import {Message} from "discord.js";
import i18n from "i18n";
import ICommand from "../interfaces/ICommand";
import SCommands from "../singletons/SCommands";
import SConfig from "../singletons/SConfig";

const prefix = SConfig.Instance.prefix;

const help: ICommand = {
    name: "help",
    aliases: ["commands", "commandes", "aide"],
    description: i18n.__("commands.help.description"),
    usage: i18n.__("commands.help.usage"),

    cooldown: 1,
    isGuildOnly: false,
    hasArgs: true,
    minimumArgsNb: 0,
    hasParameters: false,

    execute(message: Message, args: string[]): void {
        const commands = SCommands.Instance.commands;
        const data: string[] = [];

        if (!args.length) {
            data.push(i18n.__("commands.help.answers.commandList",
                commands.map((command) => command.name).join("`, `")));
            data.push(i18n.__("commands.help.answers.commandHelp", prefix));
            data.push(i18n.__("commands.help.answers.askForHelp"));
        } else {
            const command = commands.get(args[0]);
            if (!command) {
                message.reply(i18n.__("commands.help.errors.unknownCommand"));
                return;
            }

            data.push(i18n.__("commands.help.answers.name", command.name));
            data.push(i18n.__("commands.help.answers.description", command.description));
            if (command.aliases.length) {
                data.push(i18n.__("commands.help.answers.alias", command.aliases.join("`, `")));
            }
            data.push(i18n.__("commands.help.answers.cooldown", command.cooldown.toString()));

            if (command.hasParameters && command.parameters) {
                data.push(i18n.__("commands.help.answers.usageWithParameters", prefix, command.name));
                data.push(i18n.__("commands.help.answers.parameters"));

                command.parameters.forEach((parameter) => {
                    data.push(`     \`${parameter.name} ${parameter.usage}\` - ${parameter.description}`);
                });

            } else {
                data.push(i18n.__("commands.help.answers.usage", prefix, command.name, command.usage));
            }
        }

        message.author.send(data, { split: true })
            .then(() => {
                if (message.channel.type !== "dm") {
                    message.channel.send(i18n.__("commands.help.answers.answeredInDM"));
                }
            })
            .catch(() => message.reply(i18n.__("commands.help.errors.cantDM")));
    },
};

module.exports = help;
