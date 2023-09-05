module.exports = (sequelize, Sequelize) => {
	const scope = sequelize.define("scope", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
       
	name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
        scope_description:{
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

	return scope;
};