module.exports = (sequelize, Sequelize) => {
    const professional= sequelize.define("professional", {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        data_entry_personel_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
        },
       name:{
            type:Sequelize.STRING,
            allowNull:true
        },
        description:{
            type:Sequelize.STRING,
            allowNull:true
        },
        active:{
            type:Sequelize.BOOLEAN,
            allowNull: false,
        },
    
        uid:{
            type:Sequelize.STRING,
            allowNull:false,
        },
       
    });
  
    return professional;
  };