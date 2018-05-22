const fs = require('fs');
const Discord = require("discord.js");
const Sequelize = require('sequelize');
const { prefix, token } = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();

/////////database
//connection information (where to look for database)
const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    // SQLite only
    storage: 'db.sqlite',
});

//make a model structure for the table
const Tags = sequelize.define('tags', {
    name: {
        type: Sequelize.STRING,
        unique: true, //makes sure there are no duplicates
    },
    usage_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
});

//returns an array of all the file names in the commands file system/folder
const commandFiles = fs.readdirSync('./commands');

//loop through the array of files and add the name and actual file of each command to the client.commands Collection
for (const file of commandFiles)
{
    //set command equal to the actual file
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

//ready statement for when logged onto server
client.on("ready", () => {
  Tags.sync();
  console.log("I am ready!");
});

client.on("message", (message) => {

//if the msg doesn't have the prefix or is by a bot, don't process
  if (!message.content.startsWith(prefix) || message.author.bot) return;

//divides message into command and any arguments
  //takes messsage and splits it up and puts them into an array
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  //stores first element in array as command and removes it from array
  const commandName = args.shift().toLowerCase();
  const tagName = commandName;

//if the message doesn't provide a name of a command that exists in the Collection, don't process
  if (!client.commands.has(commandName)) return;

//variable command equals the file associated with name of the command
  const command = client.commands.get(commandName);

//if the command exists, execute it
  try
  {
    command.execute(message, args);
  }
  catch (error)
  {
    console.error(error);
    message.reply("There was an error trying to execute that command!");
  }


///////////////////////
//adds command to database
try {
  const tag = await Tags.create({
    name: tagName
  });
  return message.channel.send(`New command! ${tag.name} added.`);
}
catch (e) {
  if (e.name === 'SequelizeUniqueConstraintError') {
    tag.increment('usage_count');
  }
  return message.channel.send('Something went wrong with adding this tag.');
}

/*

//fetching a tag
if (command === 'tag') {
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
*/

});

client.login(token);
