import Discord = require("discord.js");
import fs = require("fs");
const { prefix, token } = require("./config.json");

const client = new Discord.Client();
const commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands");

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.set(command.name, command);
}

client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    const args: string[] = message.content.slice(prefix.length).split(/ +/);
    const firstArg = args.shift();

    if (!firstArg) {
        return;
    }

    const commandName = firstArg.toLowerCase();

    if (!commands.has(commandName)) {
        return;
    }
    const command = commands.get(commandName);

    if (!command) {
        return;
    }

    try {
        command.execute(message, args);
    } catch (error) {
        message.reply("There was an error trying to execute that command!");
    }
});

client.login(token);
