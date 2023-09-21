const dotenv = require("dotenv");
const fop = require("../../middlewares/file_processing");
dotenv.config();
const db = require("../../models");
const path = require("path");
const Op = db.Sequelize.Op;
const uid = require('uuid');
const file_names_generating_code = "abcdefghijklmnopqrstuvwxyz0123456789";

const bank = db.bank;
const bank_info=db.bank_details

function file_codegenerator(length) {
    let result = "";
    const characterLength = file_names_generating_code.length;
    for (let i = 0; i < length; i++) {
        result += file_names_generating_code.charAt(Math.floor(Math.random() * characterLength));
    }
    return result;
}  




exports.addBankInfo = (req, res) => {
    // return console.log('bank details are ',req.body,req.files)
 
     const card_copy = req.files.card_copy;
     const extensionName = path.extname(card_copy.name);
     const allowedExtension = [".png",".jpg","jpeg",".webp"];
     const file_abrev = "bnk-";
     const personal_folder=req.body.personal_folder;
     const bank_id = req.body.bank_id;
     const employee = req.body.employee_id;
     const account_no = req.body.account_number;
     const account_name=req.body.account_name;
     const employee_folder_path = process.env.employee_directory_path;
     if (!req.files || Object.keys(req.files).length === 0) {
         return res.status(400).send({
           message: "No files were uploaded.",
         });
       } else if (!allowedExtension.includes(extensionName)) {
         return res.status(422).send({
           message: "Invalid File | check your File format",
         });
       } else {
         bank_info.create({
             bank_id:bank_id,
             employee_id:employee,
             account_name:account_name,
             account_number:account_no,
             card_copy:file_abrev + file_codegenerator(6).result + extensionName,
             status:'UNVERIFIED',
             uid:uid.v4(),
         }).then((data) => {
             
             const file_path = employee_folder_path + personal_folder;
             const filename = data.card_copy;
             fop.fileUploading(file_path,filename,card_copy);
             res.json({
                 message: data.account_name + " Successful Created"
             });
 
         }).catch((err) => {
             res.status(500).send({message: err.message});
         });
     }
 };
 
 
 exports.editBankInfo = (req, res) => {
     const id = req.body.id;
     const bank_id = req.body.bank_id;
     const employee = req.body.employee_id;
     const account_no = req.body.account_number;
     const card = req.body.card_copy;
     bank_info.findOne({
         where: {
             id: id
         }
     }).then((data) => {
         data.update({
             bank_id:bank_id,
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
     bank_info.findOne({
         where: {
             employee_id: id
         },
         include:[{
             model:bank
         }]
     }).then((data) => {
         res.status(200).send(data);
     }).catch((err) => {
         res.status(500).send({message: err.message});
     });
 };
 
 
 exports.findAllBankInfo = (req, res) => {
     bank_info.findAll({
         
         order: [
             ["account_name", "ASC"]
         ]
     }).then((data) => {
         res.status(200).send(data);
     }).catch((err) => {
         res.status(500).send({message: err.message});
     });
 };
 
 exports.activateBankInfo = (req, res) => {
     const id = req.body.id;
 
     bank_info.findOne({
         where: {
             id: id
         }
     }).then((data) => {
         data.update({status: true}).then((result) => {
             res.status(200).send({
                 message: data.name + " Successful activated"
             });
         })
     }).catch((err) => {
         res.status(500).send({message: err.message});
     });
 };
 
 exports.deactivateBankInfo = (req, res) => {
     const id = req.body.id;
 
     bank_info.findOne({
         where: {
             id: id
         }
     }).then((data) => {
         data.update({status: false}).then((result) => {
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