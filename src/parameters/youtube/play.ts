import {Message, VoiceConnection} from "discord.js";
import ytdl = require("ytdl-core");
import YoutubeHandler from "../../handlers/YoutubeHandler";
import IYoutubeParameter from "../../interfaces/IYoutubeParameter";

const youtubePlay: IYoutubeParameter = {
    name: "play",
    description: "Ajoute un son à la queue. (En cours de développement)",
    usage: "<url>",

    hasArgs: true,
    minimumArgsNb: 1,

    execute(message: Message, args: string[], handler: YoutubeHandler): void {
        const { voiceChannel } = message.member;

        if (!voiceChannel) {
            message.reply("Comment tu veux écouter du son sans être dans un channel vocal ?!");
            return;
        }

        const url = args[0];

        try {
            const stream = ytdl(url, {filter: "audioonly"});

            voiceChannel.join().then((connection: VoiceConnection) => {
                const dispatcher = connection.playStream(stream);
                dispatcher.on("end", () => voiceChannel.leave());
            });

        } catch (error) {
            message.reply("Elle mène à rien ton URL.");
        }
    },
};

module.exports = youtubePlay;
