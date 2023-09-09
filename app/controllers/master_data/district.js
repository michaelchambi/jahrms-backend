const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const Op = db.Sequelize.Op;
const uid = require('uuid');
const district= db.district;

exports.addDistrict= (req, res) => {
    const district_name = req.body.district_name;
    const district_code = req.body.district_abbreviation;
    const user_id = req.body.user_id;
    if (!req.body.district_name) {
        return res.status(400).send({message: "Districtname has not filled."});

    } else {
        district.create({
            name: district_name,
            data_entry_personel_id: user_id,
            district_abbreviation: district_code,
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


exports.editDistrict= (req, res) => {
    const id = req.body.id;
    const district_name = req.body.district_name;
    const district_code = req.body.district_abbreviation;
    const user_id = req.body.user_id;
    district.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
          name: district_name,
            data_entry_personel_id: user_id,
            district_abbreviation: district_code,
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
     return console.log('the id is ',id);
    district.findOne({
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
   
    district.findAll({
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


exports.findAllRegionDestrict = (req, res) => {
    const region_id=req.params.id
    // return console.log('data received is ',req.params);
    district.findAll({
        where: {
        region_id:region_id
        },
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

    district.findOne({
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

    district.findOne({
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
