const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const Op = db.Sequelize.Op;
const uid = require('uuid');
const court_level = db.court_level;

exports.addCourt_level = (req, res) => {
    const court_level_name = req.body.court_level_name;
    const court_level_code = req.body.court_level_code;
    const user_id = req.body.user_id;
    if (!req.body.court_level_name) {
        return res.status(400).send({message: "Court_level name has not filled."});

    } else {
        court_level.create({
            name: court_level_name,
            code:court_level_code
        }).then((data) => {
            res.json({
                message: data.name + " Successful Created"
            });

        }).catch((err) => {
            res.status(500).send({message: err.errors});
        });
    }
};


exports.editCourt_level = (req, res) => {
    const id = req.body.id;
    const court_level_name = req.body.court_level_name;
    const court_level_code = req.body.court_level_code;
    court_level.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
            name: court_level_name,
            code:court_level_code
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
    court_level.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({message: err.message});
    });
};


exports.findAllActive = (req, res) => {
    court_level.findAll({
        where: {
       active:true
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

exports.findAll = (req, res) => {
    court_level.findAll({
       
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
    //return console.log('data zilizofika ',req.body)
    const id = req.body.id;

    court_level.findOne({
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

    court_level.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({active:false}).then((result) => {
            res.status(200).send({
                message: data.name+ " Successful deactivated"
            });
        })
    }).catch((err) => {
        res.status(500).send({message: err.message});
    });
};
