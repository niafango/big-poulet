import {Message} from "discord.js";
import ICommand from "../ICommand";

const ping: ICommand = {
    name: "ping",
    description: "Ping!",

    execute(message: Message, args: string[]): void {
        message.channel.send("Pong.");
    },
};

module.exports = ping;
