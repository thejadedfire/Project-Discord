module.exports = {
    name: "edittag",
    description: "edit tag",
    execute(message, args) {
      const splitArgs = commandArgs.split(' ');
      const tagName = splitArgs.shift();
      const tagDescription = splitArgs.join(' ');

      // equivalent to: UPDATE tags (descrption) values (?) WHERE name='?';
      const affectedRows = await Tags.update({ description: tagDescription }, { where: { name: tagName } });
      if (affectedRows > 0) {
        return message.channel.send(`Tag ${tagName} was edited.`);
      }
      return message.channel.send(`Could not find a tag with name ${tagName}.`);
    },
};
