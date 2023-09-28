module.exports = (sequelize, Sequelize) => {
    const education_level_grade = sequelize.define("education_level_grade", {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        data_entry_personel_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
        },
        education_level_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
        },
        name:{
            type:Sequelize.STRING,
            allowNull:false,
        },
        description:{
            type:Sequelize.TEXT,
            allowNull:false,
        },
      
       active:{
            type:Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue:true
        },
    
        uid:{
            type:Sequelize.STRING,
            allowNull:false,
        },
       
    });
  
    return education_level_grade;
  };