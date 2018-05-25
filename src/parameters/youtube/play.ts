import {Message} from "discord.js";
import i18n from "i18n";
import YoutubeHandler from "../../handlers/YoutubeHandler";
import IYoutubeParameter from "../../interfaces/IYoutubeParameter";

const youtubePlay: IYoutubeParameter = {
    name: "play",
    description: i18n.__("commands.youtube.parameters.play.description"),
    usage: i18n.__("commands.youtube.parameters.play.usage"),

    hasArgs: true,
    minimumArgsNb: 1,

    execute(message: Message, args: string[], handler: YoutubeHandler): void {
        const url = args[0];
        handler.play(message, url);
    },
};

module.exports = youtubePlay;
