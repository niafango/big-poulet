import {Message} from "discord.js";
import YoutubeHandler from "../../handlers/YoutubeHandler";
import IYoutubeParameter from "../../interfaces/IYoutubeParameter";

const youtubePrev: IYoutubeParameter = {
    name: "prev",
    description: "Passe au son précédent dans la queue.",
    usage: "",

    hasArgs: false,
    minimumArgsNb: 0,

    execute(message: Message, args: string[], handler: YoutubeHandler): void {
        handler.prev(message);
    },
};

module.exports = youtubePrev;
