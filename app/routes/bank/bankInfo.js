const express = require("express");
const router = express.Router();
const { authCheck } = require("../../middlewares");
const controller = require("../../controllers/bank/bankInfo");

router.post("/bank-info/addBankInfo", controller.addBankInfo);
router.get("/bank-info/", [authCheck.verifyToken], controller.findAllBankInfo);
router.post("/bank-info/show", [authCheck.verifyToken], controller.findOneBanknfo);
router.post("/bank-info/editBankInfo", [authCheck.verifyToken], controller.editBankInfo);
router.post("/bank-info/activateBankInfo", [authCheck.verifyToken], controller.activateBankInfo);
router.post("/bank-info/deactivateBankInfo", [authCheck.verifyToken], controller.deactivateBankInfo);
router.get("/hrm-storage-files/employee/:d1r3c7095/:name", controller.download);
module.exports = router;
