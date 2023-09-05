const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/master_data/district");

router.post("/district/addDistrict", controller.addDistrict);
router.get("/district/", [authCheck.verifyToken], controller.findAll);
router.post("/district/show", [authCheck.verifyToken], controller.findOne);
router.post("/district/editDistrict", [authCheck.verifyToken], controller.editDistrict);
router.post("/district/activateDistrict", [authCheck.verifyToken], controller.activate);
router.post("/district/deactivateDistrict", [authCheck.verifyToken], controller.deactivate);
module.exports = router;