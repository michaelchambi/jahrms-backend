module.exports = (sequelize, Sequelize) => {
    const professional_skill = sequelize.define("professional_skill", {
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
        professional_id:{
            type:Sequelize.INTEGER,
            allowNull:true,
        },
       
    
        completion_date:{
            type:Sequelize.DATE,
            allowNull:true
        },

       certificate_attachment:{
            type:Sequelize.STRING,
            allowNull:true
        },
        status:{
            type:Sequelize.BOOLEAN,
            allowNull:false
        },
        uid:{
            type:Sequelize.STRING,
            allowNull:false,
        },
       
    });
  
    return professional_skill;
  };