module.exports = (sequelize, Sequelize) => {
	const app_sub_module_item = sequelize.define("app_sub_module_item", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
        submodule_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
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

		link: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		arrangement_order: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue:20
		},

		active: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
		},
	});

	return app_sub_module_item;
};
