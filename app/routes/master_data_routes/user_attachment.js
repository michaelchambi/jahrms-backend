const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/master_data/employee/user_attachment");

router.post("/user-attachment/addUserAttachment", controller.addUserAttachment);
router.get("/user-attachment/", [authCheck.verifyToken], controller.findAll);
router.post("/user-attachment/show", [authCheck.verifyToken], controller.findOne);
router.post("/user-attachment/editUserAttachment", [authCheck.verifyToken], controller.editUserAttachment);

module.exports = router;