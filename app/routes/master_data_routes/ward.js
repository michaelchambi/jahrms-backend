const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/master_data/ward");

router.post("/ward/addWard", controller.addWard);
router.get("/ward/", [authCheck.verifyToken], controller.findAll);
router.post("/ward/show", [authCheck.verifyToken], controller.findOne);
router.post("/ward/editWard", [authCheck.verifyToken], controller.editWard);
router.post("/ward/activateWard", [authCheck.verifyToken], controller.activate);
router.post("/ward/deactivateWard", [authCheck.verifyToken], controller.deactivate);
module.exports = router;