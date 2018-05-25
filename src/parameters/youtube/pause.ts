import {Message} from "discord.js";
import i18n from "i18n";
import YoutubeHandler from "../../handlers/YoutubeHandler";
import IYoutubeParameter from "../../interfaces/IYoutubeParameter";

const youtubePause: IYoutubeParameter = {
    name: "pause",
    description: i18n.__("commands.youtube.parameters.pause.description"),
    usage: "",

    hasArgs: false,
    minimumArgsNb: 0,

    execute(message: Message, args: string[], handler: YoutubeHandler): void {
        handler.pause(message);
    },
};

module.exports = youtubePause;
