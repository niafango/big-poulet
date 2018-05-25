import {Message} from "discord.js";
import i18n from "i18n";
import ICommand from "../interfaces/ICommand";

const server: ICommand = {
    name: "server",
    aliases: ["serv", "server-info", "serverInfo", "serveur"],
    description: i18n.__("commands.server.description"),
    usage: "",

    cooldown: 5,
    isGuildOnly: true,
    hasArgs: false,
    minimumArgsNb: 0,
    hasParameters: false,

    execute(message: Message): void {
        const answer: string[] = [];

        answer.push(i18n.__("commands.server.answers.name", message.guild.name));
        answer.push(i18n.__("commands.server.answers.memberNumber", message.guild.memberCount.toString()));
        answer.push(i18n.__("commands.server.answers.creationDate", message.guild.createdAt.toString()));
        answer.push(i18n.__("commands.server.answers.region", message.guild.region));

        message.channel.send(answer);
    },
};

module.exports = server;
