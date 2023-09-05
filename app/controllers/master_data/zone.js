const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const Op = db.Sequelize.Op;
const uid = require('uuid');
const zone = db.zone;

exports.addZone = (req, res) => {
    const zone_name = req.body.zone_name;
    const zone_code = req.body.zone_abbreviation;
    const user_id = req.body.user_id;
    if (!req.body.zone_name) {
        return res.status(400).send({message: "Zone name has not filled."});

    } else {
        zone.create({
            name: zone_name,
            data_entry_personel_id: user_id,
            zone_abbreviation: zone_code,
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


exports.editZone = (req, res) => {
    const id = req.body.id;
    const zone_name = req.body.zone_name;
    const zone_code = req.body.zone_abbreviation;
    const user_id = req.body.user_id;
    zone.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
          name: zone_name,
            data_entry_personel_id: user_id,
            zone_abbreviation: zone_code,
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
    zone.findOne({
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
    zone.findAll({
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

    zone.findOne({
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

    zone.findOne({
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
