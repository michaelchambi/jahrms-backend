module.exports = (sequelize, Sequelize) => {
	const api_transfer = sequelize.define("api_transfer", {
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
		transfer_type: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
        court_id:{
            type:Sequelize.INTEGER,
            allowNull:true
        },
        transfer_attachment:{
            type: Sequelize.STRING,
			allowNull: true,
			unique: true,
        },
		transfer_folder:{
			type: Sequelize.STRING,
			allowNull:true
		},
		tranfer_date: {
			type: Sequelize.DATEONLY,
			allowNull: true,
			defaultValue: Sequelize.NOW
		},
        involve_payments: {
			type: Sequelize.STRING,
			allowNull: true,
		},
        transfer_immediet_suppervisor_comment: {
            type: Sequelize.STRING,
			allowNull: true,
        },
        transfer_approver_comment: {
            type: Sequelize.STRING,
			allowNull: true,
        },
		transfer_status: {
			type: Sequelize.TEXT,
			allowNull: false,
			defaultValue: 'transfer_default',
		},
	});

	return api_transfer;
};


