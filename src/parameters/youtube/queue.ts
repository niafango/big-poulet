import {Message} from "discord.js";
import YoutubeHandler from "../../handlers/YoutubeHandler";
import IYoutubeParameter from "../../interfaces/IYoutubeParameter";

const youtubeQueue: IYoutubeParameter = {
    name: "queue",
    description: "Affiche le contenu de la queue. (En cours de développement)",
    usage: "",

    hasArgs: false,
    minimumArgsNb: 0,

    execute(message: Message, args: string[], handler: YoutubeHandler): void {
        message.reply("Simon c'est un branleur, cette commande n'est pas encore implémentée");
    },
};

module.exports = youtubeQueue;
