module.exports = (sequelize, Sequelize) => {
    const spouse= sequelize.define("spouse", {
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
        spouse_name:{
            type:Sequelize.STRING,
            allowNull:true,
        },
        spouse_nida:{
            type:Sequelize.BIGINT,
            allowNull:false,
            unique:true
        },
        marriage_certificate:{
            type:Sequelize.STRING,
            allowNull:true,
        },
        marriage_date:{
            type:Sequelize.DATE,
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