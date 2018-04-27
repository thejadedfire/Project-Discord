module.exports = {
    name: "ping",
    description: "Returns pong for ping",
    execute(message, args) {
        message.channel.send("pong");
    },
};
