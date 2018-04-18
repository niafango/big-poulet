import {Message} from "discord.js";
import ICommand from "../ICommand";

const argsInfo: ICommand = {
    name: "args-info",
    description: "Args-info",

    execute(message: Message, args: string[]): void {
        if (!args.length) {
            message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        } else if (args[0] === "foo") {
            message.channel.send("bar");
        } else {
            message.channel.send(`First argument: ${args[0]}`);
        }
    },
};

module.exports = argsInfo;
