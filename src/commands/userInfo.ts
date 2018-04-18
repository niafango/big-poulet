import {Message} from "discord.js";
import ICommand from "../ICommand";

const userInfo: ICommand = {
    name: "user-info",
    description: "User-info!",
    args: false,

    execute(message: Message): void {
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    },
};

module.exports = userInfo;
