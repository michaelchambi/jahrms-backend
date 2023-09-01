module.exports = (sequelize, Sequelize) => {
    const qualification_grade = sequelize.define("qualification_grade", {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        qualification_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
        },
        grade_name:{
            type:Sequelize.STRING,
            allowNull:false,
        },
        grade_description:{
            type:Sequelize.TEXT,
            allowNull:false,
        },
      
       status:{
            type:Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue:true
        },
    
        uid:{
            type:Sequelize.STRING,
            allowNull:false,
        },
       
    });
  
    return qualification_grade;
  };