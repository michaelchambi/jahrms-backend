const axios = require('axios').default;
require('dotenv').config();
const db = require("../../models");
const api_transfer = db.api_transfer;
const api_users = db.users;
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");
const { log } = require('console');
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const file_names_generating_code = "abcdefghijklmnopqrstuvwxyz0123456789";
const court = db.court;
const app_transfer_reason = db.app_transfer_reason;



function codegenerator(length) {
    let result = "";
    const characterLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characterLength));
    }
    return result;
  }
  
  function file_codegenerator(length) {
    let result = "";
    const characterLength = file_names_generating_code.length;
    for (let i = 0; i < length; i++) {
      result += file_names_generating_code.charAt(
        Math.floor(Math.random() * characterLength)
      );
    }
    return result;
  }
  const datetime = new Date();



exports.add = (req, res) => {


    const fileUrl = req.files.fileUrl;
    const extensionName = path.extname(fileUrl.name);
    const allowedExtension = [".pdf",];
  
    const transfer_director_path = process.env.transfer_director_path;


    const id = req.body.id;
    const transfer_type = req.body.transfer_type;
    const court_id = req.body.court_id
    const transfer_reason_id = req.body.transfer_reason_id
    const tranfer_date = req.body.tranfer_date
    const involve_payments =  "without payments"
    const transfer_immediet_suppervisor_comment=req.body.transfer_immediet_suppervisor_comment
    const transfer_approver_comment=req.body.transfer_approver_comment
    const uid =uuid.v4()
    const transfer_abreve = "jot-";
    // return console.log('hizi ndio zenyewe',req.body);


    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({
          message: "No files were uploaded.",
        });
      }
      else if (!allowedExtension.includes(extensionName)) {
        return res.status(422).send({
          message: "Invalid File | check your File format",
        });
      }
      else{
    api_users.findOne({
        where: {
            id: id,
        },
    })
    
        .then(data => {
            // if (transfer_type=="change123") {
            // return console.log('hizi ndio zenyewe',data.name);
            
            api_transfer.create({

                transfer_folder: transfer_abreve + codegenerator(8),
                transfer_attachment: transfer_abreve + file_codegenerator(6) + extensionName,


                userId: data.id,
                transfer_type: transfer_type,
                court_id:court_id,
                transfer_reason_id: transfer_reason_id,
                tranfer_date: tranfer_date,
                involve_payments: involve_payments,
                transfer_immediet_suppervisor_comment:transfer_immediet_suppervisor_comment,
                transfer_approver_comment:transfer_approver_comment,
                uid:uid,
                status: true,


            })

            .then((data) => {
                const file_path = transfer_director_path + data.transfer_folder;
                const filename = data.transfer_attachment;
                fs.mkdirSync(file_path, { recursive: true });
                fileUrl.mv(path.join(file_path, filename), (err) => {
                  if (err) {
                    return res.status(500).send({
                      message: "No such file or directory" + err,
                    });
                  }
                });
                res.json({
                  message:'transfer'+" Successful Created",
                });
              })
            
                .catch((err) => {
                    res.status(500).json({
                        message: "Kindly try again" + err
                    })
                })
            
             } )
}
}

exports.edit = (req, res) => {
    const uid = req.body.uid;
    const transfer_type = req.body.transfer_type;
    const court_id = req.body.court_id
    const transfer_reason_id = req.body.transfer_reason_id
    const transfer_attachment = req.body.transfer_attachment
    const tranfer_date = req.body.tranfer_date
    const involve_payments = req.body.involve_payments
    const transfer_immediet_suppervisor_comment=req.body.transfer_immediet_suppervisor_comment
    const transfer_approver_comment=req.body.transfer_approver_comment

    api_transfer.findOne({
        where: {
            uid: uid,
        }
    })
        .then((data) => {
            data.update({
                userId: data.id,
                transfer_type: transfer_type,
                court_id:court_id,
                transfer_reason_id: transfer_reason_id,
                transfer_attachment: transfer_attachment,
                tranfer_date: tranfer_date,
                involve_payments: involve_payments,
                transfer_immediet_suppervisor_comment:transfer_immediet_suppervisor_comment,
                transfer_approver_comment:transfer_approver_comment,
            })
                .then(() => {
                    res.status(200).json({
                        message: "transfer updated successful"
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "transfer to update"
                    })
                })
        })
        .catch((err) => {
            res.status(500).json({
                message: "transfer not found"
            })
        })
}

