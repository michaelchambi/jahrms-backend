module.exports = (sequelize, Sequelize) => {
	const user_attachment = sequelize.define("user_attachment", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
	employee_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
        attchment_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},	
        uid: {
			type: Sequelize.STRING,
			allowNull: false,
		}
	});

	return user_attachment;
};

