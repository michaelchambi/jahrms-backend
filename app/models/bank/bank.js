module.exports = (sequelize, Sequelize) => {
    const bank = sequelize.define("bank", {
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
            allowNull:false
        },
        bank_abbreviation:{
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
  
    return bank;
  };