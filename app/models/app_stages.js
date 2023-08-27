module.exports = (sequelize, Sequelize) => {
	const app_stages = sequelize.define("app_stages", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		stage_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		stage_number: {
			type: Sequelize.INTEGER,
			allowNull: false,
			unique: true,
		},
		active: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
		},
	});

	return app_stages;
};


// 3.Attachment requested
// 4.Attachment submission
// 5.Decision
// 6.Withdraw
