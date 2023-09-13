module.exports = (sequelize, Sequelize) => {
    const court = sequelize.define("court", {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
       address_number: {
            type: Sequelize.STRING,
            allowNull: true,
        },
       
        post_code: {
            type: Sequelize.BIGINT,
            allowNull: true,
        },

        phone_number: {
            type: Sequelize.STRING,
            allowNull: true,
        },

        road_name: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        email_address: {
            type: Sequelize.STRING,
            allowNull: true,
        },


        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        display_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false,
            
        },
        sub_sp_code: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },

        court_level_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },
        zone_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },
        district_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },
        ward_id: {
            type: Sequelize.BIGINT,
            allowNull: true,
        },
        uid: {
            type: Sequelize.STRING,
            allowNull: true,
        },
       
      
       
    });

    return court;
};