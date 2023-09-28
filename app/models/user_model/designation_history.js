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
        staff_profile_id:{
            type:Sequelize.BIGINT,
            allowNull:false,
        },
        assignment_date:{
            type:Sequelize.DATE,
            allowNull:true,
        },
        designation_end_date:{
            type:Sequelize.DATE,
            allowNull:true
        },
        designation_comment:{
            type:Sequelize.TEXT,
            allowNull:true
        },
<<<<<<< HEAD
=======
        designation_status:{
            type:Sequelize.STRING,
            allowNull:false
        },
>>>>>>> michael-backend
        status:{
            type:Sequelize.STRING,
            allowNull:false
        },
        
        uid: {
			type: Sequelize.STRING,
			allowNull: false,
		},
    });
  
    return designation_history;
  };