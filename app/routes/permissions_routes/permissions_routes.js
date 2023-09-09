const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const module_controller = require("../../controllers/permission_controller/modules");
const submodule_controller = require("../../controllers/permission_controller/sub_module");
const submodule_item_controller = require("../../controllers/permission_controller/sub_module_item");

const action_controller = require("../../controllers/permission_controller/sub_module_action");
const permission_controller = require("../../controllers/permission_controller/role_permission");
const role_controller = require("../../controllers/user_controller/roles");
const user_controller = require("../../controllers/user_controller/users");

// router.get("/", (req, res) => {
//     res.sendFile(__dirname + "/welcome.html");
// });
//[authJwt.checkUserExistance],

router.post("/modules/add-module", [authCheck.verifyToken], module_controller.add);
router.get("/modules/modules", [authCheck.verifyToken], module_controller.findAll);
router.post("/modules/module/show", [authCheck.verifyToken], module_controller.findOne);
router.post("/modules/find-module", [authCheck.verifyToken], module_controller.module);
router.post("/modules/edit-module", [authCheck.verifyToken], module_controller.edit);
router.post("/modules/activate-module", [authCheck.verifyToken], module_controller.activate);
router.post("/modules/deactivate-module", [authCheck.verifyToken], module_controller.deactivate);

router.post("/sub-modules/add-submodule", [authCheck.verifyToken], submodule_controller.add);
router.get("/sub-modules/sub-modules", [authCheck.verifyToken], submodule_controller.findAll);
router.get("/sub-modules/sub-modules/embeded", [authCheck.verifyToken], submodule_controller.findAllEmbeded);
router.post("/sub-modules/sub-module/show", [authCheck.verifyToken], submodule_controller.findOne);
router.post("/sub-modules/find-sub-module", [authCheck.verifyToken], submodule_controller.submodule);
router.post("/sub-modules/edit-sub-module", [authCheck.verifyToken], submodule_controller.edit);
router.post("/sub-modules/activate-sub-module", [authCheck.verifyToken], submodule_controller.activate);
router.post("/sub-modules/deactivate-sub-module", [authCheck.verifyToken], submodule_controller.deactivate);




router.post("/sub-modules-item/add-submodule-item", [authCheck.verifyToken], submodule_item_controller.add);
router.get("/sub-modules-item/sub-modules-item", [authCheck.verifyToken], submodule_item_controller.findAll);
router.post("/sub-modules-item/sub-module-item/show", [authCheck.verifyToken], submodule_item_controller.findOne);
router.post("/sub-modules-item/sub-module-item/showSubmoduleItems", [authCheck.verifyToken], submodule_item_controller.findAllSubmoduleitem);
router.post("/sub-modules-item/find-sub-module-item", [authCheck.verifyToken], submodule_item_controller.submodule);
router.post("/sub-modules-item/edit-sub-module-item", [authCheck.verifyToken], submodule_item_controller.edit);
router.post("/sub-modules-item/activate-sub-module-item", [authCheck.verifyToken], submodule_item_controller.activate);
router.post("/sub-modules-item/deactivate-sub-module-item", [authCheck.verifyToken], submodule_item_controller.deactivate);


router.post("/sub-module-actions/add-action", [authCheck.verifyToken], action_controller.add);
router.get("/sub-module-actions/sub-module-actions", [authCheck.verifyToken], action_controller.findAll);
router.post("/sub-module-actions/sub-module-action/show", [authCheck.verifyToken], action_controller.findOne);
router.post("/sub-module-actions/find-sub-module-action", [authCheck.verifyToken], action_controller.action);
router.post("/sub-module-actions/edit-sub-module-action", [authCheck.verifyToken], action_controller.edit);
router.post("/sub-module-actions/activate-sub-module-action", [authCheck.verifyToken], action_controller.activate);
router.post("/sub-module-actions/deactivate-sub-module-action", [authCheck.verifyToken], action_controller.deactivate);

router.get("/permissions/permissions", [authCheck.verifyToken], permission_controller.permissions);
router.post("/permissions/role-permission",  permission_controller.rolePermissions);
router.post("/permissions/active-role-permission", [authCheck.verifyToken], permission_controller.activePermissions);
router.post("/permissions/updatePermission", [authCheck.verifyToken], permission_controller.updatePermissions);
router.post("/permissions/show-module-permission", [authCheck.verifyToken], permission_controller.showModulePermissions);
router.post("/permissions/show-submodule-permission", [authCheck.verifyToken], permission_controller.showSubPermissions);
router.post("/permissions/show-action-permission", [authCheck.verifyToken], permission_controller.showActionPermissions);

router.post("/roles/add-role", [authCheck.verifyToken], role_controller.add);
router.post("/roles/edit-role", [authCheck.verifyToken], role_controller.edit);
router.post("/roles/role/show", [authCheck.verifyToken], role_controller.findOne);
router.post("/roles/change-roles", [authCheck.verifyToken], role_controller.changeRoles);
router.get("/roles/roles", [authCheck.verifyToken], role_controller.findAll);
router.post("/roles/activate-role", [authCheck.verifyToken], role_controller.activate);
router.post("/roles/deactivate-role", [authCheck.verifyToken], role_controller.deactivate);

router.post("/users/add-user", [authCheck.verifyToken], [authCheck.userExistance], user_controller.signup);
router.post("/users/edit-user", [authCheck.verifyToken], user_controller.edit, [authCheck.checkActiveComplaint], [authCheck.checkActiveAppeal]);
router.post("/users/user/show", [authCheck.verifyToken], user_controller.findOne);
router.get("/users/show/:id", [authCheck.verifyToken], user_controller.findOneOnly);
router.get("/users/totalEmployee", [authCheck.verifyToken], user_controller.countMyEmployee);
router.get("/users", [authCheck.verifyToken], user_controller.getAllUsers);
router.post("/users/users-list", [authCheck.verifyToken], user_controller.organization_users_list);
router.post("/users/institution-users-list", [authCheck.verifyToken], user_controller.userList);
router.post("/users/activate-user", [authCheck.verifyToken], user_controller.activate);
router.post("/users/deactivate-user", [authCheck.verifyToken], user_controller.deactivate);
router.post("/users/my-profile", [authCheck.verifyToken], user_controller.myProfile);
router.get("/hrm-storage-files/employee/:d1r3c7095/:name", user_controller.download);

module.exports = router;


// http://localhost:8000/jahrm-connect/api/v1/permissions/show-submodule-permission