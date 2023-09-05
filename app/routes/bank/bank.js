const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/bank/bank");

router.post("/bank/addBank", controller.addBank);
router.get("/bank/", [authCheck.verifyToken], controller.findAll);
router.post("/bank/show", [authCheck.verifyToken], controller.findOne);
router.post("/bank/editBank", [authCheck.verifyToken], controller.editBank);
router.post("/bank/activateBank", [authCheck.verifyToken], controller.activate);
router.post("/bank/deactivateBank", [authCheck.verifyToken], controller.deactivate);
module.exports = router;
