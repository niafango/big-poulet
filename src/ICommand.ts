import {Message} from "discord.js";

export default interface ICommand {
    name: string;
    description: string;

    execute(message: Message, args: string[]): void;
}
