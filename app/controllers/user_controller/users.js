const dotenv = require("dotenv");
const db = require("../../models");
const capitalize = require("../../../node_modules/capitalize-the-first-letter/capitalize");
const pass = require("../../config/password");
const mail = require("../../config/mail");
const uuid = require("uuid");
const querystring = require("querystring");
const qs = require("qs");
const path = require("path");
const users = db.users;
const role_user = db.role_user;
const roles = db.roles;
const organization = db.organization;
const axios = require("axios").default;
const fs = require("fs");
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const file_names_generating_code = "abcdefghijklmnopqrstuvwxyz0123456789";

function codegenerator(length) {
    let result = "";
    const characterLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characterLength));
    }
    return result;
  }
  
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





var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
//  return console.log('my results are ',req.files)

//   const birth_certificate = req.files.birth_certificate;
  const employee_passport = req.files.employee_passport;
  const passportExtensionName = path.extname(employee_passport.name);
  const allowedPassportExtension = [".png",".jpg","jpeg",".webp"];

  const birth_certificate = req.files.birth_certificate;
  const birthCertificateExtensionName = path.extname(birth_certificate.name);
  const allowedBirthCertificateExtension = [".pdf"];

  const employee_folder_path = process.env.employee_directory_path;
  const file_abreviation = "Emp-";
    const email = req.body.email;
    const region=req.body.region_id;
    const district_id=req.body.district_id;
    const marital_status = req.body.marital_status;
    const firstName=req.body.first_name;
    const lastName=req.body.last_name;
    const middleName=req.body.middle_name;
    const birthDate=req.body.birth_date;
    const gender=req.body.gender;
    const phone = req.body.phone_number;
    const national_id = req.body.national_id;
    const roles = req.body.roles;
    const created_by = req.body.created_by;
    const uid = uuid.v4();
    const today = new Date();
    const newDate = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000);
    const fullname=firstName+' '+middleName+' '+lastName;

    const tempPass = pass.passoword();
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({
          message: "No files were uploaded.",
        });
      } else if (!allowedPassportExtension.includes(passportExtensionName)||!allowedBirthCertificateExtension.includes(birthCertificateExtensionName)) {
        return res.status(422).send({
          message: "Invalid File | check your File format",
        });
      } else {
    users
    .create({

        
        uid: uid,
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        region_id:region,
        district_id:district_id,
        marital_status:marital_status,
        employee_passport:file_abreviation + file_codegenerator(6) + passportExtensionName,
        birth_certificate:file_abreviation + file_codegenerator(6) + birthCertificateExtensionName,
        // name: capitalize(fullname),
        name: fullname.toUpperCase(),
        email: email,
        phone_number: phone,
        national_id: national_id,
        password: bcrypt.hashSync(tempPass, 8),
        password_expiration_date: newDate,
        sex:gender,
        personal_folder:file_abreviation + codegenerator(8),
        birth_date: birthDate,
        account_non_locked: false,
        credential_non_expired: false,
        number_of_attempt: 0,
        first_login: true,
        active: true,
        created_by: created_by,
    })
    .then(user_info => {
        for (const key in roles) {
            const role_data = roles[key];
            role_user.create({
                role_id: role_data,
                userId: user_info.id,
            });
        }

        mail.transport.sendMail(mail.USER_SIGNUP_MAIL(user_info.email, user_info.name, tempPass), (error, info) => {
            if (error) {
                return res.status(200).json({
                    en_message: "Fail to send email to " + user_info.email + " but successful registered",
                    sw_message: "Imeshindwa kutuma barua pepe kwenda " + user_info.email + " usajili umekamilika",
                    data: user_info.uid,
                });
            }
            return res.status(200).json({
                en_message: user_info.name + " successful registered, Kindly check your email",
                sw_message: user_info.name + " amesajiliwa kikamilifu, angalia barua pepe yako",
                data: user_info.uid,
            });
        });
        const passport_file_path = employee_folder_path + user_info.personal_folder;
        const passport_filename = user_info.employee_passport;
        fs.mkdirSync(passport_file_path, { recursive: true });
        employee_passport.mv(path.join(passport_file_path, passport_filename), (err) => {
          if (err) {
            return res.status(500).send({
              message: "No such file or directory" + err,
            });
          }
        });

        const birthCertificate_file_path = employee_folder_path + user_info.personal_folder;;
        const birthCertificate_filename = user_info.birth_certificate;
        fs.mkdirSync(birthCertificate_file_path, { recursive: true });
        birth_certificate.mv(path.join(birthCertificate_file_path, birthCertificate_filename), (err) => {
          if (err) {
            return res.status(500).send({
              message: "No such file or directory" + err,
            });
          }
        });
        res.json({
          message:'Birth Certificate '+" Successful Added",
        });

    })
    .catch((err) => {
        res.status(500).send({
            message: err,
            'code': 0
        });
    });
       

    }
    

};

exports.findOneOnly = (req, res) => {

     //return console.log('data are ',req.params.id)
    const uid = req.params.id;
    users
        .findOne({
            where: {
                uid: uid
            },
            include: [{
                model: role_user,
                attributes: ["role_id"],
                include: {
                    model: roles,
                },
            }, ],
        })
        
        .then(data => {
             const today_date=new Date();
             const birtdate=data.birth_date;
             const date_diff=Math.abs(today_date.getTime() - birtdate.getTime());
             const age=Math.ceil(date_diff/( (1000 * 3600 * 24*366)))
             const combined_data={data,age}
                    res.status(200).json({
                        en_message: "User details found",
                        sw_message: "Employee Details",
                        data: combined_data
                    });
        })

    .catch(err => {
        res.status(500).json({
            en_message: err.message,
            sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadae",
        });
    });
};

