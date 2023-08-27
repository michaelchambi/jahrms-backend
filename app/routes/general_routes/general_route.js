const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const info_controller = require("../../controllers/general_controller/instructions");
const general_controller = require("../../controllers/general_controller/data_updates");

// router.get("/", (req, res) => {
//     res.sendFile(__dirname + "/welcome.html");
// });
//[authJwt.verifyToken],

router.post("/settings/update-instruction", [authCheck.verifyToken], info_controller.update);
router.get("/settings/get-instruction", [authCheck.verifyToken], info_controller.get_instruction);
router.get("/settings/update-organization", [authCheck.verifyToken], general_controller.organization_update);
router.get("/settings/organizations", [authCheck.verifyToken], general_controller.get_organization);
router.get("/settings/organizations/show/:code", [authCheck.verifyToken], general_controller.show_organization);
router.get("/settings/punishment/show/:code", [authCheck.verifyToken], general_controller.show_punishment);
router.get("/settings/punishment", [authCheck.verifyToken], general_controller.get_punishment);
router.get("/settings/attachment-tittles", [authCheck.verifyToken], general_controller.get_attachment_tittle);

module.exports = router;
