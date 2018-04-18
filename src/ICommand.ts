import {Message} from "discord.js";

export default interface ICommand {
    name: string;
    description: string;
    args: boolean;
    minimumArgsNb: number;
    usage: string;

    execute(message: Message, args?: string[]): void;
}
