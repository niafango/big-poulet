import {Message} from "discord.js";

module.exports = {
    name: "args-info",
    description: "Args-info!",
    execute(message: Message, args: string[]) {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        } else if (args[0] === "foo") {
            return message.channel.send("bar");
        }

        message.channel.send(`First argument: ${args[0]}`);
    },
};
