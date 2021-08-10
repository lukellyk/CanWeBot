const edit = require("./edit");

module.exports = {
	name: 'please',
	description: 'Alternate trigger for !edit',
	usage: "<bonk|petpet|5g1g|magik|slap|jail|fedora|swirl> <args>",
	execute(message, args) {
		edit.execute(message, args);
	},
};