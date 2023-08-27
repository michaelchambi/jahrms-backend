module.exports = (sequelize, Sequelize) => {
	const app_sub_module_action = sequelize.define("app_sub_module_action", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		uid: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},

		active: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
		},
	});

	return app_sub_module_action;
};
