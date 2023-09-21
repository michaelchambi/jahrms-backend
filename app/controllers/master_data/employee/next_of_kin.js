const dotenv = require("dotenv");
const fop = require("../../../middlewares/file_processing");
dotenv.config();
const db = require("../../../models");
const path = require("path");
const Op = db.Sequelize.Op;
const uid = require('uuid');
const nextOfKinInfo=db.next_of_kin
const dependant_type=db.dependant_type;
const users=db.users;


exports.addNextOfKin = (req, res) => {
    // return console.log('next_of_kin details are ',req.body)
     const relation_id = req.body.relation_id;
     const employee = req.body.employee_id;
     const phone_number = req.body.phone_number;
     const full_name=req.body.full_name;
     const physical_address=req.body.physical_address;
     const gender=req.body.gender;
     
         nextOfKinInfo.create({
            employee_id:employee,
            full_name:full_name,
            phone_number:phone_number,
            physical_address:physical_address,
            gender:gender,
            relation_id:relation_id,
             uid:uid.v4(),
         }).then((data) => {
             res.json({
                 message: data.first_name + " Successful Created"
             });
 
         }).catch((err) => {
             res.status(500).send({message: err.message});
         });
     
 };
 
 
 exports.editNextOfKin = (req, res) => {
     const id = req.body.id;
     const employee_id = req.body.employee_id;
     const employee = req.body.employee_id;
     const account_no = req.body.account_number;
     const card = req.body.card_copy;
     nextOfKinInfo.findOne({
         where: {
             id: id
         }
     }).then((data) => {
         data.update({
             employee_id:employee_id,
             employee_id:employee,
             account_name:account_name,
             account_number:account_no,
             card_copy:card,
             status:'UNIVERIFIED',
             uid:uid.v4(),
           })
            .then((result) => {
             res.status(200).send({
                 message: result.account_name + " Successful Updated"
             });
         })
     }).catch((err) => {
         res.status(500).send({message: err.message});
     });
 };
 
 
 exports.findOneBanknfo = (req, res) => {
     const id = req.body.id;
     nextOfKinInfo.findOne({
         where: {
             employee_id: id
         },
         include:[{
             model:users
         }]
     }).then((data) => {
         res.status(200).send(data);
     }).catch((err) => {
         res.status(500).send({message: err.message});
     });
 };
 
 
 exports.findAllNextOfKin = (req, res) => {
     nextOfKinInfo.findAll({
         include:[{model:db.dependant_type}],
         order: [
             ["full_name", "ASC"]
         ]
     }).then((data) => {
         res.status(200).send(data);
     }).catch((err) => {
         res.status(500).send({message: err.message});
     });
 };
 
 exports.activateNextOfKin = (req, res) => {
     const id = req.body.id;
 
     nextOfKinInfo.findOne({
         where: {
             id: id
         }
     }).then((data) => {
         data.update({status:'VERIFIED'}).then((result) => {
             res.status(200).send({
                 message: data.name + " Successful activated"
             });
         })
     }).catch((err) => {
         res.status(500).send({message: err.message});
     });
 };
 
 exports.deactivateNextOfKin = (req, res) => {
     const id = req.body.id;
 
     nextOfKinInfo.findOne({
         where: {
             id: id
         }
     }).then((data) => {
         data.update({status: 'UNVERIFIED'}).then((result) => {
             res.status(200).send({
                 message: data.name+ " Successful deactivated"
             });
         })
     }).catch((err) => {
         res.status(500).send({message: err.message});
     });
 };
 
