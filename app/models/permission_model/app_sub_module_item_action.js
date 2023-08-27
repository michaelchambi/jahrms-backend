module.exports = (sequelize, Sequelize) => {
  const app_sub_module_item_action = sequelize.define(
    "app_sub_module_item_action",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      module_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      sub_module_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      sub_module_item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      uid: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    }
  );

  return app_sub_module_item_action;
};
