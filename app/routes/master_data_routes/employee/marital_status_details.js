const express = require("express");
const router = express.Router();
const { authCheck } = require("../../../middlewares");
const controller = require("../../../controllers/master_data/employee/marital_status_details");

router.post("/marital-status/addMaritalStatus", controller.addMaritalStatus);
router.get("/marital-status/", [authCheck.verifyToken], controller.findAll);
router.post("/marital-status/show", [authCheck.verifyToken], controller.findOne);
router.post("/marital-status/editMaritalStatus", [authCheck.verifyToken], controller.editMaritalStatus);
router.post("/marital-status/activateMaritalStatus", [authCheck.verifyToken], controller.activate);
router.post("/marital-status/deactivateMaritalStatus", [authCheck.verifyToken], controller.deactivate);
module.exports = router;
