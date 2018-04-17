import Discord = require("discord.js");
const { prefix, token } = require("../config.json");
const client = new Discord.Client();

client.on("message", (message) => {
    if (message.content.startsWith(`${prefix}ping`)) {
        message.channel.send("Pong.");
    } else if (message.content === `${prefix}server`) {
        const answer = `Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}\n` +
            `Server creation: ${message.guild.createdAt}\nRegion: ${message.guild.region}`;
        message.channel.send(answer);
    }
});

client.login(token);
