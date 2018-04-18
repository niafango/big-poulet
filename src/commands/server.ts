import {Message} from "discord.js";
import ICommand from "../ICommand";

const server: ICommand = {
    name: "server",
    description: "Server!",
    args: false,

    execute(message: Message): void {
        message.channel.send(
            `Server name: ${message.guild.name}\n` +
            `Total members: ${message.guild.memberCount}\n` +
            `Server creation: ${message.guild.createdAt}\n` +
            `Region: ${message.guild.region}`);
    },
};

module.exports = server;
