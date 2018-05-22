module.exports = {
    name: "removetag",
    description: "deletes a tag",
    execute(message, args) {
    const tagName = commandArgs;
    // equivalent to: DELETE from tags WHERE name = ?;
    const rowCount = await Tags.destroy({ where: { name: tagName } });
    if (!rowCount) return message.channel.send('That tag did not exist.');

    return message.channel.send('Tag deleted.');
    },
};
