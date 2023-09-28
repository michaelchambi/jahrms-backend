module.exports = (sequelize, Sequelize) => {
    const institution = sequelize.define("academic_institution", {
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
  
    return institution;
  };