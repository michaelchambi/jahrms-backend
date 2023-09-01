const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/user_controller/incharge_title");

router.post("/incharge_title/addInchargeTitle", controller.addInchage);
router.get("/incharge_title/", [authCheck.verifyToken], controller.findAll);
router.post("/incharge_title/show", [authCheck.verifyToken], controller.findOne);
router.post("/incharge_title/editInchargeTitle", [authCheck.verifyToken], controller.editInchage);
router.post("/incharge_title/activateInchargeTitle", [authCheck.verifyToken], controller.activate);
router.post("/incharge_title/deactivateInchargeTitle", [authCheck.verifyToken], controller.deactivate);


module.exports = router;
