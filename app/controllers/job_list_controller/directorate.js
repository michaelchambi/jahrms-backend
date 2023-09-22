const axios = require('axios').default;
require('dotenv').config();
const db = require("../../models");
const api_job_list = db.api_job_list;
const uuid = require("uuid");
const cadre = db.cadre;
const court = db.court;

exports.add = (req, res) => {
    const cadre_id = req.body.cadre_id;
    const job_list_type = "Directorate Post";
    const current_Number = "2"
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
                    created_date: created_date,
                    uid: uid,
                    status: "directorate",


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
                minimum_number: minimum_number,
                maximum_number: maximum_number,
                created_by: created_by,
                status: "directorate",
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

exports.findAll = (req, res) => {
    api_job_list.findAll({
        where: {
            job_list_type: "Directorate Post",
            status: "directorate",

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




exports.findAllApproved = (req, res) => {
    api_job_list.findAll({
        where: {
            // job_list_type: "directorate Post","Main Post" ,"Out Post",
            status: "directorate"
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




exports.findOne = (req, res) => {
    const uid = req.body.uid;
    // return console.log('hizi ndio zenyewe', req.body);
    api_job_list.findOne({
        where: {
            uid: uid
        },
        include: [
            { model: court },
            { model: cadre }
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
                status: "directorate",
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


exports.approver = (req, res) => {
    const uid = req.body.uid;

    api_job_list.findOne({
        where: {
            uid: uid,
        }
    })
        .then((data) => {
            data.update({
                status: "Final Post",
                active: true

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

exports.return = (req, res) => {
    const uid = req.body.uid;
    const directorate_return_comment = req.body.directorate_return_comment
    api_job_list.findOne({
        where: {
            uid: uid,
        }
    })
        .then((data) => {
            data.update({
                status: "directorate returned",
                directorate_return_comment: directorate_return_comment

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

// exports.count_directorate = (res, req) => {
//     api_job_list.count({
//         where: {
//             status: "default",
//             job_list_type: "Out Post",

//         }
//     })
//         .then((Out_Post_Stations) => {
//             api_job_list({
//                 where: {
//                     status: "returned",
//                     job_list_type: "Out Post",
//                 }
//             })
//                 .then((returned_out_post) => {
//                     api_job_list(({
//                         where: {
//                             status: "default",
//                             job_list_type: "Main Post",
//                         }
//                     })
//                     )


//         // .then((main_Post_Stations) => {
//             res.status(200).json({
//                 message: "directorate data",
//                 data: {
//                     Out_Post_Stations: Out_Post_Stations,
//                     returned_out_post: returned_out_post,
//                     // main_Post_Stations: main_Post_Stations,
//                 },
//             })
//         // })
//     })
// })
//         .catch(err => {
//             res.status(500).json({
//                 en_message: "No draft cpmplaints found",
//                 sw_message: "Hakuna rasimu za malalamiko",
//             });
//         });


// }


exports.count_directorate = (req, res) => {
    api_job_list.count({
        where: {
            status: "default",
            job_list_type: "Out Post",
        }
    })
        .then((station_out_post) => {
            api_job_list.count({
                where: {
                    status: "return",
                    job_list_type: "Out Post",
                }
            })
                .then((returned_out_post) => {
                    api_job_list.count({
                        where: {
                            status: "default",
                            job_list_type: "Main Post",
                        }
                    })

                        .then((station_main_post) => {
                            api_job_list.count({
                                where: {
                                    status: "suppervised",
                                    job_list_type: "Out Post",
                                }
                            })

                                .then((out_post_suppervissed) => {
                                    api_job_list.count({
                                        where: {
                                            status: "directorate_returned",
                                            job_list_type: "Main Post",
                                        }
                                    })
                                        .then((returned_main_post) => {
                                            api_job_list.count({
                                                where: {
                                                    status: "default",
                                                    job_list_type: "Main Post",
                                                }
                                            })
                                                .then((directorate_job_list) => {
                                                    api_job_list.count({
                                                        where: {
                                                            status: "directorate",
                                                            job_list_type: "Directorate Post",
                                                        }
                                                    })
                                                        .then((submitted_out_post) => {
                                                            api_job_list.count({
                                                                where: {
                                                                    status: "directorate",
                                                                }
                                                            })
                                                                .then((jot_job_list) => {
                                                                    res.status(200).json({
                                                                        message: "Dashboard data",
                                                                        data: {
                                                                            station_out_post,
                                                                            returned_out_post,
                                                                            station_main_post,
                                                                            out_post_suppervissed,
                                                                            returned_main_post,
                                                                            directorate_job_list,
                                                                            submitted_out_post,
                                                                            jot_job_list
                                                                        },
                                                                    })
                                                                })
                                                        })
                                                })
                                        })
                                })
                        })
                })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "error while Retrieving Total Employee"
            });
        });

};




