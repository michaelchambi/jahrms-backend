const axios = require('axios').default;
require('dotenv').config();
const db = require("../../models");
const api_staff_profile = db.api_staff_profile;
const api_users = db.users;
const api_designation = db.api_designation;
const api_change_designation = db.api_change_designation;
const uuid = require("uuid")

exports.findAll = (req, res) => {

    api_staff_profile.findAll({
        // where:{},
        include: [
            {
                model: api_users,
            },
            {
                model: api_designation,
            },
        ],
    })

        .then((data) => {
            //  return console.log('hizi ni data za user',data);
            const arr = [];
            // const my_date='2023-08-29 17:01:23.335+03'
            const today_date = new Date();
            for (let ta = 0; ta < data.length; ta++) {
                const designation_start_date = data[ta].designation_assignment_date;
                const date_diff = Math.abs(today_date.getTime() - designation_start_date.getTime());
                const years = Math.ceil(date_diff / ((1000 * 3600 * 24)))
                const details = data[ta];
                const combined = { years, details }
                if (years >= 1096) {

                    arr.push(combined)
                }


            }
            res.status(200).json({
                message: 'hizi data',
                employee: arr
            })

        })
        .catch((err) => {
            res.status(500).json({
                message: err.message + " No user found"
            })
        })



}

exports.addDesignationChange = (req, res) => {
    const change_designation_reason_name = req.body.change_designation_reason_name;
    const change_designation_reason_abbreviation = req.body.change_designation_reason_abbreviation;
    const user_id = req.body.user_id;
    const created_by = req.body.created_by;
    const uid = uuid.v4()
    if (!req.body.change_designation_reason_name) {
        return res.status(400).send({ message: "change_designation_reason name has not filled." });

    } else {
        api_change_designation.create({
            reason_change_designation: change_designation_reason_name,
            data_entry_personel_id: user_id,
            change_designation_reason_abbreviation: change_designation_reason_abbreviation,
            uid: uid,
            created_by: created_by,
            status: true
        }).then((data) => {
            res.json({
                message: data.change_designation_reason_name + " Successful Created"
            });

        }).catch((err) => {
            res.status(500).send({ message: err.errors });
        });
    }
};


// exports.edit = (req, res) => {
//     const id = req.body.id;
//     const change_designation_reason_name = req.body.change_designation_reason_name;
//     const change_designation_reason_abbreviation = req.body.change_designation_reason_abbreviation;
//     api_change_designation
//         .update({
//             change_designation_reason_name: change_designation_reason_name,
//             change_designation_reason_abbreviation: change_designation_reason_abbreviation,
//         })
//         .then((result) => {
//             res.status(200).send({
//                 message: result.change_designation_reason_name + " Successful Updated"
//             });
//         })
//         .catch((err) => {
//             res.status(500).send({ message: err.message });
//         });
// };



exports.edit = (req, res) => {
    const id = req.body.id;
    const change_designation_reason_name = req.body.change_designation_reason_name;
    const change_designation_reason_abbreviation = req.body.change_designation_reason_abbreviation;
    const created_by = req.body.created_by;


    api_change_designation.findOne({
        where: {
            id: id,
        }
    })
        .then((data) => {

            data.update({
                id: data.id,
                change_designation_reason_name: change_designation_reason_name,
            change_designation_reason_abbreviation: change_designation_reason_abbreviation,
                created_by: created_by,
                status: true,
            })
                .then(() => {
                    res.status(200).json({
                        message: " updated successful"
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "fail to update"
                    })
                })
        })
        .catch((err) => {
            res.status(500).json({
                message: " not found"
            })
        })
}

exports.findOne = (req, res) => {
    const uid = req.body.uid;
    // return console.log('the id is ',id);
    api_change_designation.findOne({
        where: {
            uid: uid
        }
    }).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
};


exports.findAllChangeDesignation = (req, res) => {
    api_change_designation.findAll({

        // order: [
        //     ["name", "ASC"]
        // ]
    }).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
};

exports.activate = (req, res) => {
    const id = req.body.id;

    api_change_designation.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({ status: true }).then((result) => {
            res.status(200).send({
                message: data.name + " Successful activated"
            });
        })
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
};

exports.deactivate = (req, res) => {
    const id = req.body.id;

    api_change_designation.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({ status: false }).then((result) => {
            res.status(200).send({
                message: data.name + " Successful deactivated"
            });
        })
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
};
