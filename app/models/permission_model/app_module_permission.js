module.exports = (sequelize, Sequelize) => {
	const app_module_permission = sequelize.define("app_module_permission", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		module_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		
		permission: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
		},
	});

	return app_module_permission;
};
