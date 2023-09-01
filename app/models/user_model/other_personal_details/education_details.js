module.exports = (sequelize, Sequelize) => {
    const education_details = sequelize.define("education_detail", {
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
        education_level_id:{
            type:Sequelize.INTEGER,
            allowNull:true,
        },
        index_number:{
            type:Sequelize.STRING,
            allowNull:true
        },
       specialization:{
            type:Sequelize.STRING,
            allowNull:true
        },
        institution_name:{
            type:Sequelize.STRING,
            allowNull:true
        },
        start_date:{
            type:Sequelize.DATE,
            allowNull:true
        },

       certificate_attachment:{
            type:Sequelize.DATE,
            allowNull:true
        },
        completion_status:{
            type:Sequelize.INTEGER,
            allowNull: true,
            defaultValue:0
        },
    
        uid:{
            type:Sequelize.STRING,
            allowNull:false,
        },
       
    });
  
    return education_details;
  };