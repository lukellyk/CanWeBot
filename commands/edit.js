const dotenv = require('dotenv');
dotenv.config();

//load dagpi and token
const {Client} = require("dagpijs");
const cl = new Client(process.env.DAGPI_TOKEN)

const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'edit',
	description: 'catch-all for dagpi edit commands',
    usage: '<bonk|petpet|5g1g|magik|slap|jail|fedora|swirl> <args>',
	async execute(message, args) {

	    const commands = {
	        BONK: "bonk",
	        PETPET: "petpet",
	        FIVEG1G: "5g1g",
	        MAGIK: "magik",
	        SLAP: "slap",
	        JAIL: "jail",
	        FEDORA: "fedora",
	        SWIRL: "swirl"
	    }

	    switch (args[0]) {
	        case commands.BONK:
	            OneUserEdit(commands.BONK, "gif");
	            break;

	        case commands.PETPET:
	            OneUserEdit(commands.PETPET, "gif");
	            break;

	        case commands.FIVEG1G:
	            TwoUserEdit(commands.FIVEG1G, "png");
	            break;

	        case commands.MAGIK:
	            OneUserEdit(commands.MAGIK, "png");
	            break;

	        case commands.SLAP:
	            TwoUserEdit(commands.SLAP, "png");
	            break;

	        case commands.JAIL:
	            OneUserEdit(commands.JAIL, "png");
	            break;

	        case commands.FEDORA:
	            OneUserEdit(commands.FEDORA, "png");
	            break;

	        case commands.SWIRL:
	            OneUserEdit(commands.SWIRL, "png");
	            break;

	        default:
	            message.reply(`I didn't recognise "${args[0]}",  available edits: ${Object.values(commands).join(", ")}`)
	            break;
	    }

	    // For edits that only need one user as input (either first mentioned user OR message author)
	    async function OneUserEdit(command, extension) {
	        if (victim = message.mentions.users.first()) {
	            // victim is mentioned user
	        } else {
	            // victim is message author
	            victim = message.author;
	        }

	        //retrieve user's avatar as PNG
	        const victimImageUrl = victim.displayAvatarURL().replace(".webp", ".png");
	        //call dagpi API
	        const img = await cl.image_process(command, {url: victimImageUrl});
	        //send gif response
	        const attachment = new MessageAttachment(img.image, `${command}.${extension}`);
	        message.channel.send(attachment);
	    }

	    // For edits that need two users as input (Either author + first mentioned user OR first two mentioned users)
	    async function TwoUserEdit(command, extension) {
            // Check amount of users mentioned
	        if (message.mentions.users.size === 1) {
	            // One user mentioned. Get mention and message author
	            perpetrator = message.mentions.users.first();
	            victim = message.author;
                // swap perp and victim
	            if (command == "slap") {
	                [perpetrator, victim] = [victim, perpetrator];
	            }
	            if (/(swap)/.test(args)) {
	                [perpetrator, victim] = [victim, perpetrator];
	            }
	        } else if (message.mentions.users.size >= 2) {
	            // Two or more users mentioned. Get first two
	            perpetrator = Array.from(message.mentions.users.values())[1];
	            victim = message.mentions.users.first();
                // swap perp and victim
	            if (/(swap)/.test(args)) {
	                [perpetrator, victim] = [victim, perpetrator];
	            }
	        } else {
	            // Invalid input
	            message.reply("You need to mention at least one user for this edit!");
	            return;
	        }

	        //retrieve avatars as PNG
	        const victimImageUrl = victim.displayAvatarURL().replace(".webp", ".png");
	        const perpImageUrl = perpetrator.displayAvatarURL().replace(".webp", ".png");
	        //call dagpi API
	        const img = await cl.image_process(command, {url: victimImageUrl, url2: perpImageUrl});
	        //send gif response
	        const attachment = new MessageAttachment(img.image, `${command}.${extension}`);
	        message.channel.send(attachment);
	    }
	},
};