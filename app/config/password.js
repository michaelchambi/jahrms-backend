const randomstring = require("randomstring");

module.exports = {
	passoword() {
		return (code = randomstring.generate({
			length: 8,
			charset: "alphanumeric",
		}));
	},
};

