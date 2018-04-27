module.exports = {
    name: "server",
    description: "Returns server name",
    execute(message, args) {
        message.channel.send(`Hello, ${message.guild.name}`);
    },
};
