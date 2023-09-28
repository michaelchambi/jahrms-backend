const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const Op = db.Sequelize.Op;
const uid = require('uuid');
const institution = db.academic_institution;
exports.addAcademicInstitution = (req, res) => {
    const institution_name = req.body.name;
    const description= req.body.description;
    const abreviation=req.body.abreviation;
    if (!req.body.name) {
        return res.status(400).send({message: "Academic Institution name has not filled."});

    } else {
        institution.create({
            name: institution_name,
            description: description,
            abreviation:abreviation,
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


exports.editAcademicInstitution = (req, res) => {
    const id = req.body.id;
    const institution_name = req.body.name;
    const description= req.body.description;
    const abreviation=req.body.abreviation;
    institution.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
            name: institution_name,
            description: description,
            abreviation:abreviation,
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
    institution.findOne({
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
    institution.findAll({
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

    institution.findOne({
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
    institution.findOne({
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


 