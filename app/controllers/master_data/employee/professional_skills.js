const dotenv = require("dotenv");
const fop = require("../../../middlewares/file_processing");
dotenv.config();
const db = require("../../../models");
const path = require("path");
const Op = db.Sequelize.Op;
const uid = require('uuid');
const file_names_generating_code = "abcdefghijklmnopqrstuvwxyz0123456789";

const professional_skills = db.professional_skill;
const professional=db.professional
const users=db.users;
function file_codegenerator(length) {
    let result = "";
    const characterLength = file_names_generating_code.length;
    for (let i = 0; i < length; i++) {
        result += file_names_generating_code.charAt(Math.floor(Math.random() * characterLength));
    }
    return result;
}  




exports.addProfessionalSkills= (req, res) => {
     //return console.log('professional_skills details are ',req.body,req.files)
 
     const professional_certificate = req.files.certificate_attachment;
     const extensionName = path.extname(professional_certificate.name);
     const allowedExtension = [".pdf"];

     const file_abrev = "pfc-";
     const personal_folder=req.body.personal_folder;
     const certification_id = req.body.professional_id;
     const employee = req.body.employee_id;
     const completion_date = req.body.completion_date;
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
        users.findOne({
            where:{
                id:employee
            }
        }).then((user_details)={
            
        })
         professional_skills.create({
             employee_id:employee,
             professional_id:certification_id,
             completion_date:completion_date,
           certificate_attachment:file_abrev + file_codegenerator(6).result + extensionName,
             status:true,
             uid:uid.v4(),
         }).then((data) => {
             
             const file_path = employee_folder_path + personal_folder;
             const filename = data.certificate_attachment;
             fop.fileUploading(file_path,filename,certificate_attachment);
             res.json({
                 message: data.account_name + " Successful Created"
             });
 
         }).catch((err) => {
             res.status(500).send({message: err.message});
         });
     }
 };
 
 
 exports.editProfessionalSkills= (req, res) => {
     const id = req.body.id;
     const professional_certificate = req.files.certificate_attachment;
     const extensionName = path.extname(professional_certificate.name);
     const allowedExtension = [".png",".jpg","jpeg",".webp"];

     const file_abrev = "pfc-";
     const personal_folder=req.body.personal_folder;
     const certification_id = req.body.professional_id;
     const employee = req.body.employee_id;
     const completion_date = req.body.completion_date;
     const employee_folder_path = process.env.employee_directory_path;
     professional_skills.findOne({
         where: {
             id: id
         }
     }).then((data) => {
         data.update({
            employee_id:employee,
            professional_id:certification_id,
            completion_date:completion_date,
          certificate_attachment:file_abrev + file_codegenerator(6).result + extensionName,
            status:true,
            uid:uid.v4(),
           })
            .then((result) => {
                const file_path = employee_folder_path + personal_folder;
                const filename = result.certificate_attachment;
                fop.fileUploading(file_path,filename,certificate_attachment);
             res.status(200).send({
                 message: result.account_name + " Successful Updated"
             });
         })
     }).catch((err) => {
         res.status(500).send({message: err.message});
     });
 };
 
 
 exports.findOneProfessionalSkills = (req, res) => {
     const id = req.body.id;
     professional_skills.findOne({
         where: {
             employee_id: id
         },
         include:[{
             model:professional_skills
         }]
     }).then((data) => {
         res.status(200).send(data);
     }).catch((err) => {
         res.status(500).send({message: err.message});
     });
 };
 
 
 exports.findAllProfessionalSkills= (req, res) => {
     professional_skills.findAll({
         
         order: [
             ["updatedAt", "ASC"]
         ]
     }).then((data) => {
         res.status(200).send(data);
     }).catch((err) => {
         res.status(500).send({message: err.message});
     });
 };
 
 exports.activateProfessionalSkills= (req, res) => {
     const id = req.body.id;
 
     professional_skills.findOne({
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
 
 exports.deactivateProfessionalSkills= (req, res) => {
     const id = req.body.id;
 
     professional_skills.findOne({
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