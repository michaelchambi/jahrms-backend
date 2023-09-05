const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/master_data/qualification_grade");

router.post("/qualification_grade/addQualificationGrade", controller.addQualification_grade);
router.get("/qualification_grade/", [authCheck.verifyToken], controller.findAll);
router.post("/qualification_grade/show", [authCheck.verifyToken], controller.findOne);
router.post("/qualification_grade/editQualificationGrade", [authCheck.verifyToken], controller.editQualification_grade);
router.post("/qualification_grade/activateQualificationGrade", [authCheck.verifyToken], controller.activate);
router.post("/qualification_grade/deactivateQualificationGrade", [authCheck.verifyToken], controller.deactivate);
module.exports = router;
