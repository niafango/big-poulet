import {Message} from "discord.js";
import ICommand from "../ICommand";

const ping: ICommand = {
    name: "ping",
    aliases: [],
    description: "Ping!",
    usage: "",

    cooldown: 5,
    isGuildOnly: false,
    hasArgs: false,
    minimumArgsNb: 0,

    execute(message: Message): void {
        message.channel.send("Pong.");
    },
};

module.exports = ping;
