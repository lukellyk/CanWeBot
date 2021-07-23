const fs = require('fs');

const dotenv = require('dotenv');
dotenv.config();

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
const { prefix } = require('./config.json');

//log status when online
client.once('ready', () => {
    console.log('CanWeBot is online!');
    client.user.setActivity('you.', {
        type: "WATCHING"
    });
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
        console.log(`${message.author.username} ran ${prefix}${commandName}`);
    } catch (error) {
        message.reply("uh oh uwu there's been an ewwa, @lukellyk fix me pwease 🥺")
        console.log(error)
    }

});

//login using token
client.login(process.env.TOKEN);
