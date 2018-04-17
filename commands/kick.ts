import {Message} from "discord.js";

module.exports = {
    name: "kick",
    description: "Kick!",
    execute(message: Message, args: string[]) {
        if (!message.mentions.users.size) {
            return message.reply("You need to tag a user in order to kick them!");
        }

        const taggedUser = message.mentions.users.first();

        message.channel.send(`You wanted to kick: ${taggedUser.username}`);
    },
};
