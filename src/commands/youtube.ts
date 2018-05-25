import {Collection, Message} from "discord.js";
import i18n from "i18n";
import YoutubeHandler from "../handlers/YoutubeHandler";
import IParameter from "../interfaces/IParameter";
import IYoutubeCommand from "../interfaces/IYoutubeCommand";
import IYoutubeParameter from "../interfaces/IYoutubeParameter";

const youtube: IYoutubeCommand = {
    name: "youtube",
    aliases: ["yt", "ytb"],
    description: i18n.__("commands.youtube.description"),
    usage: "",

    cooldown: 1,
    isGuildOnly: true,
    hasArgs: false,
    minimumArgsNb: 0,
    hasParameters: true,
    parameters: new Collection<string, IParameter>([
        ["play", require("../parameters/youtube/play")],
        ["pause", require("../parameters/youtube/pause")],
        ["resume", require("../parameters/youtube/resume")],
        ["prev", require("../parameters/youtube/prev")],
        ["next", require("../parameters/youtube/next")],
        ["stop", require("../parameters/youtube/stop")],
        ["queue", require("../parameters/youtube/queue")],
        ["now", require("../parameters/youtube/now")],
    ]),
    handler: new YoutubeHandler(),

    execute(message: Message, args: string[], parameter: IYoutubeParameter): void {
        parameter.execute(message, args, this.handler);
    },
};

module.exports = youtube;
