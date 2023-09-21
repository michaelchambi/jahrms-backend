module.exports = (sequelize, Sequelize) => {
    const designation_history = sequelize.define("designation_history", {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        registrar_id:{
            type:Sequelize.BIGINT,
            allowNull:false,
        },
        designation_id:{
            type:Sequelize.BIGINT,
            allowNull:false,
        },
        employee_id:{
            type:Sequelize.BIGINT,
            allowNull:false,
        },
        assignment_date:{
            type:Sequelize.DATE,
            allowNull:true,
        },
        status:{
            type:Sequelize.STRING,
            allowNull:true
        },
        
        uid: {
			type: Sequelize.STRING,
			allowNull: false,
		},
    });
  
    return designation_history;
  };