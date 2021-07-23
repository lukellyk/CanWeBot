module.exports = {
	name: 'thonk',
	description: 'But when you think about it...',
	execute(message, args) {
		message.channel.messages.fetch(args[0])
            .then(message => message.react('867753754038894630'))
                .then(message => message.react('867753753003294741'))
                .then(message => message.react('867753751522705409'))
                .then(message => message.react('867753752777719828'))
                .then(message => message.react('867753753562316850'))
                .then(message => message.react('867753751527161876'))
                .then(message => message.react('867753377119338538'))
                .then(message => message.react('🤔'))
	},
};