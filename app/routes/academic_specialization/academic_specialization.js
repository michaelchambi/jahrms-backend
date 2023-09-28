const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/academic_specialization/academic_specialization");

router.post("/specialization/addSpecialization", controller.addAcademicSpecialization);
router.get("/specialization/", [authCheck.verifyToken], controller.findAll);
router.post("/specialization/show", [authCheck.verifyToken], controller.findOne);
router.post("/specialization/editSpecialization", [authCheck.verifyToken], controller.editAcademicSpecialization);
router.post("/specialization/activateSpecialization", [authCheck.verifyToken], controller.activate);
router.post("/specialization/deactivateSpecialization", [authCheck.verifyToken], controller.deactivate);

module.exports = router;
