const dotenv = require('dotenv');
dotenv.config();

//load dagpi and token
const {Client} = require("dagpijs");
const cl = new Client(process.env.DAGPI_TOKEN)

const { MessageAttachment, MessageMentions} = require('discord.js')

module.exports = {
	name: 'bonk',
	description: 'get bonked!',
	async execute(message, args) {
        
        if (MessageMentions.USERS_PATTERN.test(args)) {
            victim = message.mentions.users.first();
        } else {
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