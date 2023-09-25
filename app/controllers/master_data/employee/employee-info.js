const dotenv = require("dotenv");
const db = require("../../../models");
<<<<<<< HEAD
// var jwt = require("jsonwebtoken");
// var bcrypt = require("bcryptjs");
// const capitalize = require("../../../../node_modules/capitalize-the-first-letter/capitalize");
// const pass = require("../../../config/password");
// const mail = require("../../../config/mail");
// const uuid = require("uuid");
// const querystring = require("querystring");
// const qs = require("qs");
=======
>>>>>>> michael-backend
const path = require("path");
const Op = db.Sequelize.Op;
const uid = require('uuid');
const employment_inf = db.employment_details
const users = db.users;
const designation_change=db.api_change_designation
const staff_profile = db.api_staff_profile;
const designation_history = db.designation_history;
const station_details = db.working_station_details;
<<<<<<< HEAD
// const bank_details = db.bank_details;
// const role_user = db.role_user;
=======
>>>>>>> michael-backend
const roles = db.roles;
const axios = require("axios").default;
const fs = require("fs");
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const file_names_generating_code = "abcdefghijklmnopqrstuvwxyz0123456789";
dotenv.config();

// function codegenerator(length) {
//     let result = "";
//     const characterLength = characters.length;
//     for (let i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * characterLength));
//     }
//     return result;
// }

function file_codegenerator(length) {
    let result = "";
    const characterLength = file_names_generating_code.length;
    for (let i = 0; i < length; i++) {
        result += file_names_generating_code.charAt(Math.floor(Math.random() * characterLength));
    }
    return result;
}


exports.addEmploymentInfo = (req, res) => {
    // return console.log('data received are ',req.body,req.files)
    const hired_letter = req.files.hired_latter;
    const hired_letterNameExtensionName = path.extname(hired_letter.name);
    const allowedhired_latterExtension = [".pdf"];

    const confirmation_letter = req.files.confirmation_letter;
    const confirmation_letterExtensionName = path.extname(confirmation_letter.name);
    const allowedBirthCertificateExtension = [".pdf"];

    const employee_folder_path = process.env.employee_directory_path;
    const file_abreviation = "Emp-";
    const designation_change_id=req.body.designation_change_id;
    const check_numbers = req.body.check_number;
    const personal_folder = req.body.personal_folder;
    const pf_numbers = req.body.pf_number;
    const hiring_date = req.body.hired_date;
    const confirmation_date = req.body.confirmation_date;
    const designation = req.body.designation_id;
    // const roles = parseInt(req.body.roles);
    const user_id = req.body.user_id;
    const employee_id = req.body.employee_id;
    if (!req.body.check_number) {
        return res.status(400).send({
            message: "Check Number name has not filled."
        });

    } else {

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send({
                message: "No files were uploaded."
            });
        } else if (!allowedhired_latterExtension.includes(hired_letterNameExtensionName) || !allowedBirthCertificateExtension.includes(confirmation_letterExtensionName)) {
            return res.status(422).send({
                message: "Invalid File | check your File format"
            });
        } else {


            employment_inf
                .create({
                    created_by_id: user_id,
                    employee_id: employee_id,
                    designation_id: designation,
                    check_number: check_numbers,
                    pf_number: pf_numbers,
                    confirmation_date: confirmation_date,
                    designation_change_id:designation_change_id,
                    hired_date: hiring_date,
                    hiring_latter: file_abreviation + file_codegenerator(6) + hired_letterNameExtensionName,
                    confirmation_date: confirmation_date,
                    confirmation_latter: file_abreviation + file_codegenerator(6) + confirmation_letterExtensionName,
                    completion_status: 'COMPLETE',
                    uid: uid.v4(),
                    active: true
                })
                .then(user_info => {
<<<<<<< HEAD
                    staff_profile.create({
                        employee_id: employee_id,
                        registrar_id:user_id,
                        designation_id: designation,
                        completion_status: 'INCOMPLETE'
                    })
                    designation_history.create({
                        designation_id: designation,
                        employee_id: employee_id,
                        Assignment_date: hiring_date,
                        registrar_id: user_id,
                        uid: uid.v4(),
                        status: 'COMPLETE',
=======
                    designation_change.findOne({ 
                        where:{change_designation_reason_abbreviation:'NEW'}
>>>>>>> michael-backend
                    })
                    .then((change_designation_data)=>{
                        staff_profile.create({
                            employee_id: employee_id,
                            registrar_id:user_id,
                            change_designation_id:change_designation_data.id,
                            designation_id: designation,
                            completion_status: 'INCOMPLETE'
                        })
                        .then((staff_profile_Results)=>{
                            designation_history.create({
                                designation_id: staff_profile_Results.designation_id,
                                change_designation_id:staff_profile_Results.change_designation_id,
                                staff_profile_id: staff_profile_Results.id,
                                Assignment_date: hiring_date,
                                registrar_id: user_id,
                                uid: uid.v4(),
                                designation_status:'CURRENT',
                                status: 'COMPLETE',
                            })
                        })
                        station_details.create({
                            user_id: user_id,
                            employee_id: employee_id,
                            completion_status: 'INCOMPLETE',
                            uid: uid.v4()
                        })
                       
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message: err.message,
                            'code': 0
                        });
                    });

                 
                    const hiring_latter_path = employee_folder_path + personal_folder;
                    const first_employment_letter = user_info.hiring_latter;
                    fs.mkdirSync(hiring_latter_path, {
                        recursive: true
                    });
                    hired_letter.mv(path.join(hiring_latter_path, first_employment_letter), (err) => {
                        if (err) {
                            return res.status(500).send({
                                message: "No such file or directory" + err,
                            });
                        }
                    });

                    const confirmation_letter_file_path = employee_folder_path + personal_folder;;
                    const confirmation_letter_filename = user_info.confirmation_latter;
                    fs.mkdirSync(confirmation_letter_file_path, {
                        recursive: true
                    });
                    confirmation_letter.mv(path.join(confirmation_letter_file_path, confirmation_letter_filename), (err) => {
                        if (err) {
                            return res.status(500).send({
                                message: "No such file or directory" + err,
                            });
                        }
                    });
                    // for (const key in roles) {
                    //     const role_data = roles[key];
                    //     role_user.create({role_id: role_data, user_id:user_info.employee_id});
                    // }
                    res.json({
                        message: 'Employment Details Added' + " Successfully",
                    });

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


exports.editEmploymentInfo = (req, res) => {
    const id = req.body.id;
    const employment_inf_name = req.body.employment_inf_name;
    const description = req.body.leave_description;
    const user_id = req.body.user_id;
    employment_inf.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
            name: employment_inf_name,
            data_entry_personel_id: user_id,
            qualification_description: description,
            uid: uid.v4(),
            active: true
        }).then((result) => {
            res.status(200).send({
                message: result.name + " Successful Updated"
            });
        })
    }).catch((err) => {
        res.status(500).send({
            message: err.message
        });
    });
};


exports.findOne = (req, res) => {
    const id = req.body.id;
    // return console.log('the id is ',id);
    employment_inf.findOne({
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
    employment_inf.findAll({
        // where: {
        // status:1
        // },
        order: [
            ["name", "ASC"]
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

    employment_inf.findOne({
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

    employment_inf.findOne({
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