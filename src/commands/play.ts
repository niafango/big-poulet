import {Message, VoiceConnection} from "discord.js";
import ytdl = require("ytdl-core");
import ICommand from "../ICommand";

const play: ICommand = {
    name: "play",
    aliases: ["joue", "yt", "youtube"],
    description: "Joue le son d'url youtube dans la channel vocal courant.",
    usage: "<url>",

    cooldown: 1,
    isGuildOnly: true,
    hasArgs: true,
    minimumArgsNb: 1,

    execute(message: Message, args: string[]): void {
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

module.exports = play;
