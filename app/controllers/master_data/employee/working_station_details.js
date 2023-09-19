const dotenv = require("dotenv");
dotenv.config();
const db = require("../../../models");
const Op = db.Sequelize.Op;
const uid = require('uuid');
const working_station = db.working_station_details;
const workstation_history = db.workstation_history;
const court = db.court;
const district = db.district;


exports.editWorkstation = (req, res) => {
    // return console.log('Data received Are ',req.body)
    // const id = req.body.employee_id;
    const working_station_name_id = req.body.station_id;
    const employee_id = req.body.employee_id;
    const user_id = req.body.user_id;
    const date_of_assignment = req.body.assignment_date;
    working_station.findOne({
        where: {
            employee_id: employee_id
        }
    }).then((data) => {
        data.update({
            assignment_date: date_of_assignment,
            user_id: user_id,
            station_id: working_station_name_id,
            completion_status: 'COMPLETED'
        }).then((result) => {
            workstation_history.update({
                status: 'OLD'
            }, {
                where: {
                    employee_id: result.employee_id
                }
            }).then((history_data) => {
                workstation_history.create({
                    registrar_id: result.user_id,
                    workstation_id: result.station_id,
                    employee_id: result.employee_id,
                    assignment_date: result.assignment_date,
                    status: 'CURRENTLY',
                    uid: uid.v4()
                }).then((history) => {
                    res.status(200).send({
                        message: "Employee has been Successfully provided the Workstation"
                    });
                }).catch(err => {
                    res.status(500).send({
                        message: err.message
                    });
                })


            })


        })
    })
};


exports.findEmployeeWorkstation = (req, res) => {
    const id = req.body.id;
    // return console.log('the id is ',id);
    working_station.findOne({
        where: {
            employee_id: id
        },
        include: [{
            model: court,
            include: [{
                model: district
            }]
        }],
    }).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message
        });
    });
};


exports.findOne = (req, res) => {
    const id = req.body.id;
    // return console.log('the id is ',id);
    working_station.findOne({
        where: {
            id: id
        },



    }).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message
        });
    });
};


exports.findAll = (req, res) => {
    working_station.findAll({

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

    working_station.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
            working_station_status: true
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

    working_station.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
            working_station_status: false
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