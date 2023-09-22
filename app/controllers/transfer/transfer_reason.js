const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const Op = db.Sequelize.Op;

const uid = require('uuid');
const app_transfer_reason = db.app_transfer_reason;


exports.addtransfer_reason = (req, res) => {
    const description = req.body.description;
    const user_id = req.body.user_id;
    // return console.log('hizi ni data from',req.body);
    if (!req.body.description) {
        return res.status(400).send({message: "transfer_reason description has not filled."});

    } else {
        app_transfer_reason.create({
            description: description,
            created_by:user_id,
            uid:uid.v4(),
            status: true
        }).then((data) => {
            res.json({
                message: data.description + " Successful Created",
                data:data
            });

        }).catch((err) => {
            res.status(500).json({
                message: "Kindly try again" + err
            })
        });
    }
};


exports.edittransfer_reason = (req, res) => {
    const id = req.body.id;
    const description = req.body.description;
    const user_id = req.body.user_id;
    app_transfer_reason.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
            created_by:user_id,
            description: description,
            uid: uid.v4(),
            status: true
          })
           .then((result) => {
            res.status(200).send({
                message: result.description + " Successful Updated"
            });
        })
    }).catch((err) => {
        res.status(500).send({message: err.message});
    });
};


exports.findOne = (req, res) => {
    const id = req.body.id;
    app_transfer_reason.findOne({
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
    app_transfer_reason.findAll({
        // where: {
        // status:1
        // },
        order: [
            ["description", "ASC"]
        ]
    }).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({message: err.message});
    });
};

exports.activate = (req, res) => {
    const id = req.body.id;

    app_transfer_reason.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({status: true}).then((result) => {
            res.status(200).send({
                message: data.description + " Successful activated"
            });
        })
    }).catch((err) => {
        res.status(500).send({message: err.message});
    });
};

exports.deactivate = (req, res) => {
    const id = req.body.id;

    app_transfer_reason.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({status: false}).then((result) => {
            res.status(200).send({
                message: data.description+ " Successful deactivated"
            });
        })
    }).catch((err) => {
        res.status(500).send({message: err.message});
    });
};
