const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/master_data/education_level");

router.post("/education_level/addEducationLevel", controller.addEducationLevel);
router.get("/education_level/", [authCheck.verifyToken], controller.findAll);
router.post("/education_level/show", [authCheck.verifyToken], controller.findOne);
router.post("/education_level/editEducationLevel", [authCheck.verifyToken], controller.editEducationLevel);
router.post("/education_level/activateEducationLevel", [authCheck.verifyToken], controller.activate);
router.post("/education_level/deactivateEducationLevel", [authCheck.verifyToken], controller.deactivate);
module.exports = router;
