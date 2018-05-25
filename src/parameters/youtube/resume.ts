import {Message} from "discord.js";
import i18n from "i18n";
import YoutubeHandler from "../../handlers/YoutubeHandler";
import IYoutubeParameter from "../../interfaces/IYoutubeParameter";

const youtubeResume: IYoutubeParameter = {
    name: "resume",
    description: i18n.__("commands.youtube.parameters.resume.description"),
    usage: "",

    hasArgs: false,
    minimumArgsNb: 0,

    execute(message: Message, args: string[], handler: YoutubeHandler): void {
        handler.resume(message);
    },
};

module.exports = youtubeResume;
