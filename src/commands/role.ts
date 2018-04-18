import {Message} from "discord.js";
import ICommand from "../ICommand";

const role: ICommand = {
    name: "role",
    description: "Role!",
    args: true,
    minimumArgsNb: 2,
    usage: "<user> <role>",

    execute(message: Message, args: string[]): void {
        const user = args[0];
        const userRole = args[1];
        message.channel.send(`${user} is now ${userRole}`);
    },
};

module.exports = role;
