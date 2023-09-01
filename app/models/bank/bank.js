module.exports = (sequelize, Sequelize) => {
    const bank = sequelize.define("bank", {
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
  
    return bank;
  };