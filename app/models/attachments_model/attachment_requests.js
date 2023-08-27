const db = require("../../models");
const app_appeal = db.app_appeal;

module.exports = (sequelize, Sequelize) => {
	const attachment_requests = sequelize.define("attachment_requests", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},

		appeal_uid: {
			type: Sequelize.TEXT,
			allowNull: true,
		},

		complaint_uid: {
			type: Sequelize.TEXT,
			allowNull: true,
		},

		is_appeallant_true: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
		},

		title_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		title_code: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		is_submitted: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
		},
	});

	return attachment_requests;
};
