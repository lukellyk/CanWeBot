module.exports = {
	name: 'funny',
	description: 'holy shit that person is so funny',
	execute(message, args) {
		message.channel.send({ files: ["./assets/images/cursed_laughing.gif"] });
	},
};