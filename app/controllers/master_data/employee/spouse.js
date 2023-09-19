const dotenv = require("dotenv");
dotenv.config();
const db = require("../../../models");
const Op = db.Sequelize.Op;
const uid = require('uuid');
const spouse = db.spouse;



exports.editSpouse = (req, res) => {
    const id = req.body.id;
    const spouse_name = req.body.name;
    const employee_id = req.body.employee_id;
    const user_id = req.body.user_id;
    spouse.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
            user_id:user_id,
            employee_id: employee_id,
            spouse_name: spouse_name,
            uid:uid.v4(),
            spouse_status: true
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
    spouse.findOne({
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
    spouse.findAll({
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

    spouse.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({spouse_status: true}).then((result) => {
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

    spouse.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({spouse_status: false}).then((result) => {
            res.status(200).send({
                message: data.name+ " Successful deactivated"
            });
        })
    }).catch((err) => {
        res.status(500).send({message: err.message});
    });
};
