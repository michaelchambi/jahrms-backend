const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/master_data/unit");

router.post("/unit/addUnit", controller.addUnit);
router.get("/unit/", [authCheck.verifyToken], controller.findAll);
router.post("/unit/show", [authCheck.verifyToken], controller.findOne);
router.post("/unit/editUnit", [authCheck.verifyToken], controller.editUnit);
router.post("/unit/activateUnit", [authCheck.verifyToken], controller.activate);
router.post("/unit/deactivateUnit", [authCheck.verifyToken], controller.deactivate);
module.exports = router;


