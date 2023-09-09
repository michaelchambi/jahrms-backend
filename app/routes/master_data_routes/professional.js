const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/master_data/professional");

router.post("/professional/addProfessional", controller.addProfessional);
router.get("/professional/", [authCheck.verifyToken], controller.findAll);
router.get("/professional/show/:id", controller.mobile_findOne);
router.post("/professional/show", [authCheck.verifyToken], controller.findOne);
router.post("/professional/editProfessional", [authCheck.verifyToken], controller.editProfessional);
router.post("/professional/activateProfessional", [authCheck.verifyToken], controller.activate);
router.post("/professional/deactivateProfessional", [authCheck.verifyToken], controller.deactivate);
module.exports = router;
