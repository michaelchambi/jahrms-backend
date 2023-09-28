module.exports = (sequelize, Sequelize) => {
    const personal_skill = sequelize.define("personal_skill", {
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
        skill_id:{
            type:Sequelize.INTEGER,
            allowNull:true,
        },
      
      status:{
            type:Sequelize.BOOLEAN,
            allowNull: false,
        },
    
        uid:{
            type:Sequelize.STRING,
            allowNull:false,
        },
       
    });
  
    return personal_skill;
  };