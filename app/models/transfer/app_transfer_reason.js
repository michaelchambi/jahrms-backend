module.exports = (sequelize, Sequelize) => {
	const app_transfer_reason = sequelize.define("app_transfer_reason", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		uid:{
            type:Sequelize.STRING,
            allowNull:true
        },
		description: {
			type: Sequelize.TEXT,
			allowNull: true,
		},
		created_by: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		status: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: true
		},
	});

	return app_transfer_reason;
};
