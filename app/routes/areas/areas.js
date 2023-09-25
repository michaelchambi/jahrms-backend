const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/areas/areas");

router.post("/areas/addAreas", controller.addAreas);
router.get("/areas/", [authCheck.verifyToken], controller.findAllAreas);
router.post("/areas/show", [authCheck.verifyToken], controller.findOneAreas);
router.post("/areas/editAreas", [authCheck.verifyToken], controller.editAreas);
router.post("/areas/activateAreas", [authCheck.verifyToken], controller.activateAreas);
router.post("/areas/deactivateAreas", [authCheck.verifyToken], controller.deactivateAreas);
router.get("/hrm-storage-files/employee/:d1r3c7095/:name", controller.download);
module.exports = router;
