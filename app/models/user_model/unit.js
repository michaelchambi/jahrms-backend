module.exports = (sequelize, Sequelize) => {
	const unit = sequelize.define("unit", {
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

		abbreviation: {
			type: Sequelize.STRING,
			allowNull: false,
		},

        description:{
			type: Sequelize.TEXT,
			allowNull: false,
		},
        uid: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		status: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
		},
	});

	return unit;
};

