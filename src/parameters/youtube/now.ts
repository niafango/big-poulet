import {Message} from "discord.js";
import i18n from "i18n";
import YoutubeHandler from "../../handlers/YoutubeHandler";
import IYoutubeParameter from "../../interfaces/IYoutubeParameter";

const youtubeNow: IYoutubeParameter = {
    name: "now",
    description: i18n.__("commands.youtube.parameters.now.description"),
    usage: "",

    hasArgs: false,
    minimumArgsNb: 0,

    execute(message: Message, args: string[], handler: YoutubeHandler): void {
        handler.sendWhatsPlayingNow(message);
    },
};

module.exports = youtubeNow;
