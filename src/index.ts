import {Client, Message} from "discord.js";
import CommandHandler from "./handlers/CommandHandler";
import SConfig from "./singletons/SConfig";

const token = SConfig.Instance.token;

const commandHandler = new CommandHandler();

const client = new Client();

client.on("ready", () => {
    console.log("Ready!");
    client.user.setActivity("Vos faits et gestes", { type: "WATCHING" });
});

client.on("message", (message: Message): void => {
    commandHandler.handleCommand(message);
});

client.login(token);
