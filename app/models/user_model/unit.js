module.exports = (sequelize, Sequelize) => {
	const unit = sequelize.define("unit", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
       
	unit_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
        display_name:{
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

	return unit;
};

