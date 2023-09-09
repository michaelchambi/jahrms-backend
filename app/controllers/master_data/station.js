const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const Op = db.Sequelize.Op;
const uid = require('uuid');
const station= db.station;

exports.addStation= (req, res) => {
    const station_name = req.body.station_name;
    const display_name=req.body.display_name;
    const user_id = req.body.user_id;
    if (!req.body.station_name) {
        return res.status(400).send({message: "Station name has not filled."});

    } else {
        station.create({
            name: station_name,
            display_name:display_name,
            data_entry_personel_id: user_id,
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


exports.editStation= (req, res) => {
    const id = req.body.id;
    const station_name = req.body.station_name;
    const display_name=req.body.display_name;
    const user_id = req.body.user_id;
    station.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
            name: station_name,
            display_name:display_name,
            data_entry_personel_id: user_id,
            uid:uid.v4(),
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
    station.findOne({
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
    station.findAll({
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

    station.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({active: true}).then((result) => {
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

    station.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({active: false}).then((result) => {
            res.status(200).send({
                message: data.name+ " Successful deactivated"
            });
        })
    }).catch((err) => {
        res.status(500).send({message: err.message});
    });
};