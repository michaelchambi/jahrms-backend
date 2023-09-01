module.exports = (sequelize, Sequelize) => {
    const village = sequelize.define("village", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        name: {
            type: Sequelize.STRING,
            allowNull: false,
           
        },
        region_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            
        },

        district_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            
        },
        municipal_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            
        },
        ward_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            
        }


    });

    return village;
};