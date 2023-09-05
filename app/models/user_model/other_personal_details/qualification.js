module.exports = (sequelize, Sequelize) => {
    const qualification = sequelize.define("qualification", {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        data_entry_personel_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
        },
        name:{
            type:Sequelize.STRING,
            allowNull:false,
        },
        qualification_description:{
            type:Sequelize.TEXT,
            allowNull:false,
        },
      
       active:{
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