exports.findAll = (req, res) => {
    const id = req.body.id;
    api_transfer.findAll({
        where: {
            userId: id,
        },


        include: [
            {model: api_users,},
            {model: court,},
            {model: app_transfer_reason}
        ],
    })
    .then((data)=>{
            const transfer=data;
            res.status(200).send(transfer)
           
        })
        .catch((err) => {
            res.status(500).json({
                message: " No transfer found"
            })
        })
}



exports.findEmployeeAll = (req, res) => {
    const code = req.body.organization_code;
    api_transfer
        .findAll(
            { include: [
            {model: api_users,},
            {model: court,},
            {model: app_transfer_reason}
        ],
    })
        
        .then(data => {
            res.status(200).json({
                en_message: "transfer for your Emlpoyee found",
                sw_message: "Employee List imepatikana",
                data: data,
            });
        })
        .catch(err => {
            res.status(500).json({
                en_message: "Something went wrong, Kindly try again",
                sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadaesz",
            });
        });
};

exports.findOne = (req, res) => {
    const uid = req.body.uid;
    // return console.log('hizi ndio zenyewe', req.body);
    api_transfer.findOne({
        
        include: [
        {model: api_users,},
        {model: court,},
        {model: app_transfer_reason}
    ],
        where: {
            uid: uid
        }
        
    })
        .then((data) => {
            res.status(200).json({
                message: "transfer details",
                transfer: data
            })
        })
        .catch(() => {
            res.status(500).json({
                message: "transfer not found"
            })
        })
}

exports.approveTransfer = (req, res) => {
    const id = req.body.id;
    const transfer_approver_comment = req.body.transfer_approver_comment;
    
    api_transfer.findOne({
        where: {
            id: id,
        }
    })
        .then((data) => {
            
            //    return console.log("hiii nayo ni aina ya data",req.body);
                data.update({
                    transfer_status: "true123",
                    transfer_approver_comment:transfer_approver_comment,
                })
                    .then(() => {
                        res.status(200).json({
                            message: "Successful approved"
                        })
                    })
                    .catch((err) => {
                        res.status(500).json({
                            message:err+ "Fail to approved"
                        })
                    })
                
            
            
           
        })
        .catch((err) => {
            res.status(500).json({
                message: "transfer not found"
            })
        })
}

exports.rejectTransfer = (req, res) => {
    const id = req.body.id;
    const transfer_approver_comment = req.body.transfer_approver_comment;

    api_transfer.findOne({
        where: {
            id: id,
        }
    })
        .then((data) => {
            data.update({
                transfer_status: "false123",
                transfer_approver_comment:transfer_approver_comment,

            })
                .then(() => {
                    res.status(200).json({
                        message: "Successful approved"
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Fail to approved"
                    })
                })
        })
        .catch((err) => {
            res.status(500).json({
                message: "transfer not found"
            })
        })
}
exports.commentTransfer = (req, res) => {
    const id = req.body.id;
    const transfer_immediet_suppervisor_comment = req.body.transfer_immediet_suppervisor_comment;
    api_transfer.findOne({
        where: {
            id: id,
        }
    })
        .then((data) => {
            data.update({
                transfer_immediet_suppervisor_comment: transfer_immediet_suppervisor_comment,
            })
                .then(() => {
                    res.status(200).json({
                        message: "transfer commented successful"
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Fail to comment"
                    })
                })
        })
        .catch((err) => {
            res.status(500).json({
                message: "transfer not found"
            })
        })
}


// .............................................................................................
exports.transferEmployee = (req, res) => {
    const id = req.body.id;
    // const transfer_type = "Administration Transfer";

    const court_id = req.body.court_id
    const court_level_id = req.body.court_level_id
    const transfer_reason_id = req.body.transfer_reason_id
    const tranfer_date = req.body.tranfer_date
    // const involve_payments =  "with payments"
    const uid =uuid.v4()
    api_users.findOne({
        where: {
            id: id,
        }
    })
        .then((data) => {
            api_transfer.create({
                uid:uid,
                userId: data.id,
                transfer_type:"Administration Transfer",
                court_id:court_id,
                court_level_id:court_level_id,
                transfer_reason_id:transfer_reason_id,
                tranfer_date:tranfer_date,
                involve_payments:"with payments"
            })
                .then(() => {
                    res.status(200).json({
                        message: "Employee transfer successful"
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Fail to transfer employee"+err
                    })
                })
        })
        .catch((err) => {
            res.status(500).json({
                message: "employee not found"
            })
        })
}



// transfer_type
// current_working_station
// new_working_station
// transfer_reason_id
// transfer_attachment
// tranfer_date
// involve_payments
// transfer_immediet_suppervisor_comment
// transfer_approver_comment
// transfer_status

