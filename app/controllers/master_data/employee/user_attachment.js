const dotenv = require("dotenv");
dotenv.config();
const db = require("../../../models");
const Op = db.Sequelize.Op;
const uid = require('uuid');
const user_attachment= db.user_attachment;

exports.addUserAttachment = (req, res) => {
    const attachment_id = req.body.attachment_id;
    const employee_id= req.body.employee_id;
    if (!req.body.employee_id) {
        return res.status(400).send({message: "UserAttachment name has not filled."});

    } else {
        user_attachment.create({
           attachment_id: attachment_id,
            employee_id: employee_id,
            uid:uid.v4(),
        }).then((data) => {
            res.json({
                message: " Successful Created"
            });

        }).catch((err) => {
            res.status(500).send({message: err.errors});
        });
    }
};


exports.editUserAttachment = (req, res) => {
    const id = req.body.id;
    const attachment_id = req.body.attachment_id;
    const employee_id= req.body.employee_id;
    user_attachment.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
            attachment_id: attachment_id,
            employee_id: employee_id,
            uid:uid.v4(),
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
    user_attachment.findOne({
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
    user_attachment.findAll({
        order: [
            ["updateAt", "ASC"]
        ]
    }).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({message: err.message});
    });
};




