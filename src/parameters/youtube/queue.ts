import {Message} from "discord.js";
import YoutubeHandler from "../../handlers/YoutubeHandler";
import IYoutubeParameter from "../../interfaces/IYoutubeParameter";

const youtubeQueue: IYoutubeParameter = {
    name: "queue",
    description: "Affiche le contenu de la queue.",
    usage: "",

    hasArgs: false,
    minimumArgsNb: 0,

    execute(message: Message, args: string[], handler: YoutubeHandler): void {
        handler.sendQueue(message);
    },
};

module.exports = youtubeQueue;
