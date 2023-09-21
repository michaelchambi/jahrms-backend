const dotenv = require("dotenv");
dotenv.config();
const db = require("../../../models");
const Op = db.Sequelize.Op;
const uid = require('uuid');
const marital_status = db.marital_status;
const spouse = db.spouse;

exports.addMaritalStatus = (req, res) => {
    const status_name = req.body.status_name;
   

  
    const employee_id = req.body.employee_id;
    const spouse_name = req.body.spouse_name;
    const user_id=req.body.user_id;
    if(status_name=='SINGLE'){
       // return console.log('data are FOR SINGLE SELECTION',req.body)
        if (!req.body.status_name) {
            return res.status(400).send({message: "Spouse name has not filled."});
    
        } else {
           
                marital_status.create({
                    employee_id: employee_id,
                    status_name: status_name,
                    uid:uid.v4(),
                    info_approval:'UNVERIFIED'
                }).then((marital_data) => {
                    res.json({
                        message: marital_data.status_name + " Successful Created"
                    });
        
                }).catch((err) => {
                    res.status(500).send({message: err.errors});
                });
           
        }
    }
    else if(status_name=='MARRIED'){
        return console.log('data are FOR MARRIED SELECTION',req.body,req.files)
        if (!req.body.status_name) {
            return res.status(400).send({message: "Spouse name has not filled."});
    
        } else {
            spouse.create({
                user_id:user_id,
                employee_id: employee_id,
                spouse_name: spouse_name,
                uid:uid.v4(),
                spouse_status: true
            }).then((data) => {
                marital_status.create({
                    spouse_id:data.id,
                    employee_id: employee_id,
                    status_name: status_name,
                    uid:uid.v4(),
                }).then((marital_data) => {
                    res.json({
                        message: marital_data.status_name + " Successful Created"
                    });
        
                }).catch((err) => {
                    res.status(500).send({message: err.errors});
                });
            }).catch((err) => {
                res.status(500).send({message: err.errors});
            });
           
        }
    }
    else if(status_name=='DIVORCED'){
        return console.log('data are FOR DIVORCED SELECTION',req.body,req.files)
        if (!req.body.status_name) {
            return res.status(400).send({message: "Spouse name has not filled."});
    
        } else {
            spouse.create({
                user_id:user_id,
                employee_id: employee_id,
                spouse_name: spouse_name,
                uid:uid.v4(),
                spouse_status: true
            }).then((data) => {
                marital_status.create({
                    spouse_id:data.id,
                    employee_id: employee_id,
                    status_name: status_name,
                    uid:uid.v4(),
                }).then((marital_data) => {
                    res.json({
                        message: marital_data.status_name + " Successful Created"
                    });
        
                }).catch((err) => {
                    res.status(500).send({message: err.errors});
                });
            }).catch((err) => {
                res.status(500).send({message: err.errors});
            });
           
        }
    }
    
};


exports.editMaritalStatus = (req, res) => {
    const id = req.body.id;
    const marital_status_name = req.body.status_name;
    const employee_id = req.body.employee_id;
    const user_id = req.body.user_id;
    marital_status.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
            user_id:user_id,
            employee_id: employee_id,
            marital_status_name: marital_status_name,
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
    // return console.log('the id is ',req.body);
    marital_status.findOne({
        where: {
            employee_id: id
        }
    }).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({message: err.message});
    });
};


exports.findAll = (req, res) => {
    marital_status.findAll({
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
    const approver=req.body.approver_id;
    marital_status.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({info_approval: 'VERIFIED',approver_id:approver}).then((result) => {
            res.status(200).send({
                message:" Successful Verifeid"
            });
        })
    }).catch((err) => {
        res.status(500).send({message: err.message});
    });
};

exports.deactivate = (req, res) => {
    const id = req.body.id;

    marital_status.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({marital_status_status: false}).then((result) => {
            res.status(200).send({
                message: data.name+ " Successful deactivated"
            });
        })
    }).catch((err) => {
        res.status(500).send({message: err.message});
    });
};
