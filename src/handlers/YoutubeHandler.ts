import {Message, StreamDispatcher, VoiceChannel, VoiceConnection} from "discord.js";
import ytdl = require("ytdl-core");

interface IYoutubeUrl {
    message: Message;
    url: string;
}

export default class YoutubeHandler {
    private _voiceChannel: VoiceChannel | undefined;
    private _voiceConnection: VoiceConnection | undefined;
    private _dispatcher: StreamDispatcher | undefined;
    private _currentUrl: string | undefined;
    private _queue: IYoutubeUrl[];

    constructor() {
        this._queue = [];
    }

    public async play(message: Message, url: string): Promise<void> {
        if (!this._isInGoodVoiceChannel(message)) {
            return;
        }

        if (!this._voiceConnection) {
            await this._joinVoiceChannel(message);
        }

        this._playOrQueueContent(message, url);
    }

    public pause(message: Message): void {
        if (!this._isInGoodVoiceChannel(message)) {
            return;
        }

        if (this._dispatcher) {
            if (!this._dispatcher.paused) {
                this._dispatcher.pause();
            } else {
                message.reply("Je suis déjà en pause couillon.");
            }
        } else {
            message.reply("Je ne suis pas entrain de jouer un contenu, tu veux que je mette quoi en pause ?");
        }
    }

    public resume(message: Message): void {
        if (!this._isInGoodVoiceChannel(message)) {
            return;
        }

        if (this._dispatcher) {
            if (this._dispatcher.paused) {
                this._dispatcher.resume();
            } else {
                message.reply("Je suis pas en pause sang de tes morts.");
            }
        } else {
            message.reply("Je ne suis pas entrain de jouer un contenu, tu veux que je mette quoi en lecture ?");
        }
    }

    public next(message: Message): void {
        if (!this._isInGoodVoiceChannel(message)) {
            return;
        }

        if (this._dispatcher) {
            this._dispatcher.end();
        } else {
            message.reply("Je n'ai aucun son en attente, tu t'attendais à quoi ?");
        }
    }

    public stop(message: Message): void {
        if (!this._isInGoodVoiceChannel(message)) {
            return;
        }

        if (this._dispatcher) {
            this._queue = [];
            this._dispatcher.end();
        } else {
            message.reply("Je n'ai aucun son en attente, tu t'attendais à quoi ?");
        }
    }

    public sendQueue(message: Message): void {
        if (this._queue.length) {
            const reply: string[] = [];
            this._queue.forEach((youtubeUrl) => {
                reply.push(`- \`${youtubeUrl.url}\``);
            });
            message.channel.send(reply);
        } else {
            message.reply("J'ai la queue vide.");
        }
    }

    public sendWhatsPlayingNow(message: Message): void {
        if (this._currentUrl) {
            message.channel.send(`Je joue actuellement ${this._currentUrl}`);
        } else {
            message.channel.send("Je joue tchi.");
        }
    }

    private _isInGoodVoiceChannel(message: Message): boolean {
        const { voiceChannel } = message.member;

        if (!voiceChannel) {
            message.reply("Comment tu veux écouter du son sans être dans un channel vocal ?!");
            return false;
        } else if (this._voiceChannel && voiceChannel.id !== this._voiceChannel.id) {
            message.reply("Je suis occupé à faire du sale dans un autre channel, rentre chez toi Roger.");
            return false;
        }

        return true;
    }

    private async _joinVoiceChannel(message: Message): Promise<void> {
        const { voiceChannel } = message.member;

        const voiceConnection = await voiceChannel.join();
        this._voiceChannel = voiceChannel;
        this._voiceConnection = voiceConnection;
    }

    private _playOrQueueContent(message: Message, url: string): void {
        if (!ytdl.validateLink(url)) {
            message.reply("Elle mène à rien ton URL.");
            return;
        }

        if (this._dispatcher && !this._dispatcher.destroyed) {
            this._queue.push({message, url});
        } else {
            this._playContent(message, url);
        }
    }

    private _playContent(message: Message, url: string): void {
        if (!this._voiceConnection) {
            return;
        }

        try {
            const stream = ytdl(url, {filter: "audioonly"});

            this._dispatcher = this._voiceConnection.playStream(stream);
            this._dispatcher.on("end", () => this._contentEnded());
            this._currentUrl = url;
        } catch (error) {
            message.reply(`Impossible de lire ${url}`);
        }
    }

    private _contentEnded(): void {
        this._currentUrl = undefined;
        if (this._queue.length) {
            const youtubeUrl = this._queue.shift();
            if (youtubeUrl) {
                this._playContent(youtubeUrl.message, youtubeUrl.url);
                return;
            }
        }
        this._leaveChannel();
    }

    private _leaveChannel(): void {
        if (this._voiceChannel) {
            this._voiceChannel.leave();
            this._voiceChannel = undefined;
            if (this._voiceConnection) {
                this._voiceConnection = undefined;
            }
            if (this._dispatcher) {
                this._dispatcher = undefined;
            }
        }
    }
}
