module.exports = (sequelize, Sequelize) => {
	const announcement= sequelize.define("announcement", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		announcement_description: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		announcement_image: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},

        content_approver: {
			type: Sequelize.INTEGER,
			allowNull: true,
			
		},
        content_provider: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
        announcement_folder:{
            type: Sequelize.STRING,
            allowNull:false},

		active: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
		},
        uid: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
	});

	return announcement;
};


