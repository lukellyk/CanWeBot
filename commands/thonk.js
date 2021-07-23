module.exports = {
	name: 'thonk',
	description: 'But when you think about it...',
	execute(message, args) {
        
        message.channel.messages.fetch(args[0])
            .then(async message => {
                try {
                    await message.react('🤔');
                    await message.react('867753753003294741');
                    await message.react('867753751522705409');
                    await message.react('867753752777719828');
                    await message.react('867753753562316850');
                    await message.react('867753751527161876');
                    await message.react('867753377119338538');
                    await message.react('867753754038894630');
                } catch (error) {
                    console.error('One of the emojis failed to react:', error);
                }
            })

	}
};