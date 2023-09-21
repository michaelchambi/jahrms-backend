module.exports = (sequelize, Sequelize) => {
    const working_station_details = sequelize.define("working_station_details", {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        station_id:{
            type:Sequelize.INTEGER,
            allowNull:true,
        },
        assignment_date:{
            type:Sequelize.DATE,
            allowNull:true
        },
        completion_status:{
            type:Sequelize.STRING,
            allowNull: false,
        },
        user_id:{
            type:Sequelize.INTEGER,
            allowNull: false
        },
        employee_id:{
            type:Sequelize.INTEGER,
            allowNull: false
        },
        uid:{
            type:Sequelize.STRING,
            allowNull:false,
        },
    },)
    return working_station_details;
  };

