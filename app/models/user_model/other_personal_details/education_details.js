module.exports = (sequelize, Sequelize) => {
    const education_details = sequelize.define("education_detail", {
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
        },
        education_level_id:{
            type:Sequelize.INTEGER,
            allowNull:true,
        },
        index_number:{
            type:Sequelize.STRING,
            allowNull:true
        },
       specialization_id:{
            type:Sequelize.INTEGER,
            allowNull:true
        },
        institution_id:{
            type:Sequelize.INTEGER,
            allowNull:true
        },
        start_date:{
            type:Sequelize.DATE,
            allowNull:true
        },
        end_date:{
            type:Sequelize.DATE,
            allowNull:true
        },

       certificate_attachment:{
            type:Sequelize.STRING,
            allowNull:true
        },
        transcript_attachment:{
            type:Sequelize.STRING,
            allowNull:true
        },
        result:{
            type:Sequelize.STRING,
            allowNull:true
        },
        status:{
            type:Sequelize.BOOLEAN,
            allowNull: true,
        },
    
        uid:{
            type:Sequelize.STRING,
            allowNull:false,
        },
       
    });
  
    return education_details;
  };