import {Client, Message} from "discord.js";
import CommandHandler from "./CommandHandler";
const { token } = require("../config.json");

const commandHandler = new CommandHandler();

const client = new Client();

client.on("ready", () => {
    console.log("Ready!");
});

client.on("message", (message: Message): void => {
    commandHandler.handleCommand(message);
});

client.login(token);
