import {Message} from "discord.js";

export default interface ICommand {
    name: string;
    aliases: string[];
    description: string;
    usage: string;

    coolDown: number;
    isGuildOnly: boolean;
    hasArgs: boolean;
    minimumArgsNb: number;

    execute(message: Message, args?: string[]): void;
}
