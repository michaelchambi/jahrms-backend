const express = require("express");
const router = express.Router();
const { authCheck } = require("../../../middlewares");
const controller = require("../../../controllers/master_data/employee/spouse");

router.get("/spouse/", [authCheck.verifyToken], controller.findAll);
router.post("/spouse/show", [authCheck.verifyToken], controller.findOne);
router.post("/spouse/editSpouse", [authCheck.verifyToken], controller.editSpouse);
router.post("/spouse/activateSpouse", [authCheck.verifyToken], controller.activate);
router.post("/spouse/deactivateSpouse", [authCheck.verifyToken], controller.deactivate);
module.exports = router;
