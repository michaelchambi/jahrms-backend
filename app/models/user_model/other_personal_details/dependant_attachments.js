module.exports = (sequelize, Sequelize) => {
    const dependant_attachment= sequelize.define("dependant_attachment", {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        attachment_type_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
        },
        dependant_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
        },
        file_name:{
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
  
    return dependant_attachment;
  };