const Discord = require('discord.js');

const client = new Discord.Client();

const dotenv = require('dotenv');
dotenv.config();

const prefix = '!'

client.once('ready', () => {
    console.log('CanWeBot is online!');
});

client.on('message', message => {
    if(message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping'){
        message.channel.send('Pong!')
    }
});






client.login(process.env.TOKEN);
