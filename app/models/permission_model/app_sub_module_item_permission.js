module.exports = (sequelize, Sequelize) => {
	const app_sub_module_item_permission = sequelize.define("app_sub_module_item_permission", {
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

	return app_sub_module_item_permission;
};
