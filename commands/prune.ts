import {Message} from "discord.js";

module.exports = {
    name: "prune",
    description: "Prune!",
    execute(message: Message, args: string[]) {
        const amount = parseInt(args[0], 10) + 1;

        if (isNaN(amount)) {
            return message.reply("That doesn\'t seem to be a valid number.");
        } else if (amount < 2 || amount > 100) {
            return message.reply("You need to input a number between 1 and 99.");
        }

        message.channel.bulkDelete(amount, true).catch((err) => {
            message.channel.send(`There was an error trying to prune messages in this channel!: ${err}`);
        });
    },
};
