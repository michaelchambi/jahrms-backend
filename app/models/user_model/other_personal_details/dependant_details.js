module.exports = (sequelize, Sequelize) => {
    const dependant_details = sequelize.define("dependant_details", {
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
        dependant_type_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
        },
        first_name:{
            type:Sequelize.STRING,
            allowNull:true
        },
        middle_name:{
            type:Sequelize.STRING,
            allowNull:true
        },

        last_name:{
            type:Sequelize.STRING,
            allowNull:true
        },
        birth_certificate_number:{
            type:Sequelize.STRING,
            allowNull:true
        },
        birth_date:{
            type:Sequelize.DATE,
            allowNull:true
        },

        status:{
            type:Sequelize.STRING,
            allowNull:true
        },
       
        uid:{
            type:Sequelize.STRING,
            allowNull:false,
        },
    });
  
    return dependant_details;
  };