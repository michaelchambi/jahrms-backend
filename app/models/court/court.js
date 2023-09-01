module.exports = (sequelize, Sequelize) => {
    const court = sequelize.define("court", {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
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
      
       
    });

    return court;
};