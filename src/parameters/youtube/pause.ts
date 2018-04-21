import {Message} from "discord.js";
import YoutubeHandler from "../../handlers/YoutubeHandler";
import IYoutubeParameter from "../../interfaces/IYoutubeParameter";

const youtubePause: IYoutubeParameter = {
    name: "pause",
    description: "Met la lecture en pause.",
    usage: "",

    hasArgs: false,
    minimumArgsNb: 0,

    execute(message: Message, args: string[], handler: YoutubeHandler): void {
        handler.pause(message);
    },
};

module.exports = youtubePause;
