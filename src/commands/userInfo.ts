import {Message} from "discord.js";
import ICommand from "../ICommand";

const userInfo: ICommand = {
    name: "user-info",
    aliases: ["userInfo"],
    description: "User-info!",
    usage: "",

    coolDown: 5,
    isGuildOnly: false,
    hasArgs: false,
    minimumArgsNb: 0,

    execute(message: Message): void {
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    },
};

module.exports = userInfo;
