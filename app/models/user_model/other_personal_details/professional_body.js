module.exports = (sequelize, Sequelize) => {
    const professional_body = sequelize.define("professional_body", {
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
        description:{
            type:Sequelize.TEXT,
            allowNull:false
        },
    
        uid:{
            type:Sequelize.STRING,
            allowNull:false,
        },
    });
  
    return professional_body;
  };