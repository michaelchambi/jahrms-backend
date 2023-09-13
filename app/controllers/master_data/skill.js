const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const Op = db.Sequelize.Op;
const uid = require('uuid');
const skill = db.skill;

exports.addSkill = (req, res) => {

// return console.log('data received are ',req.body)

    const skill_name = req.body.skill_name;
    const description = req.body.description;
    const user_id = req.body.user_id;
    if (!req.body.skill_name) {
        return res.status(400).send({message: "Leave type name has not filled."});

    } else {
        skill.create({
            name: skill_name,
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


exports.editSkill = (req, res) => {
    const id = req.body.id;
    const skill_name = req.body.skill_name;
    const description = req.body.description;
    const user_id = req.body.user_id;
    skill.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
            name: skill_name,
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
    skill.findOne({
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
    skill.findAll({
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

    skill.findOne({
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

    skill.findOne({
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
