const express = require("express");
const router = express.Router();
const { authCheck } = require("../../../middlewares");
const controller = require("../../../controllers/master_data/employee/education_details");

router.post("/education-details/addEducationDetails", controller.addEducationDetails);
router.get("/education-details/", [authCheck.verifyToken], controller.findAll);
router.post("/education-details/show", [authCheck.verifyToken], controller.findOne);
router.post("/education-details/editEducationDetails", [authCheck.verifyToken], controller.editEducationDetails);
router.post("/education-details/activateEducationDetails", [authCheck.verifyToken], controller.activate);
router.post("/education-details/deactivateEducationDetails", [authCheck.verifyToken], controller.deactivate);
module.exports = router;

