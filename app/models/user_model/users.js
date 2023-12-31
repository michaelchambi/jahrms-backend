const db = require("../../models");
module.exports = (sequelize, Sequelize) => {
	const users = sequelize.define("users", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},

		uid: {
			type: Sequelize.TEXT,
			allowNull: false,
		},

		first_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		middle_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		last_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		employee_passport: {
			type: Sequelize.STRING,
			allowNull: true,
			unique: true,
		},
	
		birth_certificate: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		region_id: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		
		personal_folder: {
			type: Sequelize.STRING,
			allowNull: true,
			unique: true,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},

		phone_number: {
			type: Sequelize.INTEGER,
			allowNull: false,
			unique: true,
		},

		national_id: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},

		district_id: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		password: {
			type: Sequelize.TEXT,
			allowNull: false,
			defaultValue:'XYJfdrTY'
		},

		password_expiration_date: {
			type: Sequelize.DATEONLY,
			allowNull: false,
		},

		sex: {
			type: Sequelize.STRING,
			allowNull: true,
		},
	
		birth_date: {
			type: Sequelize.DATE,
			allowNull: true,
		},


		account_non_locked: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
		},

		credential_non_expired: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
		},

		number_of_attempt: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},

		last_attempt_at: {
			type: Sequelize.DATE,
			allowNull: true,
		},

		first_login: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
		},
		active: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
		},

		created_by: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},

		updated_by: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
	});

	return users;
};
