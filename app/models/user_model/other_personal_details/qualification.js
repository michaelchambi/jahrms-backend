module.exports = (sequelize, Sequelize) => {
    const qualification = sequelize.define("qualification", {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        qualification_name:{
            type:Sequelize.STRING,
            allowNull:false,
        },
        qualification_description:{
            type:Sequelize.TEXT,
            allowNull:false,
        },
      
       status:{
            type:Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue:true
        },
    
        uid:{
            type:Sequelize.STRING,
            allowNull:false,
        },
       
    });
  
    return qualification;
  };