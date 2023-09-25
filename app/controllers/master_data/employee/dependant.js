const dotenv = require("dotenv");
const fop = require("../../../middlewares/file_processing");
dotenv.config();
const db = require("../../../models");
const path = require("path");
const Op = db.Sequelize.Op;
const uid = require('uuid');
const file_names_generating_code = "abcdefghijklmnopqrstuvwxyz0123456789";

const dependant_type = db.dependant_type;
const dependantInfo=db.dependant_details
const users=db.users;


exports.addDependant = (req, res) => {
    // return console.log('dependant details are ',req.body)
     const relation_id = req.body.relation_id;
     const employee = req.body.employee_id;
     const birth_certificate_number = req.body.birth_certificate_number;
     const birth_date=req.body.birth_date;
     const first_name=req.body.first_name;
     const middle_name=req.body.middle_name;
     const last_name=req.body.last_name;
     
         dependantInfo.create({
            employee_id:employee,
            dependant_type_id:relation_id,
            first_name:first_name,
            middle_name:middle_name,
            last_name:last_name,
            birth_certificate_number:birth_certificate_number,
            birth_date:birth_date,
             status:'UNVERIFIED',
             uid:uid.v4(),
         }).then((data) => {
             res.json({
                 message: data.first_name + " Successful Created"
             });
 
         }).catch((err) => {
             res.status(500).send({message: err.message});
         });
     
 };
 
 
 exports.editDependant = (req, res) => {
     const id = req.body.id;
     const employee_id = req.body.employee_id;
     const employee = req.body.employee_id;
     const account_no = req.body.account_number;
     const card = req.body.card_copy;
     dependantInfo.findOne({
         where: {
             id: id
         }
     }).then((data) => {
         data.update({
             employee_id:employee_id,
             employee_id:employee,
             account_name:account_name,
             account_number:account_no,
             card_copy:card,
             status:'UNIVERIFIED',
             uid:uid.v4(),
           })
            .then((result) => {
             res.status(200).send({
                 message: result.account_name + " Successful Updated"
             });
         })
     }).catch((err) => {
         res.status(500).send({message: err.message});
     });
 };
 
 
 exports.findOneBanknfo = (req, res) => {
     const id = req.body.id;
     dependantInfo.findOne({
         where: {
             employee_id: id
         },
         include:[{
             model:users
         }]
     }).then((data) => {
         res.status(200).send(data);
     }).catch((err) => {
         res.status(500).send({message: err.message});
     });
 };
 
 
 exports.findAllDependant = (req, res) => {
     dependantInfo.findAll({
         include:[{model:dependant_type}],
         order: [
             ["first_name", "ASC"]
         ]
     }).then((data) => {
         res.status(200).send(data);
     }).catch((err) => {
         res.status(500).send({message: err.message});
     });
 };
 
 exports.activateDependant = (req, res) => {
     const id = req.body.id;
 
     dependantInfo.findOne({
         where: {
             id: id
         }
     }).then((data) => {
         data.update({status:'VERIFIED'}).then((result) => {
             res.status(200).send({
                 message: data.name + " Successful activated"
             });
         })
     }).catch((err) => {
         res.status(500).send({message: err.message});
     });
 };
 
 exports.deactivateDependant = (req, res) => {
     const id = req.body.id;
 
     dependantInfo.findOne({
         where: {
             id: id
         }
     }).then((data) => {
         data.update({status: 'UNVERIFIED'}).then((result) => {
             res.status(200).send({
                 message: data.name+ " Successful deactivated"
             });
         })
     }).catch((err) => {
         res.status(500).send({message: err.message});
     });
 };
 
 exports.download = (req, res) => {
     const employeefolder = req.params.d1r3c7095;
     const fileName = req.params.name;
     const directoryPath = "../../../STORAGES/hrm-storage-files/employee/";
     res.download(
       directoryPath + employeefolder + "/" + fileName,
       fileName,
       (err) => {
         if (err) {
           res.status(500).send({
             message: "Could not download the file. " + err,
           });
         }
       }
     );
   };