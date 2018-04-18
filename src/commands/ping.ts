import {Message} from "discord.js";
import ICommand from "../ICommand";

const ping: ICommand = {
    name: "ping",
    description: "Ping!",
    args: false,

    execute(message: Message): void {
        message.channel.send("Pong.");
    },
};

module.exports = ping;
