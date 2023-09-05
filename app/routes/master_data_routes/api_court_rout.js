const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/master_data/api_court");

router.post("/court/addCourt", controller.addCourt);
router.get("/court/", [authCheck.verifyToken], controller.findAll);
router.post("/court/show", [authCheck.verifyToken], controller.findOne);
router.post("/court/bycourtlevel", [authCheck.verifyToken], controller.findAllByCourtLevel);
router.post("/court/editCourt", [authCheck.verifyToken], controller.editCourt);
router.post("/court/activateCourt", [authCheck.verifyToken], controller.activate);
router.post("/court/deactivateCourt", [authCheck.verifyToken], controller.deactivate);
module.exports = router;


