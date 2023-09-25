module.exports = (sequelize, Sequelize) => {
    const areas = sequelize.define("areas", {
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
        completed_by_id:{
            type:Sequelize.INTEGER,
            allowNull:true,
        },
        expected_amount:{
            type:Sequelize.STRING,
            allowNull:false
        },
        actual_amount:{
            type:Sequelize.STRING,
            allowNull:true
        },
        description:{
            type:Sequelize.TEXT,
            allowNull:false
        },
        areas_attachment:{
            type:Sequelize.STRING,
            allowNull: false
        },
        status:{
            type:Sequelize.STRING,
            allowNull: false
        },
        uid:{
            type:Sequelize.STRING,
            allowNull:false
        },
       
    });
  
    return areas;
  };