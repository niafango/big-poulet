import {Message} from "discord.js";
import i18n from "i18n";
import YoutubeHandler from "../../handlers/YoutubeHandler";
import IYoutubeParameter from "../../interfaces/IYoutubeParameter";

const youtubeQueue: IYoutubeParameter = {
    name: "queue",
    description: i18n.__("commands.youtube.parameters.queue.description"),
    usage: "",

    hasArgs: false,
    minimumArgsNb: 0,

    execute(message: Message, args: string[], handler: YoutubeHandler): void {
        handler.sendQueue(message);
    },
};

module.exports = youtubeQueue;
