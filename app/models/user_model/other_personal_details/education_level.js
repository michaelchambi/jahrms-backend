module.exports = (sequelize, Sequelize) => {
    const education_level = sequelize.define("education_level", {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
       qualification_id:{
            type:Sequelize.INTEGER,
            allowNull:true,
        },
        
        education_level_name:{
            type:Sequelize.STRING,
            allowNull:true
        },
       level_abbreviation:{
            type:Sequelize.STRING,
            allowNull:true
        },
       description:{
            type:Sequelize.TEXT,
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
  
    return education_level;
  };