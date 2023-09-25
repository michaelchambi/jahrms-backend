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
db.app_action_permission = require("./permission_model/app_action_permission")(sequelize, Sequelize);
db.app_submodule_item=require("./permission_model/submodule_item")(sequelize, Sequelize);
//======================================================
// SYSTEM DATABASE TABLE CREATION
// =============================================================================

db.api_designation = require("./user_model/designation")(sequelize, Sequelize);
db.api_staff_profile = require("./user_model/api_staff_profile")(sequelize, Sequelize);
db.api_users = require("./user_model/api_users")(sequelize, Sequelize);
db.users = require("./user_model/users")(sequelize, Sequelize);
db.roles = require("./user_model/roles")(sequelize, Sequelize);
db.role_user = require("./user_model/role_user")(sequelize, Sequelize);
db.attachment_dependant_type = require("./user_model/attachment_dependant_type")(sequelize, Sequelize);
db.incharges = require("./user_model/incharges")(sequelize, Sequelize);
db.department=require("./user_model/department")(sequelize, Sequelize);
db.scope=require("./user_model/scope")(sequelize, Sequelize);
db.scope_station=require("./user_model/scope_station")(sequelize, Sequelize);
db.unit=require("./user_model/unit")(sequelize, Sequelize);
db.attachment=require("./user_model/attachment")(sequelize, Sequelize);
db.section=require("./user_model/section")(sequelize, Sequelize);
db.bank=require("./bank/bank")(sequelize, Sequelize);
db.skill=require("./user_model/skill")(sequelize,Sequelize)
db.bank_details=require("./user_model/other_personal_details/bank_details")(sequelize, Sequelize);
db.designation_history=require("./user_model/designation_history")(sequelize,Sequelize)
// =============================================================================
// LOCATION DATABASE TABLE CREATION
// =============================================================================
db.zone=require("./zone/zone")(sequelize, Sequelize);
db.region=require("./region/region")(sequelize, Sequelize);
db.district=require("./district/district")(sequelize, Sequelize);
db.ward=require("./ward/ward")(sequelize, Sequelize);
db.village=require("./village/village")(sequelize, Sequelize);
db.court_level=require("./court_level/court_level")(sequelize, Sequelize);
db.court=require("./court/court")(sequelize, Sequelize);
db.nj_work_station=require("./non_judicial_work_stattion/nj_work_station")(sequelize, Sequelize);
db.cadre=require("./user_model/cadre")(sequelize, Sequelize);
db.announcement = require("./announcement/announcement")(sequelize, Sequelize);
db.leave_type=require("./user_model/leave_type")(sequelize, Sequelize);
db.dependant_details=require("./user_model/other_personal_details/dependant_details")(sequelize, Sequelize);
db.education_details=require("./user_model/other_personal_details/education_details")(sequelize, Sequelize);
db.education_level=require("./user_model/other_personal_details/education_level")(sequelize, Sequelize);
db.professional_body=require("./user_model/other_personal_details/professional_body")(sequelize, Sequelize);
db.dependant_type=require("./user_model/other_personal_details/dependant_type")(sequelize, Sequelize);
db.employment_details=require("./user_model/other_personal_details/employment_details")(sequelize, Sequelize);
db.next_of_kin=require("./user_model/other_personal_details/next_of_kin")(sequelize, Sequelize);
db.personal_skill=require("./user_model/other_personal_details/personal_skill")(sequelize, Sequelize);
db.professional_skill=require("./user_model/other_personal_details/professional_skills")(sequelize, Sequelize);
db.professional=require("./user_model/other_personal_details/professional")(sequelize, Sequelize);
db.user_attachment=require("./user_model/user_attachment")(sequelize, Sequelize);
db.working_station_details=require("./user_model/other_personal_details/working_station_details")(sequelize, Sequelize);
db.qualification=require("./user_model/other_personal_details/qualification")(sequelize, Sequelize);
db.qualification_grade=require("./user_model/other_personal_details/qualification_grade")(sequelize, Sequelize);
db.spouse=require("./user_model/other_personal_details/spouse")(sequelize, Sequelize);
db.marital_status=require("./user_model/other_personal_details/marital_status_details")(sequelize, Sequelize);
db.workstation_history=require("./user_model/workstation_history")(sequelize, Sequelize);
db.dependant_attachment=require("./user_model/other_personal_details/dependant_attachments")(sequelize, Sequelize);
db.api_change_designation=require("./change_designation/api_change_designation")(sequelize, Sequelize);
db.api_transfer=require("./transfer/app_transfer")(sequelize, Sequelize);
db.api_transfer_reason=require("./transfer/app_transfer_reason")(sequelize, Sequelize);
db.api_job_list=require("./job_list/api_job_list")(sequelize, Sequelize);
db.api_leave=require("./leave/app_leave")(sequelize, Sequelize);
db.areas=require("./areas/areas")(sequelize, Sequelize);
//====================================================
// START OF MODULE/MODULE_PERMISSION/ROLE RELATION
//====================================================
db.users.hasMany(db.areas, {
    foreignKey: "employee_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.areas.belongsTo(db.users, {
    through: db.users,
    foreignKey: "employee_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});


db.users.hasMany(db.areas, {
    foreignKey: "completed_by_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.areas.belongsTo(db.users, {
    through: db.users,
    foreignKey: "completed_by_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});




db.dependant_details.hasMany(db.dependant_attachment, {
    foreignKey: "dependant_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.dependant_attachment.belongsTo(db.dependant_details, {
    through: db.dependant_details,
    foreignKey: "dependant_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});


db.dependant_type.hasMany(db.next_of_kin, {
    foreignKey: "relation_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.next_of_kin.belongsTo(db.dependant_type, {
    through: db.dependant_type,
    foreignKey: "relation_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.dependant_type.hasMany(db.dependant_details, {
    foreignKey: "dependant_type_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.dependant_details.belongsTo(db.dependant_type, {
    through: db.dependant_type,
    foreignKey: "dependant_type_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.court.hasMany(db.workstation_history, {
    foreignKey: "workstation_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.workstation_history.belongsTo(db.court, {
    through: db.court,
    foreignKey: "workstation_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});


db.court.hasMany(db.working_station_details, {
    foreignKey: "station_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.working_station_details.belongsTo(db.court, {
    through: db.court,
    foreignKey: "station_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.users.hasMany(db.spouse, {
    foreignKey: "employee_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.spouse.belongsTo(db.users, {
    through: db.users,
    foreignKey: "employee_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.spouse.hasMany(db.marital_status, {
    foreignKey: "spouse_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.marital_status.belongsTo(db.spouse, {
    through: db.spouse,
    foreignKey: "spouse_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});


db.users.hasMany(db.marital_status, {
    foreignKey: "employee_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.marital_status.belongsTo(db.users, {
    through: db.users,
    foreignKey: "employee_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});


db.users.hasMany(db.user_attachment, {
    foreignKey: "employee_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.user_attachment.belongsTo(db.users, {
    through: db.users,
    foreignKey: "employee_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});


db.attachment.hasMany(db.user_attachment, {
    foreignKey: "attachment_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.user_attachment.belongsTo(db.attachment, {
    through: db.attachment,
    foreignKey: "attachment_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});


db.api_designation.hasMany(db.designation_history, {
    foreignKey: "designation_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.designation_history.belongsTo(db.api_designation, {
    through: db.api_designation,
    foreignKey: "designation_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});


db.api_staff_profile.hasMany(db.designation_history, {
    foreignKey: "staff_profile_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.designation_history.belongsTo(db.api_staff_profile, {
    through: db.api_staff_profile,
    foreignKey: "staff_profile_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.education_level.hasMany(db.education_details, {
    foreignKey: "education_level_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.education_details.belongsTo(db.education_level, {
    through: db.education_level,
    foreignKey: "education_level_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.district.hasMany(db.nj_work_station, {
    foreignKey: "district_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.nj_work_station.belongsTo(db.district, {
    through: db.district,
    foreignKey: "district_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});


db.district.hasMany(db.court, {
    foreignKey: "district_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.court.belongsTo(db.district, {
    through: db.district,
    foreignKey: "district_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.region.hasMany(db.district, {
    foreignKey: "region_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.district.belongsTo(db.region, {
    through: db.region,
    foreignKey: "region_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.zone.hasMany(db.region, {
    foreignKey: "zone_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.region.belongsTo(db.zone, {
    through: db.zone,
    foreignKey: "zone_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.court_level.hasMany(db.court, {
    foreignKey: "court_level_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.court.belongsTo(db.court_level, {
    through: db.court_level,
    foreignKey: "court_level_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.bank.hasMany(db.bank_details, {
    foreignKey: "bank_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.bank_details.belongsTo(db.bank, {
    through: db.bank,
    foreignKey: "bank_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});


db.professional_body.hasMany(db.professional_skill, {
    foreignKey: "professional_body_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.professional_skill.belongsTo(db.professional_body, {
    through: db.professional_body,
    foreignKey: "professional_body_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.users.hasMany(db.working_station_details, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.working_station_details.belongsTo(db.users, {
    through: db.users,
    foreignKey: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.qualification.hasMany(db.qualification_grade, {
    foreignKey: "qualification_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.qualification_grade.belongsTo(db.qualification, {
    through: db.qualification,
    foreignKey: "qualification_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});


db.users.hasMany(db.working_station_details, {
    foreignKey: "employee_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.working_station_details.belongsTo(db.users, {
    through: db.users,
    foreignKey: "employee_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.users.hasMany(db.professional_skill, {
    foreignKey: "employee_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.professional_skill.belongsTo(db.users, {
    through: db.users,
    foreignKey: "employee_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.users.hasMany(db.personal_skill, {
    foreignKey: "employee_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.personal_skill.belongsTo(db.users, {
    through: db.users,
    foreignKey: "employee_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.users.hasMany(db.next_of_kin, {
    foreignKey: "employee_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.next_of_kin.belongsTo(db.users, {
    through: db.users,
    foreignKey: "employee_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.users.hasMany(db.employment_details, {
    foreignKey: "employee_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.employment_details.belongsTo(db.users, {
    through: db.users,
    foreignKey: "employee_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.users.hasMany(db.education_details, {
    foreignKey: "employee_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.education_details.belongsTo(db.users, {
    through: db.users,
    foreignKey: "employee_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.users.hasMany(db.dependant_details, {
    foreignKey: "employee_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.dependant_details.belongsTo(db.users, {
    through: db.users,
    foreignKey: "employee_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});


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


db.incharges.hasMany(db.department, {
    foreignKey: "incharge_title_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.department.belongsTo(db.incharges, {
    through: db.incharges,
    foreignKey: "incharge_title_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});


db.department.hasMany(db.section, {
    foreignKey: "department_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.section.belongsTo(db.department, {
    through: db.department,
    foreignKey: "department_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.users.hasMany(db.scope, {
    foreignKey: "employee_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.scope.belongsTo(db.users, {
    through: db.users,
    foreignKey: "employee_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.department.hasMany(db.scope, {
    foreignKey: "department_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.scope.belongsTo(db.department, {
    through: db.department,
    foreignKey: "department_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});






db.app_sub_modules.hasMany(db.app_submodule_item, {
    foreignKey: "submodule_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.app_submodule_item.belongsTo(db.app_sub_modules, {
    foreignKey: "submodule_id",
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



db.users.hasMany(db.role_user, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});


db.role_user.belongsTo(db.users, {
    through: db.users,
    foreignKey: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.dependant_type.hasMany(db.attachment_dependant_type, {
    foreignKey: "dependant_type_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});


db.attachment_dependant_type.belongsTo(db.dependant_type, {
    through: db.dependant_type,
    foreignKey: "dependant_type_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.attachment.hasMany(db.attachment_dependant_type, {
    foreignKey: "attachment_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.attachment_dependant_type.belongsTo(db.attachment, {
    through: db.attachment,
    foreignKey: "attachment_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});





db.scope.hasMany(db.scope_station, {
    foreignKey: "scope_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});


db.scope_station.belongsTo(db.scope, {
    through: db.scope,
    foreignKey: "scope_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});


db.department.hasMany(db.cadre, {
    foreignKey: "department_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});


db.cadre.belongsTo(db.department, {
    through: db.department,
    foreignKey: "department_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});


db.cadre.hasMany(db.api_designation, {
    foreignKey: "cadre_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});


db.api_designation.belongsTo(db.cadre, {
    through: db.cadre,
    foreignKey: "cadre_id",
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
    foreignKey:"employee_id",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

db.api_staff_profile.belongsTo(db.users,{
    through:db.users,
    foreignKey:"employee_id",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});


db.users.hasOne(db.api_staff_profile, {
    foreignKey:"registrar_id",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

db.api_staff_profile.belongsTo(db.users,{
    through:db.users,
    foreignKey:"registrar_id",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});



db.api_designation.hasMany(db.api_staff_profile, {
  foreignKey:"designation_id",
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

db.api_staff_profile.belongsTo(db.api_designation,{
  through:db.api_designation,
  foreignKey:"designation_id",
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});


db.api_designation.hasMany(db.api_staff_profile, {
    foreignKey:"designation_id",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  
  db.api_staff_profile.belongsTo(db.api_designation,{
    through:db.api_designation,
    foreignKey:"designation_id",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

//   db.users.hasOne(db.api_staff_profile, {
//     foreignKey:"user_id",
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE'
//   });

// db.api_staff_profile.belongsTo(db.users,{
//     through:db.users,
//     foreignKey:"user_id",
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE'
// });





//====================================================
// NEW INTERGRATED/FROM TAMIMU
//====================================================



db.users.hasMany(db.api_transfer, {
	foreignKey: "userId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.api_transfer.belongsTo(db.users, {
	through: db.users,
	foreignKey: "userId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});
db.users.hasMany(db.api_leave, {
	foreignKey: "userId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.api_leave.belongsTo(db.users, {
	through: db.users,
	foreignKey: "userId",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.cadre.hasMany(db.api_job_list, {
	foreignKey: "cadre_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});


db.api_job_list.belongsTo(db.cadre, {
	through: db.cadre,
	foreignKey: "cadre_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.court.hasMany(db.api_job_list, {
	foreignKey: "court_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});


db.api_job_list.belongsTo(db.court, {
	through: db.court,
	foreignKey: "court_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});


db.api_change_designation.hasMany(db.api_staff_profile, {
	foreignKey: "change_designation_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});


db.api_staff_profile.belongsTo(db.api_change_designation, {
	through: db.api_change_designation,
	foreignKey: "change_designation_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.api_change_designation.hasMany(db.designation_history, {
	foreignKey: "change_designation_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});


db.designation_history.belongsTo(db.api_change_designation, {
	through: db.api_change_designation,
	foreignKey: "change_designation_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.court.hasMany(db.api_transfer, {
	foreignKey: "court_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.api_transfer.belongsTo(db.court, {
	through: db.court,
	foreignKey: "court_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});
db.api_transfer_reason.hasMany(db.api_transfer, {
	foreignKey: "transfer_reason_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

db.api_transfer.belongsTo(db.api_transfer_reason, {
	through: db.api_transfer_reason,
	foreignKey: "transfer_reason_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

// end of database relationship
module.exports = db;

