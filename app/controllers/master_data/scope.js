const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const Op = db.Sequelize.Op;
const uid = require('uuid');
const scope= db.scope;

exports.addScope= (req, res) => {
    const scope_name = req.body.scope_name;
    const scope_code = req.body.scope_abbreviation;
    const user_id = req.body.user_id;
    if (!req.body.scope_name) {
        return res.status(400).send({message: "Scopename has not filled."});

    } else {
        scope.create({
            name: scope_name,
            data_entry_personel_id: user_id,
            scope_abbreviation: scope_code,
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


exports.editScope= (req, res) => {
    const id = req.body.id;
    const scope_name = req.body.scope_name;
    const scope_code = req.body.scope_abbreviation;
    const user_id = req.body.user_id;
    scope.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
          name: scope_name,
            data_entry_personel_id: user_id,
            scope_abbreviation: scope_code,
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
    scope.findOne({
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
    scope.findAll({
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

    scope.findOne({
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

    scope.findOne({
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
