const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const Op = db.Sequelize.Op;
const uid = require('uuid');
const designation= db.api_designation;

exports.addDesignation= (req, res) => {
    // return console.log('data receioved ',req.body)
    const designation_name = req.body.name;
    const description = req.body.description;
    const designation_code = req.body.abbreviation;
    const carder_id = req.body.cadre_id;
    const designation_order=req.body.designation_order;
    const user_id = req.body.user_id;
    
    if (!req.body.name) {
        return res.status(400).send({message: "Designationname has not filled."});

    } else {
        designation.create({
            name: designation_name,
            registrar_id: user_id,
            cadre_id: carder_id,
            abbreviation: designation_code,
            descriptin:description,
            designation_order:designation_order,
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


exports.editDesignation= (req, res) => {
    const id = req.body.id;
    const designation_name = req.body.designation_name;
    const designation_code = req.body.designation_abbreviation;
    const user_id = req.body.user_id;
    designation.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
            name: designation_name,
            registrar_id: user_id,
            cadre_id: carder_id,
            abbreviation: designation_code,
            descriptin:description,
            designation_order:designation_order,
            uid:uid.v4(),
            status: false
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
    designation.findOne({
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
    designation.findAll({
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

    designation.findOne({
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

    designation.findOne({
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
