module.exports = (sequelize, Sequelize) => {
	const station = sequelize.define("station", {
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
        display_name:{
			type: Sequelize.STRING,
			allowNull: false,
		},
		is_court:{
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

	return station;
};

