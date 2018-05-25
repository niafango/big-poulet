import {Client, Message} from "discord.js";
import i18n from "i18n";
import CommandHandler from "./handlers/CommandHandler";
import SConfig from "./singletons/SConfig";

i18n.configure({
    locales: ["fr"],
    defaultLocale: "fr",
    directory: "./locales",
    objectNotation: true,
});

const token = SConfig.Instance.token;

const commandHandler = new CommandHandler();

const client = new Client();

client.on("ready", () => {
    console.log("Ready!");
    client.user.setActivity(i18n.__("watching"), { type: "WATCHING" });
});

client.on("message", (message: Message): void => {
    commandHandler.handleCommand(message);
});

client.login(token);
