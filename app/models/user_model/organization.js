module.exports = (sequelize, Sequelize) => {
	const organization = sequelize.define("organization", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		code: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		address: {
			type: Sequelize.TEXT,
			allowNull: true,
		},
		sector_code: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		sector_name: {
			type: Sequelize.STRING,
			allowNull: true,
		},
	});

	return organization;
};
