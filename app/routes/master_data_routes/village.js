const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/master_data/village");

router.post("/village/addVillage", controller.addVillage);
router.get("/village/", [authCheck.verifyToken], controller.findAll);
router.post("/village/show", [authCheck.verifyToken], controller.findOne);
router.post("/village/editVillage", [authCheck.verifyToken], controller.editVillage);
router.post("/village/activateVillage", [authCheck.verifyToken], controller.activate);
router.post("/village/deactivateVillage", [authCheck.verifyToken], controller.deactivate);
module.exports = router;