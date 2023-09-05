const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/master_data/qualification");

router.post("/qualification/addQualification", controller.addQualification);
router.get("/qualification/", [authCheck.verifyToken], controller.findAll);
router.post("/qualification/show", [authCheck.verifyToken], controller.findOne);
router.post("/qualification/editQualification", [authCheck.verifyToken], controller.editQualification);
router.post("/qualification/activateQualification", [authCheck.verifyToken], controller.activate);
router.post("/qualification/deactivateQualification", [authCheck.verifyToken], controller.deactivate);
module.exports = router;
