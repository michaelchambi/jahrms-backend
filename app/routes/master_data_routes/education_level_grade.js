const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/master_data/education_level_grade");

router.post("/education_level_grade/addEducationLevelGrade", controller.addEducationLevelGrade);
router.get("/education_level_grade/", [authCheck.verifyToken], controller.findAll);
router.post("/education_level_grade/show", [authCheck.verifyToken], controller.findOne);
router.post("/education_level_grade/editEducationLevelGrade", [authCheck.verifyToken], controller.editEducationLevelGrade);
router.post("/education_level_grade/activateEducationLevelGrade", [authCheck.verifyToken], controller.activate);
router.post("/education_level_grade/deactivateEducationLevelGrade", [authCheck.verifyToken], controller.deactivate);
module.exports = router;
