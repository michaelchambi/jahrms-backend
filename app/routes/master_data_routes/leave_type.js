const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/master_data/leave_type");

router.post("/leave_type/addLeaveType", controller.addLeave_type);
router.get("/leave_type/", [authCheck.verifyToken], controller.findAll);
router.post("/leave_type/show", [authCheck.verifyToken], controller.findOne);
router.post("/leave_type/editLeaveType", [authCheck.verifyToken], controller.editLeave_type);
router.post("/leave_type/activateLeaveType", [authCheck.verifyToken], controller.activate);
router.post("/leave_type/deactivateLeaveType", [authCheck.verifyToken], controller.deactivate);
module.exports = router;