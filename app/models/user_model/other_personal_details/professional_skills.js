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
        professional_body_id:{
            type:Sequelize.INTEGER,
            allowNull:true,
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
            allowNull: false,
            defaultValue:0
        },
    
        uid:{
            type:Sequelize.STRING,
            allowNull:false,
        },
       
    });
  
    return professional_skill;
  };