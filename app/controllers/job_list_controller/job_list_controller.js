const axios = require('axios').default;
require('dotenv').config();
const db = require("../../models");
const api_job_list = db.api_job_list;
const uuid = require("uuid");
const cadre = db.cadre;
const court = db.court;

exports.add = (req, res) => {
    const cadre_id = req.body.cadre_id;
    const job_list_type = "Out Post";
    const current_Number = "5"
    const minimum_number = req.body.minimum_number
    const maximum_number = req.body.maximum_number
    const court_id = req.body.court_id
    const created_by = req.body.created_by
    const created_date = req.body.created_date
    const uid = uuid.v4()
    api_job_list.findOne({ where: { cadre_id: cadre_id } })
        // api_job_list.findAll()
        .then((cadre) => {
            if (cadre != null && court_id != court_id) {
                // console.log( "Job list for this cadrea already exist" )
                message: "Job list for this cadrea already exist"
            }
            // return console.log('data ni hizi ila majanga matupu', cadre);
            else {

                api_job_list.create({
                    cadre_id: cadre_id,
                    job_list_type: job_list_type,
                    current_Number: current_Number,
                    minimum_number: minimum_number,
                    maximum_number: maximum_number,
                    court_id: court_id,
                    created_by: created_by,
                    created_date:created_date,
                    uid: uid,
                    leave_status: "default",


                })
                    .then((data) => {
                        res.status(200).json({
                            message: 'Job List application is successfull',
                        })
                    })
            }

        })

        .catch((err) => {
            res.status(500).json({
                message: "Kindly try again" + err
            })
        })
}


exports.edit = (req, res) => {
    // return console.log('data',req.body);
    const id = req.body.id;
    const minimum_number = req.body.minimum_number;
    const maximum_number = req.body.maximum_number;
    const created_by = req.body.created_by;


    api_job_list.findOne({
        where: {
            id: id,
        }
    })
        .then((data) => {

            data.update({
                id: data.id,
                minimum_number: minimum_number,
                maximum_number: maximum_number,
                created_by: created_by,
                status: "default",
            })
                .then(() => {
                    res.status(200).json({
                        message: "Job List updated successful"
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Job List to update"
                    })
                })
        })
        .catch((err) => {
            res.status(500).json({
                message: "Job List not found"
            })
        })
}
exports.findAllJOTJobList = (req, res) => {
    api_job_list.findAll({
        where: {
            status: "Final Post",

        },
        include: [{ model: cadre }, { model: court }],
        // order: [
        //     ["name", "ASC"]
        // ]
    }).then((data) => {
        const job_list = data;
        res.status(200).send(job_list);

    })
        .catch((err) => {
            res.status(500).json({
                message: " No job_list found"
            })
        })
};
exports.findAll = (req, res) => {
    api_job_list.findAll({
        where:{
            job_list_type:"Out Post",
            status:"default"
        },
        include: [{ model: cadre },{ model: court }],
        // order: [
        //     ["name", "ASC"]
        // ]
    }).then((data) => {
        const job_list = data;
        res.status(200).send(job_list);

    })
        .catch((err) => {
            res.status(500).json({
                message: " No job_list found"
            })
        })
};

exports.findAllApproved = (req, res) => {
    api_job_list.findAll({
        where:{
            job_list_type:"Out Post",
            status:"approved"
        },
        include: [{ model: cadre },{ model: court }],
        // order: [
        //     ["name", "ASC"]
        // ]
    }).then((data) => {
        const job_list = data;
        res.status(200).send(job_list);

    })
        .catch((err) => {
            res.status(500).json({
                message: " No job_list found"
            })
        })
};


exports.findAllSuppervised = (req, res) => {
    api_job_list.findAll({
        where:{
            job_list_type:"Out Post",
            status:"suppervised"
        },
        include: [{ model: cadre },{ model: court }],
        // order: [
        //     ["name", "ASC"]
        // ]
    }).then((data) => {
        const job_list = data;
        res.status(200).send(job_list);

    })
        .catch((err) => {
            res.status(500).json({
                message: " No job_list found"
            })
        })
};


exports.findAllReturned = (req, res) => {
    api_job_list.findAll({
        where:{
            job_list_type:"Out Post",
            status:"returned"
        },
        include: [{ model: cadre },{ model: court }],
        // order: [
        //     ["name", "ASC"]
        // ]
    }).then((data) => {
        const job_list = data;
        res.status(200).send(job_list);

    })
        .catch((err) => {
            res.status(500).json({
                message: " No job_list found"
            })
        })
};


exports.findOne = (req, res) => {
    const uid = req.body.uid;
    // return console.log('hizi ndio zenyewe', req.body);
    api_job_list.findOne({
        where: {
            uid: uid
        },
        include:[
            {model:court},
            {model:cadre}
        ]

    })
        .then((data) => {
            res.status(200).json({
                message: "Job List details",
                job_list: data
            })
        })
        .catch(() => {
            res.status(500).json({
                message: "Job List not found"
            })
        })
}


exports.submitJobList = (req, res) => {
    const uid = req.body.uid;

    api_job_list.findOne({
        where: {
            uid: uid,
        }
    })
        .then((data) => {

            // return console.log("hiii nayo ni aina ya data",display_option);
            data.update({
                leave_status: "immidiet_supper_visor",
            })
                .then(() => {
                    res.status(200).json({
                        message: "Successful submitted"
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: err + "Fail to submitted"
                    })
                })

        })
        .catch((err) => {
            res.status(500).json({
                message: "Job List not found"
            })
        })
}
exports.supporvisor = (req, res) => {
    const uid = req.body.uid;

    api_job_list.findOne({
        where: {
            uid: uid,
        }
    })
        .then((data) => {
            data.update({
                status:"suppervised",

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
                message: "Job List not found"
            })
        })
}

exports.approverDirectorate = (req, res) => {
    const uid = req.body.uid;

    api_job_list.findOne({
        where: {
            uid: uid,
        }
    })
        .then((data) => {
            data.update({
                status:"directorate",

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
                message: "Job List not found"
            })
        })
}
exports.approve = (req, res) => {
    const uid = req.body.uid;
    api_job_list.findOne({
        where: {
            uid: uid,
        }
    })
        .then((data) => {
            data.update({
                leave_status: approved,
            })
                .then(() => {
                    res.status(200).json({
                        message: "Job List commented successful"
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
                message: "Job List not found"
            })
        })
}
exports.return = (req, res) => {
    const uid = req.body.uid;
    const return_comment = req.body.return_comment
    api_job_list.findOne({
        where: {
            uid: uid,
        }
    })
        .then((data) => {
            data.update({
                status: "returned",
                return_comment: return_comment

            })
                .then(() => {
                    res.status(200).json({
                        message: "Successful returned"
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Fail to returned"
                    })
                })
        })
        .catch((err) => {
            res.status(500).json({
                message: "Job List not found"
            })
        })
}
