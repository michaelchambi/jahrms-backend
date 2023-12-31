module.exports = (sequelize, Sequelize) => {
    const dependant_type = sequelize.define("dependant_type", {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        data_entry_personel_id:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
       name:{
            type:Sequelize.STRING,
            allowNull:false
        },
        description:{
            type:Sequelize.TEXT,
            allowNull:false,
            defaultValue:false

        },

      status:{
            type:Sequelize.BOOLEAN,
            allowNull:false,
        },
    
        uid:{
            type:Sequelize.STRING,
            allowNull:false,
        },
       
    });
  
    return dependant_type;
  };