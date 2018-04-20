import {Collection, Message} from "discord.js";
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
            message.reply(`Cette commande doit avoir des paramètres.\n` +
                `Si tu veux bien faire les choses : \`${this._prefix}${command.name} <param>\``);
            return;
        }

        if (command.isGuildOnly && message.channel.type !== "text") {
            message.reply("Cette commande ne peut pas être exécuter en message privé.");
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
            message.reply("Et là, c'est le bug. Cette commande semble codée avec le cul.");
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
            this._commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
    }

    private _checkArgs(message: Message, command: ICommand, args: string[], parameter?: IParameter): boolean {
        if ((!command.hasParameters && command.hasArgs && args.length < command.minimumArgsNb) ||
            (command.hasParameters && parameter && parameter.hasArgs && args.length < parameter.minimumArgsNb)) {

            let reply: string;

            if (!args.length) {
                reply = "Il faut mettre des arguments con de mime.";
            } else {
                reply = "Il n'y a pas assez d'arguments, comment veux-tu keksa marche ?";
            }
            if (command.hasParameters && parameter) {
                reply += `\nSi tu veux bien faire les choses : ` +
                    `\`${this._prefix}${command.name} ${parameter.name} ${parameter.usage}\``;
            } else {
                reply += `\nSi tu veux bien faire les choses : \`${this._prefix}${command.name} ${command.usage}\``;
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

                    message.reply(`Patiente ${timeLeft.toFixed(1)} ` +
                        `de plus avant de réutiliser la commande \`${command.name}\`.\n` +
                        `(La prochaine fois que tu essayes de spammer mon bot, ` +
                        `je viens chez toi et je mange tout ce qu'il y a dans ton frigo)`);

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