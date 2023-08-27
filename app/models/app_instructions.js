module.exports = (sequelize, Sequelize) => {
	const app_instructions = sequelize.define("app_instructions", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},

		instruction: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
	});

	return app_instructions;
};
