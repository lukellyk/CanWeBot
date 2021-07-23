module.exports = {
	name: 'palp',
	description: 'BASS! BA-',
	execute(message, args) {
		message.channel.send({ files: ["./assets/videos/palp.mp4"] });
	},
};