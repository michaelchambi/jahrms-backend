const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/master_data/section");

router.post("/section/addSection", controller.addSection);
router.get("/section/", [authCheck.verifyToken], controller.findAll);
router.post("/section/show", [authCheck.verifyToken], controller.findOne);
router.post("/section/editSection", [authCheck.verifyToken], controller.editSection);
router.post("/section/activateSection", [authCheck.verifyToken], controller.activate);
router.post("/section/deactivateSection", [authCheck.verifyToken], controller.deactivate);
module.exports = router;