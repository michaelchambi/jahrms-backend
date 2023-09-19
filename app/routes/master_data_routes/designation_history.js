const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/master_data/designation_history");

router.post("/designation_history/addDesignationHistory", controller.addDesignationHistory);
router.get("/designation_history/", [authCheck.verifyToken], controller.findAll);
router.get("/designation_history/show/:id",[authCheck.verifyToken], controller.mobile_findOne);
router.post("/designation_history/show", [authCheck.verifyToken], controller.findOne);
router.post("/designation_history/editDesignationHistory", [authCheck.verifyToken], controller.editDesignationHistory);
router.post("/designation_history/activateDesignationHistory", [authCheck.verifyToken], controller.activate);
router.post("/designation_history/deactivateDesignationHistory", [authCheck.verifyToken], controller.deactivate);
module.exports = router;
