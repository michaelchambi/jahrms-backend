module.exports = (sequelize, Sequelize) => {
    const Workstation_history = sequelize.define("workstation_history", {
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
        workstation_id:{
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
  
    return Workstation_history;
  };