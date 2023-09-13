module.exports = (sequelize, Sequelize) => {
    const non_judicial_work_station = sequelize.define("non_judicial_work_station", {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        district_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },

       address_number: {
            type: Sequelize.STRING,
            allowNull: false,
        },
       
        post_code: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },

        phone_number: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        road_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email_address: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: false,
        },
        display_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false,
            
        },
       
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },

        uid: {
			type: Sequelize.STRING,
			allowNull: false,
		},
        
       
    });

    return non_judicial_work_station;
};