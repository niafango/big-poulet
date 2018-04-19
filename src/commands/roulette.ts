import {Message} from "discord.js";
import ICommand from "../ICommand";

const roulette: ICommand = {
    name: "roulette",
    aliases: ["rand", "random"],
    description: "Retourne un résultat aléatoire parmi les arguments fournis.",
    usage: "<item 1> <item 2> <item n>",

    cooldown: 2,
    isGuildOnly: false,
    hasArgs: true,
    minimumArgsNb: 2,

    execute(message: Message, args: string[]): void {
        const selectedArgsIndex = Math.floor(Math.random() * args.length);
        message.channel.send(`Résultat : ${args[selectedArgsIndex]}\n`);
    },
};

module.exports = roulette;
