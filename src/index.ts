import {Client, Message} from "discord.js";
import CommandHandler from "./CommandHandler";
const token = process.env.DISCORD_TOKEN;

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
