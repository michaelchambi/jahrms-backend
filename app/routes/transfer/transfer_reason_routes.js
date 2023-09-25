const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/transfer/transfer_reason");

router.post("/transfer_reason/addtransfer_reason", controller.addtransfer_reason);
router.get("/transfer_reason/", [authCheck.verifyToken], controller.findAll);
router.post("/transfer_reason/show", [authCheck.verifyToken], controller.findOne);
router.post("/transfer_reason/edittransfer_reason", [authCheck.verifyToken], controller.edittransfer_reason);
router.post("/transfer_reason/activatetransfer_reason", [authCheck.verifyToken], controller.activate);
router.post("/transfer_reason/deactivatetransfer_reason", [authCheck.verifyToken], controller.deactivate);
module.exports = router;