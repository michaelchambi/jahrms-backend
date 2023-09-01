module.exports = (sequelize, Sequelize) => {
    const non_judicial_work_station = sequelize.define("non_judicial_work_station", {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        district_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },

        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: false,
        },
        display_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false,
            
        },
       
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },

        uid: {
			type: Sequelize.STRING,
			allowNull: false,
		},
        
       
    });

    return non_judicial_work_station;
};