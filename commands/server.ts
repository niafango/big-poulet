import {Message} from "discord.js";

module.exports = {
    name: "server",
    description: "Server!",
    execute(message: Message, args: string[]) {
        message.channel.send(
            `Server name: ${message.guild.name}\n` +
            `Total members: ${message.guild.memberCount}\n` +
            `Server creation: ${message.guild.createdAt}\n` +
            `Region: ${message.guild.region}`);
    },
};
