import {Message} from "discord.js";
import ICommand from "../ICommand";

const avatar: ICommand = {
    name: "avatar",
    aliases: ["icon", "pfp"],
    description: "Avatar!",
    usage: "",

    cooldown: 5,
    isGuildOnly: false,
    hasArgs: false,
    minimumArgsNb: 0,

    execute(message: Message): void {
        if (!message.mentions.users.size) {
            message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);
            return;
        }

        const avatarList = message.mentions.users.map((user) => {
            return `${user.username}'s avatar: ${user.displayAvatarURL}`;
        });

        message.channel.send(avatarList);
    },
};

module.exports = avatar;
