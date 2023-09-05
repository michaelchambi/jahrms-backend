const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/master_data/station");

router.post("/station/addStation", controller.addStation);
router.get("/station/", [authCheck.verifyToken], controller.findAll);
router.post("/station/show", [authCheck.verifyToken], controller.findOne);
router.post("/station/editStation", [authCheck.verifyToken], controller.editStation);
router.post("/station/activateStation", [authCheck.verifyToken], controller.activate);
router.post("/station/deactivateStation", [authCheck.verifyToken], controller.deactivate);
module.exports = router;