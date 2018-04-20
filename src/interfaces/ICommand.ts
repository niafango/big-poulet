import {Collection, Message} from "discord.js";
import IParameter from "./IParameter";

export default interface ICommand {
    name: string;
    aliases: string[];
    description: string;
    usage: string;

    cooldown: number;
    isGuildOnly: boolean;
    hasArgs: boolean;
    minimumArgsNb: number;
    hasParameters: boolean;
    parameters?: Collection<string, IParameter>;

    execute(message: Message, args?: string[], parameter?: IParameter): void;
}
