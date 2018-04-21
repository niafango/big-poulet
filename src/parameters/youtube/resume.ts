import {Message} from "discord.js";
import YoutubeHandler from "../../handlers/YoutubeHandler";
import IYoutubeParameter from "../../interfaces/IYoutubeParameter";

const youtubeResume: IYoutubeParameter = {
    name: "resume",
    description: "Reprend la lecture.",
    usage: "",

    hasArgs: false,
    minimumArgsNb: 0,

    execute(message: Message, args: string[], handler: YoutubeHandler): void {
        handler.resume(message);
    },
};

module.exports = youtubeResume;
