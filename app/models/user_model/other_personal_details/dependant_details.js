module.exports = (sequelize, Sequelize) => {
    const dependant_details = sequelize.define("dependant_details", {
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
        name:{
            type:Sequelize.STRING,
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
  
    return dependant_details;
  };