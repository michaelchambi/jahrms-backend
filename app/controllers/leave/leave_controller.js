const axios = require('axios').default;
require('dotenv').config();
const db = require("../../models");
const api_leave = db.api_leave;
const api_users = db.users;
const uuid = require("uuid")

exports.add = (req, res) => {
    // return console.log('data received are ',req.body)
  
    const leave_id = req.body.leave_id;
    const place_to_visit = req.body.place_to_visit
    const region_id = req.body.region_id;
    const district_id = req.body.district_id;
    const start_date = req.body.start_date
    const end_date = req.body.end_date
    const goverment_year = req.body.goverment_year
    const involve_payments = req.body.involve_payments
    const employee_id=req.body.created_by
    const uid = uuid.v4()

   
    //return console.log('hizi ndio zenyewe', );
            api_leave.create({
               
                userId: employee_id,
                leave_id: leave_id,
                place_to_visit:place_to_visit,
                region_id:region_id,
                district_id:district_id,
                start_date: start_date,
                end_date: end_date,
                goverment_year: goverment_year,
                involve_payments: involve_payments,
            
                uid: uid,


            })
                .then((data) => {
                    res.status(200).json({
                        message: 'leave application is successfull',
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Kindly try again" + err.message
                    })
                })
       
}

exports.edit = (req, res) => {
    const id = req.body.id;
    const leave_id = req.body.leave_id;
    const place_to_visit = req.body.place_to_visit
    const region_id = req.body.region_id;
    const district_id = req.body.district_id;
    const coutry_id = req.body.coutry_id;
    const start_date = req.body.start_date
    const end_date = req.body.end_date
    const goverment_year = req.body.goverment_year
    const involve_payments = req.body.involve_payments

    api_leave.findOne({
        where: {
            id: id,
        }
    })
        .then((data) => {
            data.update({
                id: data.id,
                leave_id: leave_id,
                place_to_visit:place_to_visit,
                region_id:region_id,
                district_id:district_id,
                coutry_id:coutry_id,
                start_date: start_date,
                end_date: end_date,
                goverment_year: goverment_year,
                involve_payments: involve_payments,
                status: true,
            })
                .then(() => {
                    res.status(200).json({
                        message: "leave updated successful"
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "leave to update"
                    })
                })
        })
        .catch((err) => {
            res.status(500).json({
                message: "leave not found"
            })
        })
}

exports.findAll = (req, res) => {
    const id = req.body.id;
    api_leave.findAll({
        where: {
            userId: id,
        },

        include: [
            {
                model: api_users,
            },
        ],


    })
        .then((data) => {
            // return console.log('data za hii kitu hizi hapa', data);
            res.status(200).json({
                en_message: "Leave for your Emlpoyee found",
                sw_message: "Employee List imepatikana",
                data: data,

            })
        })

        .catch((err) => {
            res.status(500).json({
                message: " No leave found"
            })
        })

}



exports.findEmployeeAll = (req, res) => {
    const code = req.body.organization_code;
    api_leave
        .findAll({
            include: [
                {
                    model: api_users,
                },
            ],
        })

        .then(data => {
            res.status(200).json({
                en_message: "Leave for your Emlpoyee found",
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
    api_leave.findOne({

        include: [
            {
                model: api_users,
            },
        ],
        where: {
            uid: uid
        }

    })
        .then((data) => {
            const today_date= data.end_date;
             const birtdate=data.start_date;
             const date_diff=Math.abs(today_date.getTime() - birtdate.getTime());
             const number_days=Math.ceil(date_diff/( (1000 * 3600 * 24)))
             const combined_data={data,number_days}
            res.status(200).json({
                message: "leave details",
                leave: combined_data
            })
        })
        .catch(() => {
            res.status(500).json({
                message: "leave not found"
            })
        })
}

exports.approveLeave = (req, res) => {
    const uid = req.body.uid;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const approver_comment = req.body.approver_comment;
    const display_option = req.body.display_option

    api_leave.findOne({
        where: {
            uid: uid,
        }
    })
        .then((data) => {
            if (display_option == "change123") {
                // return console.log("hiii nayo ni aina ya data",display_option);
                data.update({
                    leave_status: "true123",
                    approver_comment: approver_comment,
                    start_date: start_date,
                    end_date: end_date,
                })
                    .then(() => {
                        res.status(200).json({
                            message: "Successful approved"
                        })
                    })
                    .catch((err) => {
                        res.status(500).json({
                            message: err + "Fail to approved"
                        })
                    })

            }
            else {
                data.update({
                    leave_status: "true123",
                    approver_comment: approver_comment,
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
            }

        })
        .catch((err) => {
            res.status(500).json({
                message: "leave not found"
            })
        })
}

exports.rejectLeave = (req, res) => {
    const uid = req.body.uid;
    const approver_comment = req.body.approver_comment;

    api_leave.findOne({
        where: {
            uid: uid,
        }
    })
        .then((data) => {
            data.update({
                leave_status: "false123",
                approver_comment: approver_comment,

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
                message: "leave not found"
            })
        })
}
exports.commentLeave = (req, res) => {
    const uid = req.body.uid;
    const immediet_suppervisor_comment = req.body.immediet_suppervisor_comment;
    api_leave.findOne({
        where: {
            uid: uid,
        }
    })
        .then((data) => {
            data.update({
                immediet_suppervisor_comment: immediet_suppervisor_comment,
            })
                .then(() => {
                    res.status(200).json({
                        message: "leave commented successful"
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
                message: "leave not found"
            })
        })
}
