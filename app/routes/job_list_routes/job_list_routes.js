const express = require('express');
const router = express.Router();
const api_job_list = require("../../controllers/job_list_controller/job_list_controller");
const main_job_list = require("../../controllers/job_list_controller/main_post_controller")
const directorate = require("../../controllers/job_list_controller/directorate")
const { authCheck } = require("../../middlewares");
const {
    leave_middleware
} = require("../../middlewares")

router.post("/job_lists/add-job_lists", [authCheck.verifyToken], api_job_list.add);
router.post("/job_lists/edit-job-lists", [authCheck.verifyToken], api_job_list.edit);
router.get("/job_lists/get-all", [authCheck.verifyToken],  api_job_list.findAll);
  
// job_lists/editjob_lists/c53d2011-81d1-4ef6-a1f5-9d3b0a4432f5




router.get("/job_lists/get-all/approved", [authCheck.verifyToken],  api_job_list.findAllApproved); 
router.get("/job_lists/get-all/returned", [authCheck.verifyToken],  api_job_list.findAllReturned);
router.get("/job_lists/get-all/suppervised", [authCheck.verifyToken],  api_job_list.findAllSuppervised);
router.post("/job_lists/show-job_lists-info", [authCheck.verifyToken],  api_job_list.findOne);
router.post("/job_lists/approve-job_lists", [authCheck.verifyToken],  api_job_list.submitJobList);
router.post("/job_lists/supporvisor-job_lists", [authCheck.verifyToken],  api_job_list.supporvisor);
router.post("/job_lists/approver-job_lists", [authCheck.verifyToken],  api_job_list.approverDirectorate);
router.post("/job_lists/reject-job_lists", [authCheck.verifyToken],  api_job_list.return);
router.get("/job_lists/get-all/job-list", [authCheck.verifyToken],  api_job_list.findAllJOTJobList); 



router.post("/job_lists/add-job_lists/main", [authCheck.verifyToken], main_job_list.add);
router.post("/job_lists/edit-job-lists/main", [authCheck.verifyToken], api_job_list.edit);
router.get("/job_lists/get-all/main", [authCheck.verifyToken],  main_job_list.findAll);
router.get("/job_lists/get-all/main-approved", [authCheck.verifyToken],  main_job_list.findAllApproved);
router.get("/job_lists/get-all/main-returned", [authCheck.verifyToken],  main_job_list.findAllReturned);
router.get("/job_lists/get-all/main-suppervised", [authCheck.verifyToken],  main_job_list.findAllSuppervised);
router.post("/job_lists/show-job_lists-info/main", [authCheck.verifyToken],  main_job_list.findOne);
router.post("/job_lists/approve-job_lists/main", [authCheck.verifyToken],  main_job_list.submitJobList);
router.post("/job_lists/supporvisor-job_lists/main", [authCheck.verifyToken],  main_job_list.supporvisor);
router.post("/job_lists/approver-job_lists/main", [authCheck.verifyToken],  main_job_list.approver);
router.post("/job_lists/reject-job_lists/main", [authCheck.verifyToken],  main_job_list.return);


router.post("/job_lists/add-job_lists/directorate", [authCheck.verifyToken], directorate.add);
router.post("/job_lists/edit-job-lists/directorate", [authCheck.verifyToken], directorate.edit);
router.get("/job_lists/get-all/directorate", [authCheck.verifyToken],  directorate.findAll);
router.get("/job_lists/get-all/directorate-approved", [authCheck.verifyToken],  directorate.findAllApproved);
router.post("/job_lists/show-job_lists-info/directorate", [authCheck.verifyToken],  directorate.findOne);
router.post("/job_lists/approve-job_lists/directorate", [authCheck.verifyToken],  directorate.submitJobList);
router.post("/job_lists/approver-job_lists/directorate", [authCheck.verifyToken],  directorate.approver);
router.post("/job_lists/reject-job_lists/directorate", [authCheck.verifyToken],  directorate.return);


router.get("/job_lists/count-job_lists", [authCheck.verifyToken],  directorate.count_directorate);


module.exports = router;

