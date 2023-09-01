module.exports = (sequelize, Sequelize) => {
    const app_incharges = sequelize.define("incharges", {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        name:{
            type:Sequelize.STRING,
            allowNull:false
        },
        uid:{
            type:Sequelize.STRING,
            allowNull:false
        },
        status:{
            type:Sequelize.BOOLEAN,
            allowNull: false
        }
    });
  
    return app_incharges;
  };