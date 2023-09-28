const dotenv = require("dotenv");
const db = require("../../../models");
const path = require("path");
const Op = db.Sequelize.Op;
const uid = require('uuid');
const fop = require("../../../middlewares/file_processing");
const education_details = db.education_details
const users = db.users;
const education_level = db.education_level;
const institution=db.academic_institution;
const specialization=db.academic_specialization;

const axios = require("axios").default;
const fs = require("fs");
const file_names_generating_code = "abcdefghijklmnopqrstuvwxyz0123456789";
dotenv.config();


function file_codegenerator(length) {
    let result = "";
    const characterLength = file_names_generating_code.length;
    for (let i = 0; i < length; i++) {
        result += file_names_generating_code.charAt(Math.floor(Math.random() * characterLength));
    }
    return result;
}


exports.addEducationDetails = (req, res) => {
     //return console.log('data received are ',req.body,req.files)
    const certificate_attachment = req.files.certificate_attachment;
    const certificateAttachmentExtensionName = path.extname(certificate_attachment.name);
    const allowedCertificateExtension = [".pdf"];

    const transcript_attachment = req.files.transcript_attachment;
    const transcriptAttachmentExtensionName = path.extname(transcript_attachment.name);
    const allowedTranscriptExtension = [".pdf"];

    const employee_folder_path = process.env.employee_directory_path;
    const file_abreviation = "Edu-";
    const level_id=req.body.level_id;
    const index_number = req.body.index_number;
    const personal_folder = req.body.employee_folder;
    const specialization_id = req.body.specialization_id;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const institution_id = req.body.institution_id;
    const result = req.body.result;
    // const roles = parseInt(req.body.roles);
    const user_id = req.body.user_id;
    const employee_id = req.body.employee_id;
    if (!req.body.index_number) {
        return res.status(400).send({
            message: "Check Number name has not filled."
        });

    } else {

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send({
                message: "No files were uploaded."
            });
        } else if (!allowedCertificateExtension.includes(certificateAttachmentExtensionName) || !allowedTranscriptExtension.includes(transcriptAttachmentExtensionName)) {
            return res.status(422).send({
                message: "Invalid File | check your File format"
            });
        } else {


            education_details
                .create({
                    created_by_id: user_id,
                    employee_id: employee_id,
                    education_level_id:level_id,
                    index_number: index_number,
                    specialization_id: specialization_id,
                    institution_id:institution_id,
                    start_date: start_date,
                    end_date: end_date,
                    completion_date: end_date,
                    certificate_attachment: file_abreviation + file_codegenerator(6) + certificateAttachmentExtensionName,
                    transcript_attachment: file_abreviation + file_codegenerator(6) + transcriptAttachmentExtensionName,
                    result: result,
                    uid: uid.v4(),
                    status: true
                })
                .then(education_info => {
                    const certificate_attachment_path = employee_folder_path + personal_folder;
                    const certificate_filename = education_info.certificate_attachment;
                    fop.fileUploading(certificate_attachment_path,certificate_filename,certificate_attachment);
                   

                    const transcript_attachment_file_path = employee_folder_path + personal_folder;;
                    const transcript_filename = education_info.transcript_attachment;
                    fop.fileUploading(transcript_attachment_file_path,transcript_filename,transcript_attachment);
                    res.json({message:"Education Details Successful Added"});
        
                })
                .catch((err) => {
                    res.status(500).send({
                        message: err.message,
                        'code': 0
                    });
                });


        }


    }
};


exports.editEducationDetails = (req, res) => {
    const id = req.body.id;
    const certificate_attachment = req.files.certificate_attachment;
    const certificateAttachmentExtensionName = path.extname(certificate_attachment.name);
    const allowedCertificateExtension = [".pdf"];

    const transcript_attachment = req.files.transcript_attachment;
    const transcriptAttachmentExtensionName = path.extname(transcript_attachment.name);
    const allowedTranscriptExtension = [".pdf"];

    const employee_folder_path = process.env.employee_directory_path;
    const file_abreviation = "Edu-";
    const level_id=req.body.level_id;
    const index_number = req.body.index_number;
    const personal_folder = req.body.personal_folder;
    const specialization_id = req.body.specialization_id;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const institution_id = req.body.institution_id;
    const result = req.body.result;
    const user_id = req.body.user_id;
    const employee_id = req.body.employee_id;
    if (!req.body.index_number) {
        return res.status(400).send({
            message: "Check Number name has not filled."
        });

    } else {

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send({
                message: "No files were uploaded."
            });
        } else if (!allowedCertificateExtension.includes(certificateAttachmentExtensionName) || !allowedTranscriptExtension.includes(transcriptAttachmentExtensionName)) {
            return res.status(422).send({
                message: "Invalid File | check your File format"
            });
        } else {
    education_details.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
            created_by_id: user_id,
                    employee_id: employee_id,
                    education_level_id:level_id,
                    index_number: index_number,
                    specialization_id: specialization_id,
                    institution_id:institution_id,
                    start_date: start_date,
                    completion_date: end_date,
                    certificate_attachment: file_abreviation + file_codegenerator(6) + certificateAttachmentExtensionName,
                    transcript_attachment: file_abreviation + file_codegenerator(6) + transcriptAttachmentExtensionName,
                    result:result,
                    uid: uid.v4(),
                    status: true
        }).then((result) => {
            const certificate_attachment_path = employee_folder_path + personal_folder;
            const certificate_attachment = education_info.certificate_attachment;
            fs.mkdirSync(certificate_attachment_path, {
                recursive: true
            });
            certificate_attachment.mv(path.join(certificate_attachment_path, certificate_attachment), (err) => {
                if (err) {
                    return res.status(500).send({
                        message: "No such file or directory" + err,
                    });
                }
            });

            const transcript_attachment_file_path = employee_folder_path + personal_folder;;
            const transcript_attachment_filename = education_info.transcript_attachment;
            fs.mkdirSync(transcript_attachment_file_path, {
                recursive: true
            });
            transcript_attachment.mv(path.join(transcript_attachment_file_path, transcript_attachment_filename), (err) => {
                if (err) {
                    return res.status(500).send({
                        message: "No such file or directory" + err,
                    });
                }
            });
            res.json({
                message: 'Education Details Added Successfully',
            });
           
        })
    }).catch((err) => {
        res.status(500).send({
            message: err.message
        });
    });
}}
};


exports.findOne = (req, res) => {
    const id = req.body.id;
    // return console.log('the id is ',id);
    education_details.findOne({
        where: {
            employee_id: id
        }
    }).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message
        });
    });
};


exports.findAll = (req, res) => {
    education_details.findAll({
        include:[
            {
                model:education_level},
                    {model:specialization},
                {model:institution,
               
            }],
        // where: {
        // status:1
        // },
        order: [
            ["updatedAt", "ASC"]
        ]
    }).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message
        });
    });
};


exports.activate = (req, res) => {
    const id = req.body.id;

    education_details.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
            status: true
        }).then((result) => {
            res.status(200).send({
                message: data.name + " Successful activated"
            });
        })
    }).catch((err) => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.deactivate = (req, res) => {
    const id = req.body.id;

    education_details.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
            status: false
        }).then((result) => {
            res.status(200).send({
                message: data.name + " Successful deactivated"
            });
        })
    }).catch((err) => {
        res.status(500).send({
            message: err.message
        });
    });
};