const dotenv = require('dotenv');
dotenv.config();

//load dagpi and token
const {Client} = require("dagpijs");
const cl = new Client(process.env.DAGPI_TOKEN)

const { MessageAttachment } = require('discord.js')

module.exports = {
	name: 'bonk',
	description: 'get bonked!',
	async execute(message, args) {
        //retrieve user's avatar as PNG
        const url = message.author.displayAvatarURL().replace(".webp",".png");
        //call dagpi API
        const img = await cl.image_process("bonk", {url : url});
        //send gif response
        const attachment = new MessageAttachment(img.image, "bonk.gif");
        message.channel.send(attachment);
    },
};