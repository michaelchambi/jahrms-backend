const express = require("express");
const router = express.Router();
const { authCheck } = require("../../../middlewares");
const controller = require("../../../controllers/master_data/employee/dependant");

router.post("/dependant/addDependant", controller.addDependant);
router.get("/dependant/", [authCheck.verifyToken], controller.findAllDependant);
router.post("/dependant/show", [authCheck.verifyToken], controller.findOneBanknfo);
router.post("/dependant/editDependant", [authCheck.verifyToken], controller.editDependant);
router.post("/dependant/activateDependant", [authCheck.verifyToken], controller.activateDependant);
router.post("/dependant/deactivateDependant", [authCheck.verifyToken], controller.deactivateDependant);
router.get("/hrm-storage-files/employee/:d1r3c7095/:name", controller.download);
module.exports = router;
