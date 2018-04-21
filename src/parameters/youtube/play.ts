import {Message} from "discord.js";
import YoutubeHandler from "../../handlers/YoutubeHandler";
import IYoutubeParameter from "../../interfaces/IYoutubeParameter";

const youtubePlay: IYoutubeParameter = {
    name: "play",
    description: "Ajoute un son à la queue.",
    usage: "<url>",

    hasArgs: true,
    minimumArgsNb: 1,

    execute(message: Message, args: string[], handler: YoutubeHandler): void {
        const url = args[0];
        handler.play(message, url);
    },
};

module.exports = youtubePlay;
