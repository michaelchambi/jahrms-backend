const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const path = require("path");
const capitalize = require("capitalize-the-first-letter");
const Op = db.Sequelize.Op;

const uid = require('uuid');
const incharge = db.incharges;
exports.addInchage = (req, res) => {
  const incharge_name = req.body.incharge_name;

  if (!req.body.incharge_name) {
    return res.status(400).send({
      message: "Inchage name has not filled.",
    });

  } else {
    incharge
      .create({
        name:incharge_name,
        uid:uid,
        status:true
      })
      .then((data) => {
        res.json({
            message:data.name+" Successful Created",
          });
        
      })
      .catch((err) => {
        res.status(500).send({
          message: err.errors
        });
      });
  }
};


exports.editInchage = (req, res) => {
  const id = req.body.id;
  const incharge_name = req.body.incharge_name;
  incharge
    .findOne({
      where: {
        id: id,
      },
    })
    .then((data) => {
      data
        .update({
            name:incharge_name,
            uid:uid,
            status:true

        })
        .then((result) => {
          res.status(200).send({
            message: result.name + " Successful Updated",
          });
        })
    })
    .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
};



exports.findOne = (req, res) => {
  const id = req.body.id;
  //return console.log('the id is ',id);
  incharge
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



exports.findAll = (req, res) => {
  incharge
    .findAll({
      // where: {
      //   status:1
      // },
      order: [["name", "ASC"]],
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

exports.activate = (req, res) => {
  const id = req.body.id;

  incharge
    .findOne({
      where: {
        id: id,
      },
    })
    .then((data) => {
      data
        .update({
          status: true,
        })
        .then((result) => {
          res.status(200).send({
            message: data.name + " Successful activated",
          });
        })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.deactivate = (req, res) => {
  const id = req.body.id;

  incharge
    .findOne({
      where: {
        id: id,
      },
    })
    .then((data) => {
      data
        .update({
          status: 0,
        })
        .then((result) => {
          res.status(200).send({
            message: data.projectName + " Successful deactivated",
          });
        })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};



