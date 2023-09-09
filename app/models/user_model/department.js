module.exports = (sequelize, Sequelize) => {
	const app_department = sequelize.define("app_department", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		data_entry_personel_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
        description:{
			type: Sequelize.STRING,
			allowNull: false,
		},
		abbreviation:{
			type: Sequelize.STRING,
			allowNull: false,
		},
        
        uid: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		active: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
		},
	});

	return app_department;
};

