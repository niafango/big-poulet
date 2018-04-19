import {Message} from "discord.js";
import ICommand from "../ICommand";

const kick: ICommand = {
    name: "kick",
    aliases: [],
    description: "Kick!",
    usage: "",

    cooldown: 5,
    isGuildOnly: true,
    hasArgs: false,
    minimumArgsNb: 0,

    execute(message: Message): void {
        if (!message.mentions.users.size) {
            message.reply("You need to tag a user in order to kick them!");
            return;
        }

        const taggedUser = message.mentions.users.first();

        message.channel.send(`You wanted to kick: ${taggedUser.username}`);
    },
};

module.exports = kick;
