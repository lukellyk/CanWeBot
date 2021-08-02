const dotenv = require('dotenv');
dotenv.config();

//load dagpi and token
const {Client} = require("dagpijs");
const cl = new Client(process.env.DAGPI_TOKEN)

const { MessageAttachment} = require('discord.js')

module.exports = {
	name: 'bonk',
	description: 'get bonked!',
    usage: '[@user]',
	async execute(message) {
        
        if (victim = message.mentions.users.first()) {
            // mentioned user WILL be the victim of a bonk
        } else {
            // the message author will be bonked
            victim = message.author;
        }
        
        //retrieve user's avatar as PNG
        const url = victim.displayAvatarURL().replace(".webp",".png");
        //call dagpi API
        const img = await cl.image_process("bonk", {url : url});
        //send gif response
        const attachment = new MessageAttachment(img.image, "bonk.gif");
        message.channel.send(attachment);
    },
};