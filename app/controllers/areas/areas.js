const dotenv = require("dotenv");
const fop = require("../../middlewares/file_processing");
dotenv.config();
const db = require("../../models");
const path = require("path");
const Op = db.Sequelize.Op;
const uid = require('uuid');
const file_names_generating_code = "abcdefghijklmnopqrstuvwxyz0123456789";

const users = db.users;
const areas=db.areas;

function file_codegenerator(length) {
    let result = "";
    const characterLength = file_names_generating_code.length;
    for (let i = 0; i < length; i++) {
        result += file_names_generating_code.charAt(Math.floor(Math.random() * characterLength));
    }
    return result;
}  




exports.addAreas = (req, res) => {
   // return console.log('users details are ',req.body,req.files)
 
     const areas_attachment = req.files.areas_attachment;
     const extensionName = path.extname(areas_attachment.name);
     const allowedExtension = [".pdf"];
     const file_abrev = "AREAS-";
     const personal_folder=req.body.personal_folder;
     const description = req.body.description;
     const employee = req.body.employee_id;
     const expected_amount=req.body.expected_amount;
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
         areas.create({
            expected_amount:expected_amount,
            description:description,
             employee_id:employee,
             areas_attachment:file_abrev + file_codegenerator(6).result + extensionName,
             status:'AWAITING',
             uid:uid.v4(),
         }).then((data) => {
             
             const file_path = employee_folder_path + personal_folder;
             const filename = data.areas_attachment;
             fop.fileUploading(file_path,filename,areas_attachment);
             res.json({
                 message: data+"Areas Successful Created"
             });
 
         }).catch((err) => {
             res.status(500).send({message: err.message});
         });
     }
 };
 
 
 exports.editAreas = (req, res) => {
    const areas_attachment = req.files.areas_attachment;
    const extensionName = path.extname(areas_attachment.name);
    const allowedExtension = [".pdf"];
    const file_abrev = "bnk-";
    const personal_folder=req.body.personal_folder;
    const employee_folder_path = process.env.employee_directory_path;
     const id = req.body.id;
     const description = req.body.description;
     const employee = req.body.employee_id;
     const expected_amount=req.body.expected_amount;
     areas.findOne({
         where: {
             id: id
         }
     }).then((data) => {
         data.update({
            expected_amount:expected_amount,
            description:description,
             employee_id:employee,
             areas_attachment:file_abrev + file_codegenerator(6).result + extensionName,
             status:'AWAITING',
             uid:uid.v4(),
           })
            .then((result) => {
                const file_path = employee_folder_path + personal_folder;
                const filename = data.areas_attachment;
                fop.fileUploading(file_path,filename,areas_attachment);
                res.json({
                    message: data+"Areas Successful Created"
                });
    
            }).catch((err) => {
                res.status(500).send({message: err.message});
            });
         
     }).catch((err) => {
         res.status(500).send({message: err.message});
     });
 };
 
 
 exports.findOneAreas = (req, res) => {
     const id = req.body.id;
     areas.findAll({
        include:[{
            model:users
        }],
         where: {
             employee_id: id
         },
         
     }).then((data) => {
         res.status(200).send(data);
     }).catch((err) => {
         res.status(500).send({message: err.message});
     });
 };
 
 
 exports.findAllAreas = (req, res) => {
     areas.findAll({
         
        include:[{model:users}]
     }).then((data) => {
         res.status(200).send(data);
     }).catch((err) => {
         res.status(500).send({message: err.message});
     });
 };
 
 exports.activateAreas = (req, res) => {
     const id = req.body.id;
     const employee_id=req.body.employee_id;
     const actual_amount=req.body.actual_amount;
     areas.findOne({
         where: {
             id: id
         }
     }).then((data) => {
         data.update({
            status: 'ON PROGRESS',  
            completed_by_id:employee_id, 
            actual_amount:actual_amount,
        }).then((result) => {
             res.status(200).send({
                 message:" Successful activated"
             });
         })
     }).catch((err) => {
         res.status(500).send({message: err.message});
     });
 };
 
 exports.deactivateAreas = (req, res) => {
     const id = req.body.id;
     const employee_id=req.body.employee_id;
     areas.findOne({
         where: {
             id: id
         }
     }).then((data) => {
         data.update({status:'COMPLETED',completed_by_id:employee_id}).then((result) => {
             res.status(200).send({
                 message:  " Successful deactivated"
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