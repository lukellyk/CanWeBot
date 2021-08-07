const edit = require("./edit");

module.exports = {
	name: 'please',
	description: 'alternate trigger for !edit',
	usage: "See !help edit",
	execute(message, args) {
		edit.execute(message, args);
	},
};