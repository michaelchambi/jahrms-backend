const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/master_data/skill");

router.post("/skill/addSkill", controller.addSkill);
router.get("/skill/", [authCheck.verifyToken], controller.findAll);
router.post("/skill/show", [authCheck.verifyToken], controller.findOne);
router.post("/skill/editSkill", [authCheck.verifyToken], controller.editSkill);
router.post("/skill/activateSkill", [authCheck.verifyToken], controller.activate);
router.post("/skill/deactivateSkill", [authCheck.verifyToken], controller.deactivate);
module.exports = router;