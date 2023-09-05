module.exports = (sequelize, Sequelize) => {
    const leave_type = sequelize.define("leave_type", {
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
        leave_description:{
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
  
    return leave_type;
  };