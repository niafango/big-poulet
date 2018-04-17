import {Message} from "discord.js";

module.exports = {
    name: "ping",
    description: "Ping!",
    execute(message: Message, args: string[]) {
        message.channel.send("Pong.");
    },
};
