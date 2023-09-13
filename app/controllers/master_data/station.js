const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const Op = db.Sequelize.Op;
const uid = require('uuid');
const station= db.nj_work_station;

exports.addStation= (req, res) => {
    //return console.log('data received are ',req.body)
    const phone_number=req.body.phone_number;
    const road_name=req.body.road_name;
    const email_address=req.body.email_address;
    const post_code=req.body.post_code;
    const address_number=req.body.address_number;

    const station_name = req.body.station_name;
    const display_name=req.body.display_name;
    const user_id = req.body.user_id;
    const district = req.body.district_id;
    const station_code = req.body.abbreviation;
    if (!req.body.station_name) {
        return res.status(400).send({message: "Station name has not filled."});

    } else {
        station.create({
            phone_number:phone_number,
            road_name:road_name,
            email_address:email_address,
            post_code:post_code,
            address_number:address_number,
            name: station_name,
            display_name:display_name,
            data_entry_personel_id: user_id,
            district_id:district,
            code:station_code,
            uid:uid.v4()
        }).then((data) => {
            res.status(200).json({
                sw_message: "Successful Created",
                data: data
            });

        }).catch((err) => {

            res.status(500).send({message: err.errors});
        });
    }
};


exports.editStation= (req, res) => {
    const id = req.body.id;
    const station_name = req.body.station_name;
    const display_name=req.body.display_name;
    const user_id = req.body.user_id;
    station.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
            name: station_name,
            display_name:display_name,
            data_entry_personel_id: user_id,
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
    station.findOne({
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
    station.findAll({
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

    station.findOne({
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

    station.findOne({
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
