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
        designation_assignment_date:{
            type:Sequelize.DATE,
            allowNull:true,
            defaultValue:'2023-08-29 17:01:23.335+03'
        },
        completion_status:{
            type:Sequelize.STRING,
            allowNull:true
        }
    });
  
    return api_staff_profile;
  };