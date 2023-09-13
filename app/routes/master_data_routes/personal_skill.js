const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/master_data/leave_type");

router.post("/personal_skill/addPersonalSkill", controller.addLeave_type);
router.get("/personal_skill/", [authCheck.verifyToken], controller.findAll);
router.post("/personal_skill/show", [authCheck.verifyToken], controller.findOne);
router.post("/personal_skill/editPersonalSkill", [authCheck.verifyToken], controller.editLeave_type);
router.post("/personal_skill/activatePersonalSkill", [authCheck.verifyToken], controller.activate);
router.post("/personal_skill/deactivatePersonalSkill", [authCheck.verifyToken], controller.deactivate);
module.exports = router;