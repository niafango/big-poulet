import {Message} from "discord.js";
import ICommand from "../interfaces/ICommand";
import SCommands from "../singletons/SCommands";
import SConfig from "../singletons/SConfig";

const prefix = SConfig.Instance.prefix;

const help: ICommand = {
    name: "help",
    aliases: ["commands", "commandes", "aide"],
    description: "Liste de toutes le commandes ou information à propos d'un commande spécifique.",
    usage: "[nom de la commande]",

    cooldown: 1,
    isGuildOnly: false,
    hasArgs: true,
    minimumArgsNb: 0,
    hasParameters: false,

    execute(message: Message, args: string[]): void {
        const commands = SCommands.Instance.commands;
        const data: string[] = [];

        if (!args.length) {
            data.push("Voici la liste des commandes :");
            data.push("`" + commands.map((command) => command.name).join("`, `") + "`");
            data.push(`\nTu peux envoyer \`${prefix}help [nom de la commande]\` ` +
                `pour avoir plus d'informations sur une commande spécifique.`);
            data.push(`\nLe bot est en cours de développement et est Open Source.`);
            data.push(`N'hésite pas à proposer des idées à Simon et/ou à participer au développement.`);
            data.push(`Url du projet : https://github.com/niafango/big-poulet`);
        } else {
            const command = commands.get(args[0]);
            if (!command) {
                message.reply("Cette commande n'existe pas narvalo !");
                return;
            }

            data.push(`**Nom :** \`${command.name}\``);
            data.push(`**Description :** ${command.description}`);
            if (command.aliases.length) {
                data.push(`**Alias :** \`${command.aliases.join("`, `")}\``);
            }
            data.push(`**Cooldown :** ${command.cooldown} seconde(s)`);

            if (command.hasParameters && command.parameters) {
                data.push(`**Usage :** \`${prefix}${command.name} <param>\``);
                data.push(`**Paramètres :**`);

                command.parameters.forEach((parameter) => {
                    data.push(`     \`${parameter.name} ${parameter.usage}\` - ${parameter.description}`);
                });

            } else {
                data.push(`**Usage :** \`${prefix}${command.name} ${command.usage}\``);
            }
        }

        message.author.send(data, { split: true })
            .then(() => {
                if (message.channel.type !== "dm") {
                    message.channel.send("Je t'ai répondu en message privé.");
                }
            })
            .catch(() => message.reply("Tu m'as bloqué ou quoi ? Je peux pas t'envoyer de message privé :("));
    },
};

module.exports = help;
