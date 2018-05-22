module.exports = {
    name: "showtags",
    description: "lists all tags",
    execute(message, args) {
      // equivalent to: SELECT name FROM tags;
      const tagList = await Tags.findAll({ attributes: ['name'] });
      const tagString = tagList.map(t => t.name).join(', ') || 'No tags set.';
      return message.channel.send(`List of tags: ${tagString}`);
    },
};
