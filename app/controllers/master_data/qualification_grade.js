const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const Op = db.Sequelize.Op;
const uid = require('uuid');
const qualification_grade = db.qualification_grade;
const qualification = db.qualification;

exports.addQualification_grade = (req, res) => {
   // return console.log('data are ',req.body)
    const qualification_grade_name = req.body.grade;
    const qualification_id= req.body.qualification_id
    const description = req.body.description;
    const user_id = req.body.user_id;
    if (!req.body.grade) {
        return res.status(400).send({message: "Qualification grade name has not filled."});

    } else {
        qualification_grade.create({
            name: qualification_grade_name,
            qualification_id:qualification_id,
            data_entry_personel_id: user_id,
            grade_description:description,
            uid:uid.v4(),
            active: true
        }).then((data) => {
            res.json({
                message: data.name + " Successful Created"
            });

        }).catch((err) => {
            res.status(500).send({message: err.errors});
        });
    }
};


exports.editQualification_grade = (req, res) => {
    const id = req.body.id;
    const qualification_grade_name = req.body.qualification_grade_name;
    const description = req.body.qualification_grade_description;
    qualification_grade.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
          name: qualification_grade_name,
            qualification_grade_description:description,
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
    qualification_grade.findOne({
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
    qualification_grade.findAll({
        include:[{model: qualification,}],
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

    qualification_grade.findOne({
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

    qualification_grade.findOne({
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
