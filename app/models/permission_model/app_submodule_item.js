module.exports = (sequelize, Sequelize) => {
	const app_submodule_item= sequelize.define("app_submodule_item", {
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
		linkName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		active: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
		},
	});

	return app_submodule_item;
};
