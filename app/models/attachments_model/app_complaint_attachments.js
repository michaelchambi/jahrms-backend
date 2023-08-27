module.exports = (sequelize, Sequelize) => {
	const app_complaint_attachments = sequelize.define("app_complaint_attachments", {
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

		deleted: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
		},

		complaint_uid: {
			type: Sequelize.TEXT,
			allowNull: true,
		},

		is_complainant_true: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
		},

		display_name: {
			type: Sequelize.TEXT,
			allowNull: false,
		},

		attachment_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		attachment_code: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		attachment_path: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		is_submitted: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
		},

		active: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
		},
	});

	return app_complaint_attachments;
};
