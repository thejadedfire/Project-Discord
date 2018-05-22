module.exports = {
    name: "tag",
    description: "fetches tag",
    execute(message, args) {
      const tagName = commandArgs;

      // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
      //fetch a single row of data that matches the request
      const tag = await Tags.findOne({ where: { name: tagName } });
      if (tag) {
        // equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
        tag.increment('usage_count');
        return message.channel.send(tag.get('description'));
      }
      return message.channel.send(`Could not find tag: ${tagName}`);
    },
};
