module.exports = (sequelize, Sequelize) => {
	const app_department = sequelize.define("app_department", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
        incharge_title_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		department_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
        display_name:{
			type: Sequelize.STRING,
			allowNull: false,
		},
        is_judicial:{
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

