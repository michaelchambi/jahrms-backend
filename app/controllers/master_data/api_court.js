const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const Op = db.Sequelize.Op;

const uid = require('uuid');
const court = db.court;
exports.addCourt = (req, res) => {
    const court_name = req.body.court_name;
    const court_code = req.body.court_abbreviation;
    const user_id = req.body.user_id;
    if (!req.body.court_name) {
        return res.status(400).send({message: "Court name has not filled."});

    } else {
        court.create({
            name: court_name,
            data_entry_personel_id: user_id,
            court_abbreviation: court_code,
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


exports.editCourt = (req, res) => {
    const id = req.body.id;
    const court_name = req.body.court_name;
    const court_code = req.body.court_abbreviation;
    const user_id = req.body.user_id;
    court.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
          name: court_name,
            data_entry_personel_id: user_id,
            court_abbreviation: court_code,
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
    court.findOne({
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
    court.findAll({
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


exports.findAllByCourtLevel = (req, res) => {
  const  court_level_id=req.body.court_level_id;
  const  zone_id=req.body.zone_id
    court.findAll({
        where: {
        court_level_id:court_level_id,zone_id:zone_id
        },
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

    court.findOne({
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

    court.findOne({
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
