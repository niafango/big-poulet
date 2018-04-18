import {Message} from "discord.js";
import ICommand from "../ICommand";

const role: ICommand = {
    name: "role",
    description: "Role!",
    usage: "<user> <role>",

    coolDown: 5,
    isGuildOnly: true,
    hasArgs: true,
    minimumArgsNb: 2,

    execute(message: Message, args: string[]): void {
        const user = args[0];
        const userRole = args[1];
        message.channel.send(`${user} is now ${userRole}`);
    },
};

module.exports = role;
