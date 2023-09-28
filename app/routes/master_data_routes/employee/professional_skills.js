const express = require("express");
const router = express.Router();
const { authCheck } = require("../../../middlewares");
const controller = require("../../../controllers/master_data/employee/professional_skills");

router.post("/professional-skills/addProfessionalSkills", controller.addProfessionalSkills);
router.get("/professional-skills/", [authCheck.verifyToken], controller.findAllProfessionalSkills);
router.post("/professional-skills/show", [authCheck.verifyToken], controller.findOneProfessionalSkills);
router.post("/professional-skills/editProfessionalSkills", [authCheck.verifyToken], controller.editProfessionalSkills);
router.post("/professional-skills/activateProfessionalSkills", [authCheck.verifyToken], controller.activateProfessionalSkills);
router.post("/professional-skills/deactivateProfessionalSkills", [authCheck.verifyToken], controller.deactivateProfessionalSkills);
router.get("/hrm-storage-files/employee/:d1r3c7095/:name", controller.download);
module.exports = router;
