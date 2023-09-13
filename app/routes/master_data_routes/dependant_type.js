const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/master_data/dependant_type");

router.post("/dependant_type/addDependantType", controller.addDependant_type);
router.get("/dependant_type/", [authCheck.verifyToken], controller.findAll);
router.post("/dependant_type/show", [authCheck.verifyToken], controller.findOne);
router.post("/dependant_type/editDependantType", [authCheck.verifyToken], controller.editDependant_type);
router.post("/dependant_type/activateDependantType", [authCheck.verifyToken], controller.activate);
router.post("/dependant_type/deactivateDependantType", [authCheck.verifyToken], controller.deactivate);
module.exports = router;