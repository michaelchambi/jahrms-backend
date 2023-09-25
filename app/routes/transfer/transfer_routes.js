const express = require('express');
const router = express.Router();
const transfer = require("../../controllers/transfer/transfer_controller");
const { authCheck } = require("../../middlewares");
const {
    transfer_middleware
} = require("../../middlewares")

router.post("/transfers/add-transfer", [authCheck.verifyToken], transfer.add);
router.post("/transfers/edit-transfer", [authCheck.verifyToken], transfer.edit);
router.get("/transfers/get-all", [authCheck.verifyToken],  transfer.findEmployeeAll);
router.post("/transfers/show-my-transfer", [authCheck.verifyToken],  transfer.findOne);
router.post("/transfers/show-transfer-info", [authCheck.verifyToken], transfer.findAll);
router.post("/transfers/approve-transfer", [authCheck.verifyToken],  transfer.approveTransfer);
router.post("/transfers/comment-transfer", [authCheck.verifyToken],  transfer.commentTransfer);
router.post("/transfers/reject-transfer", [authCheck.verifyToken],  transfer.rejectTransfer);
router.post("/transfers/admini-employee-transfer", [authCheck.verifyToken],  transfer.transferEmployee);




module.exports = router;