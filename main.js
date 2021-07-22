const fs = require('fs');
//require discord.js module
const Discord = require('discord.js');
//create new discord client
const client = new Discord.Client();

//load commands
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

//retrieve prefix from config file
const { prefix, token } = require('./config.json');

//log status when online
client.once('ready', () => {
    console.log('CanWeBot is online!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

});

//login using token
client.login(token);
