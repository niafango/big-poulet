import {Message} from "discord.js";
import ICommand from "../ICommand";

const argsInfo: ICommand = {
    name: "args-info",
    aliases: ["argsInfo"],
    description: "Args-info",
    usage: "<...arguments>",

    coolDown: 5,
    isGuildOnly: false,
    hasArgs: true,
    minimumArgsNb: 1,

    execute(message: Message, args: string[]): void {
        if (args[0] === "foo") {
            message.channel.send("bar");
        } else {
            message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
        }
    },
};

module.exports = argsInfo;
