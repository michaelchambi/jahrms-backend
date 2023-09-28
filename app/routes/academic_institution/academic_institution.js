const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/academic_institution/academic_institution");

router.post("/institution/addInstitution", controller.addAcademicInstitution);
router.get("/institution/", [authCheck.verifyToken], controller.findAll);
router.post("/institution/show", [authCheck.verifyToken], controller.findOne);
router.post("/institution/editInstitution", [authCheck.verifyToken], controller.editAcademicInstitution);
router.post("/institution/activateInstitution", [authCheck.verifyToken], controller.activate);
router.post("/institution/deactivateInstitution", [authCheck.verifyToken], controller.deactivate);

module.exports = router;
