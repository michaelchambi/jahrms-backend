const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const Op = db.Sequelize.Op;
const uid = require('uuid');
const unit= db.unit;

exports.addUnit = (req, res) => {
    const unit_name = req.body.unit_name;
    const unit_code = req.body.unit_abbreviation;
    const user_id = req.body.user_id;
    if (!req.body.unit_name) {
        return res.status(400).send({message: "Unit name has not filled."});

    } else {
        unit.create({
            name: unit_name,
            data_entry_personel_id: user_id,
            unit_abbreviation: unit_code,
            uid:uid.v4(),
            status: true
        }).then((data) => {
            res.json({
                message: data.name + " Successful Created"
            });

        }).catch((err) => {
            res.status(500).send({message: err.errors});
        });
    }
};


exports.editUnit = (req, res) => {
    const id = req.body.id;
    const unit_name = req.body.unit_name;
    const unit_code = req.body.unit_abbreviation;
    const user_id = req.body.user_id;
    unit.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
          name: unit_name,
            data_entry_personel_id: user_id,
            unit_abbreviation: unit_code,
            uid: uid.v4(),
            status: true
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
    unit.findOne({
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
    unit.findAll({
        // where: {
        // status:1
        // },
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
    const id = req.body.id;

    unit.findOne({
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
    const id = req.body.id;

    unit.findOne({
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
