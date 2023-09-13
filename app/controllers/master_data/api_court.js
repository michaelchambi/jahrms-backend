const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const Op = db.Sequelize.Op;

const uid = require('uuid');
const court = db.court;
exports.addCourt = (req, res) => {
     //return console.log('data received are ',req.body)
    const phone_number=req.body.phone_number;
    const road_name=req.body.road_name;
    const email_address=req.body.email_address;
    const post_code=req.body.post_code;
    const address_number=req.body.address_number;
    const court_name = req.body.court_name;
    const court_code = req.body.abbreviation;
    const zones = parseInt(req.body.zone_id);
    const display_names=req.body.display_name;
    const court_level=parseInt(req.body.court_level_id);
    const districts=parseInt(req.body.district_id);

    if (!req.body.court_name) {
        return res.status(400).send({message: "Court name has not filled."});

    } else {
        court.create({
            post_code: post_code,
            phone_number: phone_number,
            road_name: road_name,
            email_address: email_address,
            display_name: display_names,
            code:court_code,
            sub_sp_code: '0',
            court_level_id: court_level,
            zone_id:zones,
            district_id:districts,
            address_number:address_number,
            name: court_name,
            uid:uid.v4(),
            active: true
        }).then((data) => {
            res.json({
                message: data.name + " Successful Created"
            });

        }).catch((err) => {
            res.status(500).send({message: err});
        });
    }
};


exports.editCourt = (req, res) => {

    // return console.log('data received is ',req.body)
    const id = req.body.court_id;
    const phone_number=req.body.phone_number;
    const road_name=req.body.road_name;
    const email_address=req.body.email_address;
    const post_code=req.body.post_code;
    const address_number=req.body.address_number;
    const court_code = req.body.court_abbreviation;
    court.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
            phone_number:phone_number,
            road_name:road_name,
            email_address:email_address,
            post_code:post_code,
            address_number:address_number,
            court_abbreviation: court_code,
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
    court.findOne({
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
    court.findAll({
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


exports.findAllByCourtLevel = (req, res) => {
  const  court_level_id=req.body.court_level_id;
  const  zone_id=req.body.zone_id
    court.findAll({
        where: {
        court_level_id:court_level_id,zone_id:zone_id
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

exports.findAllByCourtLevelAndDistrict = (req, res) => {
    // return console.log('received data are', req.body)
    const  court_level_id=req.body.court_level_id;
    const  districts=req.body.district_id
      court.findAll({
          where: {
          court_level_id:court_level_id,district_id:districts
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

    court.findOne({
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

    court.findOne({
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
