const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const Op = db.Sequelize.Op;
const uid = require('uuid');
const dependant_type = db.dependant_type;

exports.addDependant_type = (req, res) => {

// return console.log('data received are ',req.body)

    const dependant_type_name = req.body.name;
    const description = req.body.dependant_description;
    const user_id = req.body.user_id;
    if (!req.body.name) {
        return res.status(400).send({message: "Dependant type name has not filled."});

    } else {
        dependant_type.create({
            name: dependant_type_name,
            data_entry_personel_id: user_id,
            description:description,
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


exports.editDependant_type = (req, res) => {
    const id = req.body.id;
    const dependant_type_name = req.body.dependant_type_name;
    const description = req.body.dependant_description;
    const user_id = req.body.user_id;
    dependant_type.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
            name: dependant_type_name,
            data_entry_personel_id: user_id,
            qualification_description:description,
            uid:uid.v4(),
            active: true
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
    dependant_type.findOne({
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
    dependant_type.findAll({
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

    dependant_type.findOne({
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

    dependant_type.findOne({
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
