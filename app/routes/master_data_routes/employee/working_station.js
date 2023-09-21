const express = require("express");
const router = express.Router();
const { authCheck } = require("../../../middlewares");
const controller = require("../../../controllers/master_data/employee/working_station_details");

router.get("/workstation/", [authCheck.verifyToken], controller.findAll);
router.get("/workstation/show/:id", [authCheck.verifyToken], controller.findOne);
router.post("/workstation/show", [authCheck.verifyToken], controller.findEmployeeWorkstation);
router.post("/workstation/editWorkstation", [authCheck.verifyToken], controller.editWorkstation);
router.post("/workstation/activateWorkstation", [authCheck.verifyToken], controller.activate);
router.post("/workstation/deactivateWorkstation", [authCheck.verifyToken], controller.deactivate);
module.exports = router;
