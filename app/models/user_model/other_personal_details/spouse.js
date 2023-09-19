module.exports = (sequelize, Sequelize) => {
    const spouse= sequelize.define("spouse", {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        user_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
        },
        employee_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
        },
        spouse_name:{
            type:Sequelize.STRING,
            allowNull:true,
        },
        spouse_status:{
            type:Sequelize.BOOLEAN,
            allowNull:true,
        },
       
        uid:{
            type:Sequelize.STRING,
            allowNull:false,
        },
       
    });
  
    return spouse;
  };