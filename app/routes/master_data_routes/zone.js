const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/master_data/zone");

router.post("/zone/addZone", controller.addZone);
router.get("/zone/", [authCheck.verifyToken], controller.findAll);
router.post("/zone/show", [authCheck.verifyToken], controller.findOne);
router.post("/zone/editZone", [authCheck.verifyToken], controller.editZone);
router.post("/zone/activateZone", [authCheck.verifyToken], controller.activate);
router.post("/zone/deactivateZone", [authCheck.verifyToken], controller.deactivate);
module.exports = router;


