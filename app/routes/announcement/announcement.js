const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/announcement/announcement");

router.post("/announcement/addAnnouncement", controller.addAannouncement);
router.get("/announcement/", [authCheck.verifyToken], controller.findAll);
router.get("/announcement/free", controller.findAllFree);
router.get("/announcement/show/:id", controller.mobile_findOne);
router.post("/announcement/show", [authCheck.verifyToken], controller.findOne);
router.post("/announcement/editAnnouncement", [authCheck.verifyToken], controller.editAnnouncement);
router.post("/announcement/activateAnnouncement", [authCheck.verifyToken], controller.activate);
router.post("/announcement/deactivateAnnouncement", [authCheck.verifyToken], controller.deactivate);
router.get("/mobile/announcement/:AnnouncementId", controller.mobile_findAll);
router.get("/hrm-storage-files/announcement/:d1r3c7095/:name", controller.download);


module.exports = router;
