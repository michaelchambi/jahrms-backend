module.exports = (sequelize, Sequelize) => {
    const court_level = sequelize.define("court_level", {
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
      
       
    });

    return court_level;
};