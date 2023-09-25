const express = require("express");
const router = express.Router();
const { authCheck } = require("../../../middlewares");
const controller = require("../../../controllers/master_data/employee/next_of_kin");

router.post("/next_of_kin/addNextOfKin", controller.addNextOfKin);
router.get("/next_of_kin/", [authCheck.verifyToken], controller.findAllNextOfKin);
router.post("/next_of_kin/show", [authCheck.verifyToken], controller.findOneBanknfo);
router.post("/next_of_kin/editNextOfKin", [authCheck.verifyToken], controller.editNextOfKin);
router.post("/next_of_kin/activateNextOfKin", [authCheck.verifyToken], controller.activateNextOfKin);
router.post("/next_of_kin/deactivateNextOfKin", [authCheck.verifyToken], controller.deactivateNextOfKin);

module.exports = router;
