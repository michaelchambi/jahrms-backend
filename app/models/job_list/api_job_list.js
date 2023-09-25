module.exports = (sequelize, Sequelize) => {
    const api_job_list = sequelize.define("api_job_list", {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        uid:{
            type:Sequelize.STRING,
            allowNull:true
        },
        job_list_type: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: false,
        },
        current_Number: {
            type: Sequelize.BIGINT,
            allowNull: true,
        },
        minimum_number: {
            type: Sequelize.BIGINT,
            allowNull: false,
            
        },
        maximum_number: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },
        return_comment: {
            type: Sequelize.TEXT,
            allowNull:true,
        },
        directorate_return_comment: {
            type: Sequelize.TEXT,
            allowNull:true,
        },
        status: {
            type: Sequelize.TEXT,
            allowNull: false,
            defaultValue: "default"
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        created_date: {
			type: Sequelize.DATEONLY,
			allowNull: true,
			defaultValue: Sequelize.NOW
		},
        created_by: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },
    });

    return api_job_list;
};
