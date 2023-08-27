module.exports = (sequelize, Sequelize) => {
	const app_modules = sequelize.define("app_modules", {
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
		display_option: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue:'sidebar-654'
		},

		icon: {
			type: Sequelize.STRING,
			allowNull: false,
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

	return app_modules;
};
