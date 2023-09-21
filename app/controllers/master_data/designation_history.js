const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const Op = db.Sequelize.Op;
const uid = require('uuid');
const designation_history = db.designation_history;
const department=db.department;

exports.addDesignationHistory = (req, res) => {
    //return console.log('data received are ',req.body)
    const designation = req.body.designation_id;
    const employee = req.body.employee_id;
    const assignment_date= req.body.assignment_date;
    const user_id= req.body.user_id;
    if (!req.body.designation_id) {
        return res.status(400).send({message: "DesignationHistory name has not filled."});

    } else {
        designation_history.create({
            designation_id: designation,
            employee_id: employee,
            Assignment_date: assignment_date,
            registrar_id:user_id,
            uid:uid.v4(),
        }).then((data) => {
            res.json({
                message: data.name + " Successful Created"
            });

        }).catch((err) => {
            res.status(500).send({message: err.errors});
        });
    }
};


exports.editDesignationHistory = (req, res) => {
    const id = req.body.id;
    const designation = req.body.designation_id;
    const employee = req.body.employee_id;
    const assignment_date= req.body.assignment_date;
    const user_id= req.body.user_id;
    designation_history.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
            designation_id: designation,
            employee_id: employee,
            Assignment_date: assignment_date,
            registrar_id:user_id,
            uid:uid.v4(),
          })
           .then((result) => {
            res.status(200).send({
                message: result.name + " Successful Updated"
            });
        })
    }).catch((err) => {
        res.status(500).send({message: err.message});
    });
};


exports.findOne = (req, res) => {
    const id = req.body.id;
    // return console.log('the id is ',id);
    designation_history.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({message: err.message});
    });
};


exports.findAll = (req, res) => {
    designation_history.findAll({
        include:[{model:department}],
        order: [
            ["name", "ASC"]
        ]
    }).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({message: err.message});
    });
};

exports.activate = (req, res) => {
    const id = req.body.uid;

    designation_history.findOne({
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

exports.deactivate = (req, res) => {
   // return console.log('data received are ',req.body)

    const id = req.body.uid;

    designation_history.findOne({
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


exports.mobile_findOne = (req, res) => {
   // return console.log('data received are ',req.params)
    const id = req.params.id;
    designation_history
      .findOne({
        where: {
          id: id,
        },
      })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  };