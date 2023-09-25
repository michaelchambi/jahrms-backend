const express = require('express');
const router = express.Router();
const leave = require("../../controllers/leave/leave_controller");
const { authCheck } = require("../../middlewares");
const {
    leave_middleware
} = require("../../middlewares")

router.post("/leaves/add-leave", [authCheck.verifyToken], leave.add);
router.post("/leaves/edit-leave", [authCheck.verifyToken], leave.edit);
router.get("/leaves/get-all", [authCheck.verifyToken],  leave.findEmployeeAll);
router.post("/leaves/show-my-leave", [authCheck.verifyToken],  leave.findOne);
router.post("/leaves/show-leave-info", [authCheck.verifyToken], leave.findAll);
router.post("/leaves/approve-leave", [authCheck.verifyToken],  leave.approveLeave);
router.post("/leaves/comment-leave", [authCheck.verifyToken],  leave.commentLeave);
router.post("/leaves/reject-leave", [authCheck.verifyToken],  leave.rejectLeave);



module.exports = router;