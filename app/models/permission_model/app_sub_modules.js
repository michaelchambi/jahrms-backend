module.exports = (sequelize, Sequelize) => {
	const app_sub_modules = sequelize.define("app_sub_modules", {
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

		link: {
			type: Sequelize.STRING,
			allowNull: false,
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

	return app_sub_modules;
};
