import {Message} from "discord.js";
import i18n from "i18n";
import ICommand from "../interfaces/ICommand";

const roulette: ICommand = {
    name: "roulette",
    aliases: ["rand", "random"],
    description: i18n.__("commands.roulette.description"),
    usage: i18n.__("commands.roulette.usage"),

    cooldown: 2,
    isGuildOnly: false,
    hasArgs: true,
    minimumArgsNb: 2,
    hasParameters: false,

    execute(message: Message, args: string[]): void {
        const selectedArgsIndex = Math.floor(Math.random() * args.length);
        message.channel.send(i18n.__("commands.roulette.answer", args[selectedArgsIndex]));
    },
};

module.exports = roulette;
