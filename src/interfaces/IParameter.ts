import {Message} from "discord.js";

export default interface IParameter {
    name: string;
    description: string;
    usage: string;

    hasArgs: boolean;
    minimumArgsNb: number;

    execute(message: Message, args?: string[]): void;
}
