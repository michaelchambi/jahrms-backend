module.exports = (sequelize, Sequelize) => {
	const section = sequelize.define("section", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},

        department_id: {
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
        uid: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		active: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
		},
	});

	return section;
};
