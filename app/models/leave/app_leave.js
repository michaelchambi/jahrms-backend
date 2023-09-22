module.exports = (sequelize, Sequelize) => {
	const api_leave = sequelize.define("api_leave", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		uid:{
            type:Sequelize.STRING,
            allowNull:true
        },
		leave_id: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		district_id: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		coutry_id: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		region_id: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		
		start_date: {
			type: Sequelize.DATE,
			allowNull: false,
		},

		end_date: {
			type: Sequelize.DATE,
			allowNull: false,
			unique: true,
		},
		place_to_visit: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		
		goverment_year: {
			type: Sequelize.STRING,
			allowNull: true,
		},
        involve_payments: {
			type: Sequelize.STRING,
			allowNull: true,
		},
        immediet_suppervisor_comment: {
            type: Sequelize.STRING,
			allowNull: true,
        },
        approver_comment: {
            type: Sequelize.STRING,
			allowNull: true,
        },
		leave_status: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: "default"
		},
	});

	return api_leave;
};
