const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/master_data/designation");

router.post("/designation/addDesignation", controller.addDesignation);
router.get("/designation/", [authCheck.verifyToken], controller.findAll);
router.post("/designation/show", [authCheck.verifyToken], controller.findOne);
router.post("/designation/editDesignation", [authCheck.verifyToken], controller.editDesignation);
router.post("/designation/activateDesignation", [authCheck.verifyToken], controller.activate);
router.post("/designation/deactivateDesignation", [authCheck.verifyToken], controller.deactivate);
module.exports = router;