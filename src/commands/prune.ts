import {Message} from "discord.js";
import ICommand from "../ICommand";

const prune: ICommand = {
    name: "prune",
    description: "Prune!",
    usage: "<number of messages to delete>",

    coolDown: 5,
    isGuildOnly: false,
    hasArgs: true,
    minimumArgsNb: 1,

    execute(message: Message, args: string[]): void {
        const amount = parseInt(args[0], 10) + 1;

        if (isNaN(amount)) {
            message.reply("That doesn\'t seem to be a valid number.");
        } else if (amount < 2 || amount > 100) {
            message.reply("You need to input a number between 1 and 99.");
        } else {
            message.channel.bulkDelete(amount, true).catch((err) => {
                message.channel.send(`There was an error trying to prune messages in this channel!: ${err}`);
            });
        }
    },
};

module.exports = prune;
