const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/master_data/cadre");

router.post("/cadre/addCadre", controller.addCadre);
router.get("/cadre/", [authCheck.verifyToken], controller.findAll);
router.get("/cadre/show/:id",[authCheck.verifyToken], controller.mobile_findOne);
router.post("/cadre/show", [authCheck.verifyToken], controller.findOne);
router.post("/cadre/editCadre", [authCheck.verifyToken], controller.editCadre);
router.post("/cadre/activateCadre", [authCheck.verifyToken], controller.activate);
router.post("/cadre/deactivateCadre", [authCheck.verifyToken], controller.deactivate);
module.exports = router;
