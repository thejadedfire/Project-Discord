module.exports = {
    name: "asl",
    description: "ASL, arguments",
    execute(message, args) {
      let age = args[0];
      let sex = args[1];
      let location = args[2];
      message.channel.send(`Hello ${message.author.username}, I see you're a ${age} year old ${sex} from ${location}.`);
    },
};
