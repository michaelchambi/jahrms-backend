const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/master_data/scope");

router.post("/scope/addScope", controller.addScope);
router.get("/scope/", [authCheck.verifyToken], controller.findAll);
router.post("/scope/show", [authCheck.verifyToken], controller.findOne);
router.post("/scope/editScope", [authCheck.verifyToken], controller.editScope);
router.post("/scope/activateScope", [authCheck.verifyToken], controller.activate);
router.post("/scope/deactivateScope", [authCheck.verifyToken], controller.deactivate);
module.exports = router;