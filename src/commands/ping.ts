import {Message} from "discord.js";
import i18n from "i18n";
import ICommand from "../interfaces/ICommand";

const ping: ICommand = {
    name: "ping",
    aliases: [],
    description: i18n.__("commands.ping.description"),
    usage: "",

    cooldown: 5,
    isGuildOnly: false,
    hasArgs: false,
    minimumArgsNb: 0,
    hasParameters: false,

    execute(message: Message): void {
        message.channel.send(i18n.__("commands.ping.answer"));
    },
};

module.exports = ping;
