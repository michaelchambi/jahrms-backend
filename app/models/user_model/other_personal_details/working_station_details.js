module.exports = (sequelize, Sequelize) => {
    const working_station_details = sequelize.define("working_station_details", {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        station_id:{
            type:Sequelize.INTEGER,unique:'compositeIndex',
            allowNull:true,
        },
        station_assignment_date:{
            type:Sequelize.DATE,
            allowNull:true
        },
        completion_status:{
            type:Sequelize.INTEGER,
            allowNull: false,
            defaultValue:0
        },
        stasion_category:{
            type:Sequelize.STRING,unique:'compositeIndex',
            allowNull:true,
        },
        uid:{
            type:Sequelize.STRING,
            allowNull:false,
        },
    },
    {
        uniqueKeys: {
            compositeIndex: {
                fields: ['station_id', 'stasion_category']
            }
    }
})
    return working_station_details;
  };

