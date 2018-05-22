//default database, user puts in tag and description to add to database

const Discord = require('discord.js');
const Sequelize = require('sequelize');

const client = new Discord.Client();
const PREFIX = '!';

//connection information (where to look for database)
const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    // SQLite only
    storage: 'database.sqlite',
});

//make a model structure for the table
const Tags = sequelize.define('tags', {
    name: {
        type: Sequelize.STRING,
        unique: true, //makes sure there are no duplicates
    },
    description: Sequelize.TEXT,
    username: Sequelize.STRING,
    usage_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
});

client.once('ready', () => {
    //create the table
    Tags.sync();
    //for testing-- recreates table every time
      //Tags.sync({ force: true })
});

client.on('message', async message => {
    if (message.content.startsWith(PREFIX)) {
        const input = message.content.slice(PREFIX.length).split(' ');
        const command = input.shift();
        const commandArgs = input.join(' ');

        //add a tag
        if (command === 'addtag') {
          const splitArgs = commandArgs.split(' ');
          const tagName = splitArgs.shift();
          const tagDescription = splitArgs.join(' ');

          try {
            // equivalent to: INSERT INTO tags (name, descrption, username) values (?, ?, ?);
            const tag = await Tags.create({
            name: tagName,
            description: tagDescription,
            username: message.author.username,
            });
            return message.channel.send(`Tag ${tag.name} added.`);
          }
          catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
              return message.channel.send('That tag already exists.');
            }
            return message.channel.send('Something went wrong with adding a tag.');
          }
        }

        //fetching a tag
        else if (command === 'tag') {
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
        }

        //edit tag/row
        else if (command === 'edittag') {
          const splitArgs = commandArgs.split(' ');
          const tagName = splitArgs.shift();
          const tagDescription = splitArgs.join(' ');

          // equivalent to: UPDATE tags (descrption) values (?) WHERE name='?';
          const affectedRows = await Tags.update({ description: tagDescription }, { where: { name: tagName } });
          if (affectedRows > 0) {
            return message.channel.send(`Tag ${tagName} was edited.`);
          }
          return message.channel.send(`Could not find a tag with name ${tagName}.`);
        }

        //display info on a specific tag
        else if (command === 'taginfo') {
          const tagName = commandArgs;

          // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
          const tag = await Tags.findOne({ where: { name: tagName } });
          if (tag) {
            return message.channel.send(`${tagName} was created by ${tag.username} at ${tag.createdAt} and has been used ${tag.usage_count} times.`);
          }
          return message.channel.send(`Could not find tag: ${tagName}`);
        }

        //list all tags
        else if (command === 'showtags') {
          // equivalent to: SELECT name FROM tags;
          const tagList = await Tags.findAll({ attributes: ['name'] });
          const tagString = tagList.map(t => t.name).join(', ') || 'No tags set.';
          return message.channel.send(`List of tags: ${tagString}`);
        }

        //delete a tag
        else if (command === 'removetag') {
          const tagName = commandArgs;
          // equivalent to: DELETE from tags WHERE name = ?;
          const rowCount = await Tags.destroy({ where: { name: tagName } });
          if (!rowCount) return message.channel.send('That tag did not exist.');

          return message.channel.send('Tag deleted.');
        }
    }
});

client.login("NDM2MjIwNjU5NjE0NDgyNDY1.DbpnpQ.pe32-JHXBb2BQOXck7KL58nUyNc");
