module.exports = (sequelize, Sequelize) => {
    const api_designation = sequelize.define("api_designation", {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        cadre_id:{
            type:Sequelize.INTEGER,
            allowNull:true,unique:'compositeIndex',
        },

        registrar_id:{
            type:Sequelize.INTEGER,
            allowNull:true,
        },
        designation_order:{
            type:Sequelize.INTEGER,
            allowNull:true,unique:'compositeIndex',
        },


        name:{
            type:Sequelize.STRING,
            allowNull:false
        },
        abbreviation:{
            type:Sequelize.STRING,
            allowNull:true
        },
        description:{
            type:Sequelize.TEXT,
            allowNull:true
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
    },
    {
        uniqueKeys: 
        {
            compositeIndex: 
            {
                fields: ['cadre_id', 'designation_order']
            }
        }
  
});
  
    return api_designation;
  };