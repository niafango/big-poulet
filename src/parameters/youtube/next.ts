import {Message} from "discord.js";
import YoutubeHandler from "../../handlers/YoutubeHandler";
import IYoutubeParameter from "../../interfaces/IYoutubeParameter";

const youtubeNext: IYoutubeParameter = {
    name: "next",
    description: "Passe au son suivant dans la queue.",
    usage: "",

    hasArgs: false,
    minimumArgsNb: 0,

    execute(message: Message, args: string[], handler: YoutubeHandler): void {
        handler.next(message);
    },
};

module.exports = youtubeNext;