exports.findOne = (req, res) => {
    const uid = req.body.uid;
    users
        .findOne({
            where: {
                uid: uid,
            },
            include: [{
                model: role_user,
                attributes: ["role_id"],
                include: {
                    model: roles,
                },
            }, ],
        })
        .then(data => {
            organization
                .findOne({
                    where: {
                        code: data.organization_code,
                    },
                })
                .then(organization => {
                    res.status(200).json({
                        en_message: "User details found",
                        sw_message: "Employee Details",
                        data: data,
                        organization: organization,
                    });
                });
        })

    .catch(err => {
        res.status(500).json({
            en_message: "Something went wrong, Kindly try again",
            sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadaeeeeeeeeee",
        });
    });
};

exports.organization_users_list = (req, res) => {
    const code = req.body.organization_code;
    users
        .findAll({
            where: {
                organization_code: code,
            },
        })
        .then(data => {
            res.status(200).json({
                en_message: "Users list found",
                sw_message: "Employee List imepatikana",
                data: data,
            });
        })
        .catch(err => {
            res.status(500).json({
                en_message: "Something went wrong, Kindly try again",
                sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadaessssssss",
            });
        });
};


exports.getAllUsers = (req, res) => {
    const code = req.body.organization_code;
    users
        .findAll()
        .then(data => {
            res.status(200).json({
                en_message: "Users list found",
                sw_message: "Employee List imepatikana",
                data: data,
            });
        })
        .catch(err => {
            res.status(500).json({
                en_message: "Something went wrong, Kindly try again",
                sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadaesz",
            });
        });
};


exports.userList = (req, res) => {
    const id = req.body.id;

    users
        .findOne({
            where: {
                id: id,
            },
            attributes: ["organization_code"],
        })
        .then(info => {
            // return res.status(200).json(info);
            users
                .findAll({
                    where: {
                        organization_code: info.organization_code,
                    },
                    attributes: ["uid", "name", "email", "designation", "active"],
                })
                .then(data => {
                    res.status(200).json({
                        en_message: "Users list found",
                        sw_message: "Employee List imepatikana",
                        data: data,
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        en_message: "Fail to identify organization users",
                        sw_message: "Imeshindwa kutambua watumiaji wa Taasisi/Wizara husika",
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                en_message: "Something went wrong, Kindly try again",
                sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadae",
            });
        });
};

exports.edit = (req, res, next) => {
    const uid = req.body.uid;
    const email = req.body.email;
    const phone = req.body.phone_number;
    const roles = req.body.roles;

    users
        .findOne({
            where: {
                uid: uid,
            },
        })
        .then(data => {
            data
                .update({
                    email: email,
                    phone_number: phone,
                })
                .then(() => {
                    req.name = data.name;
                    req.email = email;
                    req.phone = phone;
                    next();
                })
                .catch(err => {
                    res.status(500).json({
                        en_message: "Fail to update " + data.name + " details",
                        sw_message: " Imeshindwa kubadili taarifa za " + data.name,
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                en_message: "Something went wrong, Kindly try again",
                sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadae",
            });
        });
};

exports.activate = (req, res) => {
    const uid = req.body.uid;
    users
        .findOne({
            where: {
                id: uid,
            },
        })
        .then(data => {
            data.update({
                active: true,
            });
            res.status(200).json({
                en_message: data.name + " Successful activated",
                sw_message: data.name + " Ameruhusiwa kikamilifu",
            });
        })
        .catch(err => {
            res.status(500).json({
                en_message: "Something went wrong, Kindly try again",
                sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadae",
            });
        });
};



exports.countMyEmployee = (req, res) => {
        users.count()
          .then((totalData) => {
            res.json(totalData);
          })
          .catch(err => {
            res.status(500).send({
              message: err.message || "error while Retrieving Total Employee"
            });
          });
  };


exports.deactivate = (req, res) => {
    
    const uid = req.body.uid;
    users
        .findOne({
            where: {
                id: uid,
            },
        })
        .then(data => {
            data.update({
                active: false,
            });
            res.status(200).json({
                en_message: data.name + " Successful deactivated",
                sw_message: data.name + " Amezuiliwa kikamilifu",
            });
        })
        .catch(err => {
            res.status(500).json({
                en_message: "Something went wrong, Kindly try again",
                sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadae DGDD",
            });
        });
};

exports.myProfile = (req, res) => {
    const id = req.body.id;
    users
        .findOne({
            where: {
                id: id,
            },
            include: [{
                model: role_user,
                attributes: ["role_id"],
                include: {
                    model: roles,
                },
            }, ],
        })
        .then(data => {
            organization
                .findOne({
                    where: {
                        code: data.organization_code,
                    },
                })
                .then(organization => {
                    res.status(200).json({
                        en_message: "User details found",
                        sw_message: "Employee Details",
                        data: {
                            data,
                            organization,
                        },
                    });
                });
        })

    .catch(err => {
        res.status(500).json({
            en_message: "Something went wrong, Kindly try again",
            sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadaeMMM",
        });
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