module.exports = (sequelize, Sequelize) => {
    const employment_details = sequelize.define("employment_detail", {
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
        check_number:{
            type:Sequelize.INTEGER,
            allowNull:true
        },
       pf_number:{
            type:Sequelize.INTEGER,
            allowNull:true
        },
        confirmation_date:{
            type:Sequelize.DATE,
            allowNull:true
        },

        hired_date:{
            type:Sequelize.DATE,
            allowNull:true
        },
        hiring_latter:{
            type:Sequelize.STRING,
            allowNull:true
        },
        confirmation_date:{
            type:Sequelize.DATE,
            allowNull:true
        },
        confirmation_latter:{
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
  
    return employment_details;
  };