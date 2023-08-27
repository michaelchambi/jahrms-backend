require("dotenv").config({
	path: "./app/.env",
});
const { toInteger } = require("lodash");
const Sequelize = require("sequelize");
const db = {};

const sequelize = new Sequelize(process.env.DB, "postgres", process.env.PASSWORD, {
	host: process.env.HOST,
	port: process.env.DBPORT,
	dialect: process.env.dialect,

	pool: {
		max: toInteger(process.env.pool_max),
		min: toInteger(process.env.pool_min),
		acquire: toInteger(process.env.pool_acquire),
		idle: toInteger(process.env.pool_idle),
	},
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// =============================================================================
// PERMISSIONS DATABASE TABLE CREATION
// =============================================================================
db.app_modules = require("./permission_model/app_modules")(sequelize, Sequelize);
db.app_sub_modules = require("./permission_model/app_sub_modules")(sequelize, Sequelize);
db.app_sub_module_action = require("./permission_model/app_sub_module_action")(sequelize, Sequelize);
db.app_module_permission = require("./permission_model/app_module_permission")(sequelize, Sequelize);
db.app_sub_module_permission = require("./permission_model/app_sub_module_permission")(sequelize, Sequelize);
db.app_sub_module_item_permission = require("./permission_model/app_sub_module_item_permission")(sequelize, Sequelize);
db.app_action_permission = require("./permission_model/app_action_permission")(sequelize, Sequelize);
db.app_submodule_item=require("./permission_model/app_submodule_item")(sequelize, Sequelize);
db.app_sub_module_item_action = require("./permission_model/app_sub_module_item_action")(sequelize, Sequelize);

// =============================================================================
// SYSTEM DATABASE TABLE CREATION
// =============================================================================
db.set_employee = require("./set_employee")(sequelize, Sequelize);
db.api_designation = require("./user_model/designation")(sequelize, Sequelize);
db.api_staff_profile = require("./user_model/api_staff_profile")(sequelize, Sequelize);
db.api_users = require("./user_model/api_users")(sequelize, Sequelize);
db.app_instructions = require("./app_instructions")(sequelize, Sequelize);
db.users = require("./user_model/users")(sequelize, Sequelize);
db.roles = require("./user_model/roles")(sequelize, Sequelize);
db.role_user = require("./user_model/role_user")(sequelize, Sequelize);
db.app_stages = require("./app_stages")(sequelize, Sequelize);
db.organization = require("./user_model/organization")(sequelize, Sequelize);

// =============================================================================
// ATTACHMENTS DATABASE TABLE CREATION
// =============================================================================
db.attachment_titles = require("./attachments_model/attachment_titles")(sequelize, Sequelize);
db.attachment_requests = require("./attachments_model/attachment_requests")(sequelize, Sequelize);

// =============================================================================
// ANNOUNCEMENT DATABASE TABLE CREATION
// =============================================================================
db.announcement = require("./announcement/announcement")(sequelize, Sequelize);


//====================================================
// SYSTEM PERMISSIONS
//====================================================
//====================================================
// START OF MODULE/MODULE_PERMISSION/ROLE RELATION
//====================================================
db.app_modules.hasMany(db.app_module_permission, {
	foreignKey: "module_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.app_module_permission.belongsTo(db.app_modules, {
	through: db.app_modules,
	foreignKey: "module_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.roles.hasMany(db.app_module_permission, {
	foreignKey: "role_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.app_module_permission.belongsTo(db.roles, {
	through: db.roles,
	foreignKey: "role_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});
//====================================================
// END OF MODULE/MODULE_PERMISSION/ROLE RELATION
//====================================================

  //================================================================//
 // START OF MODULE/SUB_MODULE/SUB_MODULE_PERMISSION/ROLE RELATION //
//================================================================//
db.app_modules.hasMany(db.app_sub_modules, {
	foreignKey: "module_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.app_sub_modules.belongsTo(db.app_modules, {
	through: db.app_modules,
	foreignKey: "module_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});


db.app_sub_modules.hasMany(db.app_sub_module_permission, {
	foreignKey: "sub_module_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.app_sub_module_permission.belongsTo(db.app_sub_modules, {
	through: db.app_sub_modules,
	foreignKey: "sub_module_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});


db.app_modules.hasMany(db.app_sub_module_action, {
	foreignKey: "module_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.app_sub_module_action.belongsTo(db.app_modules, {
	through: db.app_modules,
	foreignKey: "module_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.app_sub_modules.hasMany(db.app_sub_module_action, {
	foreignKey: "sub_module_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.app_sub_module_action.belongsTo(db.app_sub_modules, {
	through: db.app_sub_modules,
	foreignKey: "sub_module_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});
db.app_sub_module_action.hasMany(db.app_action_permission, {
	foreignKey: "action_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.app_action_permission.belongsTo(db.app_sub_module_action, {
	through: db.app_sub_module_action,
	foreignKey: "action_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});


db.roles.hasMany(db.app_sub_module_permission, {
	foreignKey: "role_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.app_sub_module_permission.belongsTo(db.roles, {
	through: db.roles,
	foreignKey: "role_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.roles.hasMany(db.app_action_permission, {
	foreignKey: "role_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.app_action_permission.belongsTo(db.roles, {
	through: db.roles,
	foreignKey: "role_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});



  //===============================================================================//
 // END OF MODULE/SUB_MODULE/SUB_MODULE_PERMISSION/ROLE/SUBMODULE_ACTION RELATION //
//===============================================================================//


  //===============================================================================//
 // START OF MODULE/ SUBMODULE_ITEM/SUB_MODULE/SUB_MODULE_PERMISSION/ROLE/SUBMODULE_ACTION RELATION //
//===============================================================================//
	db.app_modules.hasMany(db.app_submodule_item, {
		foreignKey: "module_id",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});

	db.app_submodule_item.belongsTo(db.app_modules, {
		through:db.app_modules,
		foreignKey: "module_id",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});

	db.app_submodule_item.hasMany(db.app_sub_module_item_permission, {
		foreignKey: "sub_module_item_id",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});
	
	db.app_sub_module_item_permission.belongsTo(db.app_submodule_item, {
		through: db.app_submodule_item,
		foreignKey: "sub_module_item_id",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});

	db.app_modules.hasMany(db.app_sub_module_item_action, {
		foreignKey: "module_id",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});
	
	db.app_sub_module_item_action.belongsTo(db.app_modules, {
		through: db.app_modules,
		foreignKey: "module_id",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});

	db.app_sub_modules.hasMany(db.app_sub_module_item_action, {
		foreignKey: "sub_module_id",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});
	
	db.app_sub_module_item_action.belongsTo(db.app_sub_modules, {
		through: db.app_sub_modules,
		foreignKey: "sub_module_id",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});


	db.app_submodule_item.hasMany(db.app_sub_module_item_action, {
		foreignKey: "sub_module_item_id",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});
	
	db.app_sub_module_item_action.belongsTo(db.app_submodule_item, {
		through: db.app_submodule_item,
		foreignKey: "sub_module_item_id",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});

  //===============================================================================//
 // END OF MODULE/SUB_MODULE_ITEM/SUB_MODULE/SUB_MODULE_PERMISSION/ROLE/SUBMODULE_ACTION RELATION //
//===============================================================================//

db.users.hasMany(db.role_user, {
	foreignKey: "userId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});


db.role_user.belongsTo(db.users, {
	through: db.users,
	foreignKey: "userId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.app_sub_modules.hasMany(db.app_submodule_item, {
	foreignKey: "submodule_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.app_submodule_item.belongsTo(db.app_sub_modules, {
	through:db.app_sub_modules,
	foreignKey: "submodule_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});





db.users.hasMany(db.announcement, {
	foreignKey: "content_provider",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
	as:"my_announcement"
});

db.announcement.belongsTo(db.users, {
	foreignKey: "content_provider",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
	as:"provider"
});

db.users.hasMany(db.announcement, {
	foreignKey: "content_approver",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
	as:"your_announcement"
});

db.announcement.belongsTo(db.users, {
	foreignKey: "content_approver",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
	as:"approver"
});



db.roles.hasMany(db.role_user, {
	foreignKey: "role_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.role_user.belongsTo(db.roles, {
	through: db.roles,
	foreignKey: "role_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});




















db.roles.hasMany(db.app_sub_module_item_permission, {
	foreignKey: "role_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.app_sub_module_item_permission.belongsTo(db.roles, {
	foreignKey: "role_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});





db.app_sub_module_item_action.hasMany(db.app_action_permission, {
	foreignKey: "action_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.app_action_permission.belongsTo(db.app_sub_module_item_action, {
	through: db.app_sub_module_item_action,
	foreignKey: "action_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.users.hasMany(db.api_users, {
	foreignKey: "created_by",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.api_users.belongsTo(db.users, {
	through: db.users,
	foreignKey: "created_by",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.users.hasOne(db.api_staff_profile, {
    foreignKey:"userId",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

db.api_staff_profile.belongsTo(db.users,{
    through:db.users,
    foreignKey:"userId",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});


db.api_designation.hasMany(db.api_staff_profile, {
  foreignKey:"designationId",
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

db.api_staff_profile.belongsTo(db.api_designation,{
  through:db.api_designation,
  foreignKey:"designationId",
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});


db.api_designation.hasMany(db.api_staff_profile, {
	foreignKey:"designationId",
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE'
  });
  
  db.api_staff_profile.belongsTo(db.api_designation,{
	through:db.api_designation,
	foreignKey:"designationId",
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE'
  });

  db.users.hasOne(db.api_staff_profile, {
    foreignKey:"userId",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

db.api_staff_profile.belongsTo(db.users,{
    through:db.users,
    foreignKey:"userId",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// end of database relationship
module.exports = db;
