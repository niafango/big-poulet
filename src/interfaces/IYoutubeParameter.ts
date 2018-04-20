import {Message} from "discord.js";
import YoutubeHandler from "../handlers/YoutubeHandler";
import IParameter from "./IParameter";

export default interface IYoutubeParameter extends IParameter {
    execute(message: Message, args?: string[], handler?: YoutubeHandler): void;
}
