module.exports = (sequelize, Sequelize) => {
    const next_of_kin = sequelize.define("next_of_kin", {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        employee_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
        },
        first_name:{
            type:Sequelize.STRING,
            allowNull:true,
        },
        middle_name:{
            type:Sequelize.STRING,
            allowNull:true,
        },
        last_name:{
            type:Sequelize.STRING,
            allowNull:true,
        },
       email:{
            type:Sequelize.STRING,
            allowNull:true,
        },
        phone_name:{
            type:Sequelize.STRING,
            allowNull:true,
        },
        gender:{
            type:Sequelize.STRING,
            allowNull:true,
        },

        relation_ship:{
            type:Sequelize.STRING,
            allowNull:true,
        },
      
        completion_status:{
            type:Sequelize.INTEGER,
            allowNull: false,
            defaultValue:0
        },
    
        uid:{
            type:Sequelize.STRING,
            allowNull:false,
        },
       
    });
  
    return next_of_kin;
  };