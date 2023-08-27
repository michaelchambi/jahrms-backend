module.exports = (sequelize, Sequelize) => {
	const attachment_titles = sequelize.define("attachment_titles", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		uid: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		title_name: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		title_code: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		modal_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		active: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
		},
	});

	return attachment_titles;
};
