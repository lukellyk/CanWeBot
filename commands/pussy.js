module.exports = {
	name: 'pussy',
	description: 'pussy',
	execute(message, args) {
		message.channel.send({ files: ["./assets/videos/pussy.mp4"] });
	},
};