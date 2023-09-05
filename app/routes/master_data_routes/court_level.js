const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/master_data/court_level");

router.post("/court_level/addCourt_level", controller.addCourt_level);
router.get("/court_level/", [authCheck.verifyToken], controller.findAll);
router.get("/court_level/active", [authCheck.verifyToken], controller.findAllActive);
router.post("/court_level/show", [authCheck.verifyToken], controller.findOne);
router.post("/court_level/editCourt_level", [authCheck.verifyToken], controller.editCourt_level);
router.post("/court_level/activateCourt_level", [authCheck.verifyToken], controller.activate);
router.post("/court_level/deactivateCourt_level", [authCheck.verifyToken], controller.deactivate);
module.exports = router;