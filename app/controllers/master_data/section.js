const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const Op = db.Sequelize.Op;
const uid = require('uuid');
const section= db.section;

exports.addSection= (req, res) => {
    const section_name = req.body.section_name;
    const section_code = req.body.section_abbreviation;
    const user_id = req.body.user_id;
    if (!req.body.section_name) {
        return res.status(400).send({message: "Sectionname has not filled."});

    } else {
        section.create({
            name: section_name,
            data_entry_personel_id: user_id,
            section_abbreviation: section_code,
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


exports.editSection= (req, res) => {
    const id = req.body.id;
    const section_name = req.body.section_name;
    const section_code = req.body.section_abbreviation;
    const user_id = req.body.user_id;
    section.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
          name: section_name,
            data_entry_personel_id: user_id,
            section_abbreviation: section_code,
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
    section.findOne({
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
    section.findAll({
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

    section.findOne({
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

    section.findOne({
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
