const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const Op = db.Sequelize.Op;
const uid = require('uuid');
const cadre = db.cadre;
const department=db.department;

exports.addCadre = (req, res) => {
    //return console.log('data received are ',req.body)
    const cadre_name = req.body.cadre_name;
    const cadre_description = req.body.description;
    const department= req.body.department_id;
    const user_id= req.body.user_id;
    if (!req.body.cadre_name) {
        return res.status(400).send({message: "Cadre name has not filled."});

    } else {
        cadre.create({
            name: cadre_name,
            department_id: department,
            description: cadre_description,
            registrar_id:user_id,
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


exports.editCadre = (req, res) => {
    const id = req.body.id;
    const cadre_name = req.body.cadre_name;
    const cadre_description = req.body.description;
    const department= req.body.department_id;
    cadre.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
            name: cadre_name,
            department_id: department,
            description: cadre_description,
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
    cadre.findOne({
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
    cadre.findAll({
        include:[{model:department}],
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
    const id = req.body.uid;

    cadre.findOne({
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
   // return console.log('data received are ',req.body)

    const id = req.body.uid;

    cadre.findOne({
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


exports.mobile_findOne = (req, res) => {
   // return console.log('data received are ',req.params)
    const id = req.params.id;
    cadre
      .findOne({
        where: {
          id: id,
        },
      })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  };