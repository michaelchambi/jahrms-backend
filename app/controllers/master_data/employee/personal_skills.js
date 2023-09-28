const dotenv = require("dotenv");
dotenv.config();
const db = require("../../../models");
const Op = db.Sequelize.Op;
const uid = require('uuid');
const users=db.users;
const skills=db.skill;
const personal_skills= db.personal_skill;

exports.addPersonalSkills= (req, res) => {

//  return console.log('data received are ',req.body)
    const skills = req.body.skills_id;
    const employee_id = req.body.employee_id;
    if (!req.body.skills_id) {
        return res.status(400).send({message: "Dependant type name has not filled."});

    } else {
        for (const key in skills) {
            const skills_data = skills[key];
            personal_skills.create({
                skill_id: skills_data,
                employee_id: employee_id,
                status:true,
                uid:uid.v4(),
            });
        }
        users.findOne({
            where: {
                id: employee_id 
            }
        }).then((data) => {
          
                res.status(200).send({
                    message: 'Dear '+data.name + "you have Successful added your skills"
                });
           
        })

    }}

exports.editPersonalSkills= (req, res) => {
    const id = req.body.id;
    const skills = req.body.skills_id;
    const employee_id = req.body.employee_id;
    const user_id = req.body.user_id;
    personal_skills.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
            skill_id: skills_data,
            employee_id: employee_id,
            status:true
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
    personal_skills.findOne({
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
    personal_skills.findAll({
        include:[{model:skills}],
        order: [
            ["updatedAt", "ASC"]
        ]
    }).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({message: err.message});
    });
};




exports.activate = (req, res) => {
    const id = req.body.id;

    personal_skills.findOne({
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

    personal_skills.findOne({
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
