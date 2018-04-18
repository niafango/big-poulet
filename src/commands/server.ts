import {Message} from "discord.js";
import ICommand from "../ICommand";

const server: ICommand = {
    name: "server",
    aliases: ["serv", "server-info", "serverInfo"],
    description: "Server!",
    usage: "",

    coolDown: 5,
    isGuildOnly: true,
    hasArgs: false,
    minimumArgsNb: 0,

    execute(message: Message): void {
        message.channel.send(
            `Server name: ${message.guild.name}\n` +
            `Total members: ${message.guild.memberCount}\n` +
            `Server creation: ${message.guild.createdAt}\n` +
            `Region: ${message.guild.region}`);
    },
};

module.exports = server;
