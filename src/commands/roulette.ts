import {Message} from "discord.js";
import ICommand from "../ICommand";

const ping: ICommand = {
    name: "roulette",
    aliases: ["rand", "random"],
    description: "Retourne un résultat aléatoire parmi les arguments fournis.",
    usage: "<item1><item2><...item>",

    cooldown: 2,
    isGuildOnly: false,
    hasArgs: true,
    minimumArgsNb: 2,

    execute(message: Message, args: string[]): void {
        const selectedArgsIndex = Math.floor(Math.random() * args.length);
        message.channel.send(`Résultat : ${args[selectedArgsIndex]}\n`);
    },
};

module.exports = ping;
