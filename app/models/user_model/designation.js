module.exports = (sequelize, Sequelize) => {
    const api_designation = sequelize.define("api_designation", {
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
        status:{
            type:Sequelize.BOOLEAN,
            allowNull: false
        }
    });
  
    return api_designation;
  };