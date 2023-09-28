module.exports = (sequelize, Sequelize) => {
    const skill = sequelize.define("skill", {
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
        description:{
            type:Sequelize.TEXT,
            allowNull:false,
        },
        icon:{
            type:Sequelize.STRING,
            allowNull:false,
            defaultValue:'fa fa-grav'
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
  
    return skill;
  };