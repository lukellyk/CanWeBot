module.exports = {
	name: 'glock',
	description: 'I GOT A GLOCK IN MY RARI!',
	execute(message, args) {
		message.channel.send({ files: ["./assets/videos/glock.mp4"] });
	},
};