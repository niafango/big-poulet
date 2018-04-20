import YoutubeHandler from "../handlers/YoutubeHandler";
import ICommand from "./ICommand";

export default interface IYoutubeCommand extends ICommand {
    handler: YoutubeHandler;
}
