module.exports = (sequelize, Sequelize) => {
	const api_change_designation = sequelize.define("api_change_designation", {
		id: {
			type:Sequelize.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
		},
		uid:{
            type:Sequelize.STRING,
            allowNull:true
        },
		
        reason_change_designation: {
            type: Sequelize.STRING,
			allowNull: true,
        },
<<<<<<< HEAD
=======
		change_designation_reason_abbreviation:{
            type: Sequelize.STRING,
			allowNull: true,
        },
>>>>>>> michael-backend
		status: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		created_by: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
	});

	return api_change_designation;
};


