import {Message} from "discord.js";
import YoutubeHandler from "../../handlers/YoutubeHandler";
import IYoutubeParameter from "../../interfaces/IYoutubeParameter";

const youtubeStop: IYoutubeParameter = {
    name: "stop",
    description: "Stop la lecture, la queue est perdue et le bot part du channel vocal courant. (En cours de développement)",
    usage: "",

    hasArgs: false,
    minimumArgsNb: 0,

    execute(message: Message, args: string[], handler: YoutubeHandler): void {
        message.reply("Simon c'est un branleur, cette commande n'est pas encore implémentée");
    },
};

module.exports = youtubeStop;
