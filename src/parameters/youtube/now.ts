import {Message} from "discord.js";
import YoutubeHandler from "../../handlers/YoutubeHandler";
import IYoutubeParameter from "../../interfaces/IYoutubeParameter";

const youtubeNow: IYoutubeParameter = {
    name: "now",
    description: "Quel contenu passe actuellement.",
    usage: "",

    hasArgs: false,
    minimumArgsNb: 0,

    execute(message: Message, args: string[], handler: YoutubeHandler): void {
        handler.sendWhatsPlayingNow(message);
    },
};

module.exports = youtubeNow;
