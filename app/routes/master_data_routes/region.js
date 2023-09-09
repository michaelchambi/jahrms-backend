const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/master_data/region");

router.post("/region/addRegion", controller.addRegion);
router.get("/region/", [authCheck.verifyToken], controller.findAll);
router.post("/region/show", [authCheck.verifyToken], controller.findOne);
router.post("/region/editRegion", [authCheck.verifyToken], controller.editRegion);
router.post("/region/activateRegion", [authCheck.verifyToken], controller.activate);
router.post("/region/deactivateRegion", [authCheck.verifyToken], controller.deactivate);
module.exports = router;