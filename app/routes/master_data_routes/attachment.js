const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/master_data/attachment");

router.post("/attachment/addAttachment", controller.addAttachment);
router.get("/attachment/", [authCheck.verifyToken], controller.findAll);
router.post("/attachment/show", [authCheck.verifyToken], controller.findOne);
router.post("/attachment/editAttachment", [authCheck.verifyToken], controller.editAttachment);
router.post("/attachment/activateAttachment", [authCheck.verifyToken], controller.activate);
router.post("/attachment/deactivateAttachment", [authCheck.verifyToken], controller.deactivate);
module.exports = router;
