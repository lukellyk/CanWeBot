module.exports = {
	name: 'fart',
	description: 'uh oh stinky!',
	execute(message, args) {
        // Checking if the message author is in a voice channel.
        if (!message.member.voice.channel) return message.reply("You must be in a voice channel.");
        // Checking if the bot is in a voice channel.
        if (message.guild.me.voice.channel) return message.reply("I'm already playing.");
    
        // Joining the channel and creating a VoiceConnection.
        message.member.voice.channel.join().then(VoiceConnection => {
            // Playing the music, and, on finish, disconnecting the bot.
            VoiceConnection.play("./assets/audio/fart.mp3").on("finish", () => VoiceConnection.disconnect());
            message.reply("Playing...");
        }).catch(e => console.log(e))
    },
};