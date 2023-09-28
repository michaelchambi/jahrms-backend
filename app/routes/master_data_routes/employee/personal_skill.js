const express = require("express");
const router = express.Router();
const { authCheck } = require("../../../middlewares");
const controller = require("../../../controllers/master_data/employee/personal_skills");

router.post("/personal-skill/addPersonalSkill", controller.addPersonalSkills);
router.get("/personal-skill/", [authCheck.verifyToken], controller.findAll);
router.post("/personal-skill/show", [authCheck.verifyToken], controller.findOne);
router.post("/personal-skill/editPersonalSkill", [authCheck.verifyToken], controller.editPersonalSkills);
router.post("/personal-skill/activatePersonalSkill", [authCheck.verifyToken], controller.activate);
router.post("/personal-skill/deactivatePersonalSkill", [authCheck.verifyToken], controller.deactivate);

module.exports = router;