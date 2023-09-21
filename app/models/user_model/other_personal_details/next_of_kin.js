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
        relation_id:{
            type:Sequelize.INTEGER,
            allowNull:true,
        },
        full_name:{
            type:Sequelize.STRING,
            allowNull:true,
        },
        phone_number:{
            type:Sequelize.STRING,
            allowNull:true,
        },
        physical_address:{
            type:Sequelize.STRING,
            allowNull:true,
        },
       
        gender:{
            type:Sequelize.STRING,
            allowNull:true,
        },

    
        uid:{
            type:Sequelize.STRING,
            allowNull:false,
        },
       
    });
  
    return next_of_kin;
  };