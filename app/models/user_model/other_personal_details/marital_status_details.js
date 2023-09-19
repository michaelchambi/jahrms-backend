module.exports = (sequelize, Sequelize) => {
    const marital_status_details = sequelize.define("marital_status_details", {
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
        spouse_id:{
            type:Sequelize.INTEGER,
            allowNull:true,
        },
        status_name:{
            type:Sequelize.STRING,
            allowNull:true,
         
        },
        info_approval:{
            type:Sequelize.STRING,
            allowNull:false,
        },
        approver_id:{
            type:Sequelize.INTEGER,
            allowNull:true,
        },
       
        uid:{
            type:Sequelize.STRING,
            allowNull:false,
        },
       
    });
  
    return marital_status_details;
  };