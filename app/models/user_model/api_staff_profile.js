module.exports = (sequelize, Sequelize) => {
    const api_staff_profile = sequelize.define("api_staff_profile", {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        court_id:{
            type:Sequelize.STRING,
            allowNull:false
        }
    });
  
    return api_staff_profile;
  };