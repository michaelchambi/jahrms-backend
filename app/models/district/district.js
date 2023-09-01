module.exports = (sequelize, Sequelize) => {
    const district = sequelize.define("district", {
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
           
        },
        region_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            
        },
      
       
    });

    return district;
};