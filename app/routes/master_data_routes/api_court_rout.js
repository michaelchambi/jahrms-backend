const express = require('express');
const router = express.Router();
const court = require("../../controllers/master_data/api_court");
const {
    court_middleware
} = require("../../middlewares")

router.post("/courts/add-court",court.add);
router.post("/courts/edit-court",court.edit);
router.get("/courts/get-courts", court.findAll);
router.post("/courts/show-court-info", court.findOne);
router.post("/courts/activate-court", court.activate);
router.post("/courts/deactivate-court", court.deactivate);
router.get("/courts/get-ecms-court", court.getCourts);
router.get("/courts/show-ecms-court", court.showCourts);



module.exports = router;