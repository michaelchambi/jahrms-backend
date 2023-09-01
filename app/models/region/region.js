module.exports = (sequelize, Sequelize) => {
    const region = sequelize.define("region", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        zone_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            
        },
      
       
    });

    return region;
};