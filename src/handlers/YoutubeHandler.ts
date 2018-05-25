import {Message, StreamDispatcher, VoiceChannel, VoiceConnection} from "discord.js";
import i18n from "i18n";
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
    private _currentQueueIndex: number;

    constructor() {
        this._queue = [];
        this._currentQueueIndex = 0;
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
                message.reply(i18n.__("commands.youtube.errors.alreadyPaused"));
            }
        } else {
            message.reply(i18n.__("commands.youtube.errors.pauseNoContent"));
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
                message.reply(i18n.__("commands.youtube.errors.resumeNotPaused"));
            }
        } else {
            message.reply(i18n.__("commands.youtube.errors.resumeNoContent"));
        }
    }

    public prev(message: Message): void {
        if (!this._isInGoodVoiceChannel(message)) {
            return;
        }

        if (this._dispatcher) {
            this._dispatcher.end("prev");
        } else {
            message.reply(i18n.__("commands.youtube.errors.emptyQueue"));
        }
    }

    public next(message: Message): void {
        if (!this._isInGoodVoiceChannel(message)) {
            return;
        }

        if (this._dispatcher) {
            this._dispatcher.end("next");
        } else {
            message.reply(i18n.__("commands.youtube.errors.emptyQueue"));
        }
    }

    public stop(message: Message): void {
        if (!this._isInGoodVoiceChannel(message)) {
            return;
        }

        if (this._dispatcher) {
            this._dispatcher.end("stop");
        } else {
            message.reply(i18n.__("commands.youtube.errors.emptyQueue"));
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
            message.reply(i18n.__("commands.youtube.answers.emptyQueue"));
        }
    }

    public sendWhatsPlayingNow(message: Message): void {
        if (this._currentUrl) {
            message.channel.send(i18n.__("commands.youtube.answers.currentlyPlaying", this._currentUrl));
        } else {
            message.channel.send(i18n.__("commands.youtube.answers.nothingPlaying"));
        }
    }

    private _isInGoodVoiceChannel(message: Message): boolean {
        const { voiceChannel } = message.member;

        if (!voiceChannel) {
            message.reply(i18n.__("commands.youtube.errors.notInVoiceChannel"));
            return false;
        } else if (this._voiceChannel && voiceChannel.id !== this._voiceChannel.id) {
            message.reply(i18n.__("commands.youtube.errors.alreadyInAnotherVoiceChannel"));
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
        if (!ytdl.validateURL(url)) {
            message.reply(i18n.__("commands.youtube.errors.badUrl"));
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
            this._dispatcher.on("end", (reason: string) => this._contentEnded(reason));
            this._currentUrl = url;
        } catch (error) {
            message.reply(i18n.__("commands.youtube.errors.readError", url));
        }
    }

    private _contentEnded(reason: string): void {
        this._dispatcher = undefined;
        this._currentUrl = undefined;

        if (!reason || reason === "" || reason === "next") {
            this._currentQueueIndex++;
        } else if (reason === "prev") {
            this._currentQueueIndex = this._currentQueueIndex > 0 ? this._currentQueueIndex - 1 : 0;
        } else if (reason === "stop") {
            this._currentQueueIndex = -1;
        }

        if (this._currentQueueIndex >= 0 && this._currentQueueIndex < this._queue.length) {
            const youtubeUrl = this._queue[this._currentQueueIndex];
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
            this._voiceConnection = undefined;
            this._dispatcher = undefined;
            this._currentUrl = undefined;
            this._queue = [];
            this._currentQueueIndex = 0;
        }
    }
}
