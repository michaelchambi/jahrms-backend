module.exports = (sequelize, Sequelize) => {
    const api_cadre = sequelize.define("cadre", {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        department_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
        },
        registrar_id:{
            type:Sequelize.INTEGER,
            allowNull:true,
        },
        name:{
            type:Sequelize.STRING,
            allowNull:false
        },
        description:{
            type:Sequelize.TEXT,
            allowNull:false
        },
        status:{
            type:Sequelize.BOOLEAN,
            allowNull: false
        },
        uid: {
			type: Sequelize.STRING,
			allowNull: false,
            defaultValue:'4237e4e7-3bfb-4e4b-8e86-465274c47281'
		},
    });
  
    return api_cadre;
  };