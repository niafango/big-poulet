import {Collection, Message} from "discord.js";
import i18n from "i18n";
import ICommand from "../interfaces/ICommand";
import IParameter from "../interfaces/IParameter";
import SCommands from "../singletons/SCommands";
import SConfig from "../singletons/SConfig";

export default class CommandHandler {
    private static _getParameter(command: ICommand, args: string[]): IParameter | undefined {
        if (!command.hasParameters || !command.parameters) {
            return undefined;
        }

        const firstArg = args.shift();
        if (!firstArg) {
            return undefined;
        }

        const parameterName = firstArg.toLowerCase();

        return command.parameters.get(parameterName);
    }

    private readonly _prefix: string;
    private readonly _commands: Collection<string, ICommand>;
    private _cooldowns: Collection<string, Collection<string, number>>;

    constructor() {
        this._prefix = SConfig.Instance.prefix;
        this._commands = SCommands.Instance.commands;
        this._cooldowns = new Collection<string, Collection<string, number>>();
    }

    public handleCommand(message: Message): void {
        if (!this._isCommand(message)) {
            return;
        }

        const args = this._getArgs(message);
        const command = this._getCommand(args);
        if (!command) {
            return;
        }

        const parameter = CommandHandler._getParameter(command, args);
        if (command.hasParameters && !parameter) {
            const reply: string[] = [];

            reply.push(i18n.__("errors.noParameter"));
            reply.push(i18n.__("errors.argumentAdviseWithParameter", this._prefix, command.name));

            message.reply(reply);
            return;
        }

        if (command.isGuildOnly && message.channel.type !== "text") {
            message.reply(i18n.__("errors.serverOnly"));
            return;
        }

        if (!this._checkArgs(message, command, args, parameter)) {
            return;
        }

        if (!this._checkCooldowns(message, command)) {
            return;
        }

        try {
            command.execute(message, args, parameter);
        } catch (error) {
            console.error(error);
            message.reply(i18n.__("errors.commandCrash"));
        }
    }

    private _isCommand(message: Message): boolean {
        return message.content.startsWith(this._prefix) && !message.author.bot;
    }

    private _getArgs(message: Message): string[] {
        return message.content.slice(this._prefix.length).split(/ +/);
    }

    private _getCommand(args: string[]): ICommand | undefined {
        const firstArg = args.shift();

        if (!firstArg) {
            return undefined;
        }

        const commandName = firstArg.toLowerCase();

        return this._commands.get(commandName) ||
            this._commands.find((cmd) => cmd.aliases && cmd.aliases.indexOf(commandName) !== -1);
    }

    private _checkArgs(message: Message, command: ICommand, args: string[], parameter?: IParameter): boolean {
        if ((!command.hasParameters && command.hasArgs && args.length < command.minimumArgsNb) ||
            (command.hasParameters && parameter && parameter.hasArgs && args.length < parameter.minimumArgsNb)) {

            const reply: string[] = [];

            if (!args.length) {
                reply.push(i18n.__("errors.noArgument"));
            } else {
                reply.push(i18n.__("errors.notEnoughArguments"));
            }
            if (command.hasParameters && parameter) {
                reply.push(i18n.__("errors.parameterAdvise",
                    this._prefix, command.name, parameter.name, parameter.usage));
            } else {
                reply.push(i18n.__("errors.argumentAdvise", this._prefix, command.name, command.usage));
            }

            message.reply(reply);
            return false;
        }
        return true;
    }

    private _checkCooldowns(message: Message, command: ICommand): boolean {
        if (!this._cooldowns.has(command.name)) {
            this._cooldowns.set(command.name, new Collection());
        }

        const timestamps = this._cooldowns.get(command.name);
        if (timestamps) {
            const cooldownAmount = command.cooldown * 1000;

            const timestamp = timestamps.get(message.author.id);
            if (!timestamp) {
                this._setCooldown(message, timestamps, cooldownAmount);
            } else {
                const now = Date.now();
                const expirationTime = timestamp + cooldownAmount;

                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    message.reply(i18n.__("errors.spam", timeLeft.toFixed(1), command.name));
                    return false;
                }

                this._setCooldown(message, timestamps, cooldownAmount);
            }
        }
        return true;
    }

    private _setCooldown(message: Message, timestamps: Collection<string, number>, cooldownAmount: number): void {
        const now = Date.now();

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
}
