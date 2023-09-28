module.exports = (sequelize, Sequelize) => {
    const specialization = sequelize.define("academic_specialization", {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        name:{
            type:Sequelize.STRING,
            allowNull:false
        },
        description:{
            type:Sequelize.STRING,
            allowNull:false
        },
        abreviation:{
            type:Sequelize.STRING,
            allowNull:false
        },
        uid:{
            type:Sequelize.STRING,
            allowNull:false
        },
        status:{
            type:Sequelize.BOOLEAN,
            allowNull: false
        }
    });
  
    return specialization;
  };