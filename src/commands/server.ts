import {Message} from "discord.js";
import ICommand from "../ICommand";

const server: ICommand = {
    name: "server",
    aliases: ["serv", "server-info", "serverInfo", "serveur"],
    description: "Donne quelques informations à propos du server.",
    usage: "",

    cooldown: 5,
    isGuildOnly: true,
    hasArgs: false,
    minimumArgsNb: 0,

    execute(message: Message): void {
        message.channel.send(
            `Nom du serveur : ${message.guild.name}\n` +
            `Nombre de membres : ${message.guild.memberCount}\n` +
            `Date de création : ${message.guild.createdAt}\n` +
            `Région : ${message.guild.region}`);
    },
};

module.exports = server;
