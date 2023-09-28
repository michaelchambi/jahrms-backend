const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const Op = db.Sequelize.Op;
const uid = require('uuid');
const education_level_grade = db.education_level_grade;
const education_level = db.education_level;

exports.addEducationLevelGrade = (req, res) => {
   // return console.log('data are ',req.body)
    const education_level_grade_name = req.body.grade;
    const education_level_id= req.body.education_level_id
    const description = req.body.description;
    const user_id = req.body.user_id;
    if (!req.body.grade) {
        return res.status(400).send({message: "Qualification grade name has not filled."});

    } else {
        education_level_grade.create({
            name: education_level_grade_name,
            education_level_id:education_level_id,
            data_entry_personel_id: user_id,
            description:description,
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


exports.editEducationLevelGrade = (req, res) => {
    const id = req.body.id;
    const education_level_grade_name = req.body.education_level_grade_name;
    const description = req.body.education_level_grade_description;
    education_level_grade.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
          name: education_level_grade_name,
            education_level_grade_description:description,
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
    education_level_grade.findOne({
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
    education_level_grade.findAll({
        include:[{model: education_level,}],
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

    education_level_grade.findOne({
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

    education_level_grade.findOne({
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
