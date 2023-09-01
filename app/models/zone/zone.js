module.exports = (sequelize, Sequelize) => {
    const zone = sequelize.define("zone", {
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
        location_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
     
      
       
    });

    return zone;
};