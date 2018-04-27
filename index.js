const fs = require('fs');
const Discord = require("discord.js");
const { prefix, token } = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();

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

});

client.login(token);
