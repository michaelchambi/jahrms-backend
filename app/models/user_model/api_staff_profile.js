module.exports = (sequelize, Sequelize) => {
    const api_staff_profile = sequelize.define("api_staff_profile", {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        employee_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
            unique:true,
        },
        registrar_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
        },
        court_id:{
            type:Sequelize.STRING,
            allowNull:true
        },
        completion_status:{
            type:Sequelize.STRING,
            allowNull:true
        }
    });
  
    return api_staff_profile;
  };