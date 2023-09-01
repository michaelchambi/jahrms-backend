require("dotenv").config({
    path: "./app/.env",
});
const db = require("../../models");
const capitalize = require("../../../node_modules/capitalize-the-first-letter/capitalize");
const pass = require("../../config/password");
const mail = require("../../config/mail");
const uuid = require("uuid");
const querystring = require("querystring");
const qs = require("qs");
const users = db.users;
const role_user = db.role_user;
const roles = db.roles;
const organization = db.organization;
const axios = require("axios").default;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    //return console.log('my results are ',req.body)
    const email = req.body.email;
    const firstName=req.body.first_name;
    const lastName=req.body.last_name;
    const middleName=req.body.middle_name;
    const birthDate=req.body.birth_date;
    const dateHired=req.body.hired_date;
    const gender=req.body.gender;
    const designationName=req.body.designation_id;
    const phone = req.body.phone_number;
    const checkNumber = req.body.check_number;
    const national_id = req.body.national_id;
    const roles = req.body.roles;
    const created_by = req.body.created_by;
    const uid = uuid.v4();
    const today = new Date();
    const newDate = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000);
    const fullname=firstName+' '+middleName+' '+lastName;

    const tempPass = pass.passoword();
    users
    .create({
        uid: uid,
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        name: capitalize(fullname),
        check_number: checkNumber,
        email: email,
        phone_number: phone,
        national_id: national_id,
        password: bcrypt.hashSync(tempPass, 8),
        password_expiration_date: newDate,
        sex:gender,
        designation_id: designationName,
        birth_date: birthDate,
        hired_date: dateHired,
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
    })

        .catch((err) => {
            res.status(500).send({
                message: err,
                'code': 0
            });
        });



};

exports.findOneOnly = (req, res) => {

     //return console.log('data are ',req.params.id)
    const uid = parseInt(req.params.id);
    users
        .findOne({
            where: {
                id: parseInt(req.params.id),
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
            
                    res.status(200).json({
                        en_message: "User details found",
                        sw_message: "Employee Details",
                        data: data
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