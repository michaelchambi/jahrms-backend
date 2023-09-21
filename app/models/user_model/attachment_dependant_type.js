module.exports = (sequelize, Sequelize) => {
	const attachment_dependant_type = sequelize.define("attachment_dependant_type");

	return attachment_dependant_type;
};
