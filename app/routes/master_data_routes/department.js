const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/master_data/department");

router.post("/department/addDepartment", controller.addDepartment);
router.get("/department/", [authCheck.verifyToken], controller.findAll);
router.post("/department/show", [authCheck.verifyToken], controller.findOne);
router.post("/department/editDepartment", [authCheck.verifyToken], controller.editDepartment);
router.post("/department/activateDepartment", [authCheck.verifyToken], controller.activate);
router.post("/department/deactivateDepartment", [authCheck.verifyToken], controller.deactivate);
module.exports = router;
