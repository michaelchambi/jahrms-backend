module.exports = (sequelize, Sequelize) => {
	const section = sequelize.define("section", {
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
        department_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
       
	name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
        abbreviation:{
			type: Sequelize.STRING,
			allowNull: false,
		},

		description:{
			type: Sequelize.STRING,
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

	return section;
};

