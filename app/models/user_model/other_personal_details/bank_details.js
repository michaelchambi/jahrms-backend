module.exports = (sequelize, Sequelize) => {
    const bank_details = sequelize.define("bank_details", {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
       bank_id:{
            type:Sequelize.INTEGER,
            allowNull:true,
        },
        employee_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
        },
        account_name:{
            type:Sequelize.STRING,
            allowNull:true
        },
        account_number:{
            type:Sequelize.STRING,
            allowNull:true
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
  
    return bank_details;
  };