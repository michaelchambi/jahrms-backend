const express = require('express');
const router = express.Router();
const promotions = require("../../controllers/change_designation_controller/api_change_designation");
const { authCheck } = require("../../middlewares");
const {
    leave_middleware
} = require("../../middlewares")


router.get("/designation-cahnges/get-all/promotion", [authCheck.verifyToken], promotions.findAll);

router.post("/designation-cahnges/addChange-designation", [authCheck.verifyToken],promotions.addDesignationChange);
router.get("/designation-cahnges/all-change-designation", [authCheck.verifyToken], promotions.findAllChangeDesignation);
router.post("/designation-cahnges/show-change-designation", [authCheck.verifyToken], promotions.findOne);
router.post("/designation-cahnges/edit-change-designation", [authCheck.verifyToken], promotions.edit);
router.post("/designation-cahnges/activate-change-designation", [authCheck.verifyToken], promotions.activate);
router.post("/designation-cahnges/deactivate-change-designation", [authCheck.verifyToken], promotions.deactivate);

module.exports = router;