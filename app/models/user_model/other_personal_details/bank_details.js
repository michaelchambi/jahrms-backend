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
            unique:true
        },
        account_name:{
            type:Sequelize.STRING,
            allowNull:true
        },
        account_number:{
            type:Sequelize.STRING,
            allowNull:true,
            unique:true
        },
    
        card_copy:{
            type:Sequelize.STRING,
            allowNull:true
        },
       
        status:{
            type:Sequelize.STRING,
            allowNull: false,
        },
    
        uid:{
            type:Sequelize.STRING,
            allowNull:false,
        },
       
    });
  
    return bank_details;
  };