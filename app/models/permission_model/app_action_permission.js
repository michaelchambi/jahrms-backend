module.exports = (sequelize, Sequelize) => {
	const app_action_permission = sequelize.define("app_action_permission", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},

		permission: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
		},
	});

	return app_action_permission;
};
