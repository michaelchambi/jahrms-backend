const express = require("express");
const router = express.Router();
const { authCheck, apiCheck } = require("../../middlewares");
const auth_controller = require("../../controllers/auth/auth");
const api_controller = require("../../controllers/auth/api_auth");
const employee_controller = require("../../controllers/employee_controller/employee_controller");


router.post("/auth/external-user/signup", auth_controller.signupExternalUser);
router.post("/auth/signin", [authCheck.verifyUser], auth_controller.signin);
router.post("/auth/forgot-password", auth_controller.forgot_password);
router.post("/auth/change-password", auth_controller.change_password);

router.post("/auth/api-users/signup", [authCheck.verifyToken], api_controller.signup);
router.post("/auth/api-users/signin", api_controller.signin);
router.get("/save-employee/", employee_controller.saveEmployee);

module.exports = router;
