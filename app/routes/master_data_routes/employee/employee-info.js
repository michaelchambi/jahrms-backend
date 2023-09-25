const express = require("express");
const router = express.Router();
const { authCheck } = require("../../../middlewares");
const controller = require("../../../controllers/master_data/employee/employee-info");

router.post("/employment-info/addEmploymentInfo", controller.addEmploymentInfo);
router.get("/employment-info/", [authCheck.verifyToken], controller.findAll);
router.post("/employment-info/show", [authCheck.verifyToken], controller.findOne);
router.post("/employment-info/editEmploymentInfo", [authCheck.verifyToken], controller.editEmploymentInfo);
router.post("/employment-info/activateEmploymentInfo", [authCheck.verifyToken], controller.activate);
router.post("/employment-info/deactivateEmploymentInfo", [authCheck.verifyToken], controller.deactivate);
module.exports = router;

