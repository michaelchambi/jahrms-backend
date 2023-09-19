module.exports = (sequelize, Sequelize) => {
    const employment_details = sequelize.define("employment_detail", {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        created_by_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
        },
        employee_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
            unique: true,
        },
        designation_id:{
            type:Sequelize.INTEGER,
            allowNull:true,
        },
        check_number:{
            type:Sequelize.BIGINT,
            allowNull:true,
            
        },
       pf_number:{
            type:Sequelize.BIGINT,
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
            type:Sequelize.STRING,
            allowNull: false,
            defaultValue:0
        },

        uid:{
            type:Sequelize.STRING,
            allowNull:false,
        },
        active:{
            type:Sequelize.BOOLEAN,
            allowNull:false,
        },
       
    });
  
    return employment_details;
  };