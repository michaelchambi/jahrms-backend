const dotenv = require("dotenv");
dotenv.config();
const fop = require("../../../middlewares/file_processing");
const db = require("../../../models");
const Op = db.Sequelize.Op;
const uid = require("uuid");
const path = require("path");
const marital_status = db.marital_status;
const spouse = db.spouse;
const user = db.users;
const file_names_generating_code = "abcdefghijklmnopqrstuvwxyz0123456789";

function file_codegenerator(length) {
    let result = "";
    const characterLength = file_names_generating_code.length;
    for (let i = 0; i < length; i++) {
        result += file_names_generating_code.charAt(
            Math.floor(Math.random() * characterLength)
        );
    }
    return result;
}

exports.addMaritalStatus = (req, res) => {
    const file_abrev = "mrg-";
    const status_name = req.body.status_name;
    const employee_id = req.body.employee_id;
    const spouse_name = req.body.spouse_name;
    const spouse_nida = req.body.spouse_nida;
    const marriage_date = req.body.marriage_date;
    const user_id = req.body.user_id;
    if (status_name == "SINGLE") {
        // return console.log('data are FOR SINGLE SELECTION',req.body)
        if (!req.body.status_name) {
            return res.status(400).send({ message: "Spouse name has not filled." });
        } else {
            marital_status
                .create({
                    employee_id: employee_id,
                    status_name: status_name,
                    uid: uid.v4(),
                    info_approval: "UNVERIFIED",
                })
                .then((marital_data) => {
                    res.json({
                        message: marital_data.status_name + " Successful Created",
                    });
                })
                .catch((err) => {
                    res.status(500).send({ message: err.errors });
                });
        }
    } else if (status_name == "MARRIED") {
        // return console.log('data are FOR MARRIED SELECTION', req.body, req.files)
        if (!req.body.status_name) {
            return res.status(400).send({ message: "Spouse name has not filled." });
        } else {
            const marriage_certificate = req.files.proof_attachment;
            const extensionName = path.extname(marriage_certificate.name);
            const employee_folder_path = process.env.employee_directory_path;
            const allowedExtension = [".pdf"];
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send({
                    message: "No files were uploaded.",
                });
            } else if (!allowedExtension.includes(extensionName)) {
                return res.status(422).send({
                    message: "Invalid File | check your File format",
                });
            } else {
                user
                    .findOne({
                        where: { id: employee_id },
                    })
                    .then((employee_details) => {
                        spouse
                            .create({
                                employee_id: employee_id,
                                spouse_name: spouse_name,
                                spouse_nida: spouse_nida,
                                uid: uid.v4(),
                                marriage_date:marriage_date,
                                spouse_status: true,
                                marriage_certificate:
                                    file_abrev + file_codegenerator(6).result + extensionName,
                            })
                            .then((spouse_data) => {
                                marital_status
                                    .create({
                                        spouse_id: spouse_data.id,
                                        employee_id: employee_id,
                                        status_name: status_name,
                                        info_approval: "UNVERIFIED",
                                        uid: uid.v4(),
                                    })
                                    .then((marital_data) => {
                                        const file_path =
                                            employee_folder_path + employee_details.personal_folder;
                                        const filename = spouse_data.marriage_certificate;
                                        fop.fileUploading(
                                            file_path,
                                            filename,
                                            marriage_certificate
                                        );
                                        res.json({
                                            message: marital_data.status_name + " Successful Created",
                                        });
                                    })
                                    .catch((err) => {
                                        res.status(500).send({ message: err.message });
                                    });
                            });
                    })
                    .catch((err) => {
                        res.status(500).send({ message: err.message });
                    });
            }
        }
    } else if (status_name == "DIVORCED") {
        return console.log("data are FOR DIVORCED SELECTION", req.body, req.files);
        if (!req.body.status_name) {
            return res.status(400).send({ message: "Spouse name has not filled." });
        } else {
            
            spouse
                .create({
                    spouse_id: spouse_data.id,
                                        employee_id: employee_id,
                                        status_name: status_name,
                                        info_approval: "UNVERIFIED",
                                        uid: uid.v4(),
                })
                .then((data) => {
                    marital_status
                        .create({
                            spouse_id: data.id,
                            employee_id: employee_id,
                            status_name: status_name,
                            uid: uid.v4(),
                        })
                        .then((marital_data) => {
                            res.json({
                                message: marital_data.status_name + " Successful Created",
                            });
                        })
                        .catch((err) => {
                            res.status(500).send({ message: err.errors });
                        });
                })
                .catch((err) => {
                    res.status(500).send({ message: err.errors });
                });
        }
    }
};

exports.editMaritalStatus = (req, res) => {
    const id = req.body.id;
    const marital_status_name = req.body.status_name;
    const employee_id = req.body.employee_id;
    const user_id = req.body.user_id;
    marital_status
        .findOne({
            where: {
                id: id,
            },
        })
        .then((data) => {
            data
                .update({
                    user_id: user_id,
                    employee_id: employee_id,
                    marital_status_name: marital_status_name,
                    uid: uid.v4(),
                })
                .then((result) => {
                    res.status(200).send({
                        message: result.name + " Successful Updated",
                    });
                });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.findOne = (req, res) => {
    //return console.log('the id is ',req.body);
    const id = req.body.id;
    
    marital_status
        .findOne({
            where: {
                employee_id: id,
            },
            include:[{model:spouse}]
        })
        .then((data) => {
            
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.findAll = (req, res) => {
    marital_status
        .findAll({
            // where: {
            // status:1
            // },
            order: [["name", "ASC"]],
        })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.activate = (req, res) => {
    const id = req.body.id;
    const approver = req.body.approver_id;
    marital_status
        .findOne({
            where: {
                id: id,
            },
        })
        .then((data) => {
            data
                .update({ info_approval: "VERIFIED", approver_id: approver })
                .then((result) => {
                    res.status(200).send({ message: " Successful Verifeid" });
                });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.deactivate = (req, res) => {
    const id = req.body.id;

    marital_status
        .findOne({
            where: {
                id: id,
            },
        })
        .then((data) => {
            data.update({ marital_status_status: false }).then((result) => {
                res.status(200).send({
                    message: data.name + " Successful deactivated",
                });
            });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};
