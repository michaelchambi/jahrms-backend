const axios = require('axios').default;
require('dotenv').config();
const db = require("../../models");
const api_court = db.api_court;
const Op = db.Sequelize.Op;


exports.add = (req, res)=>{
    const court_name = req.body.name;
    const court_code = req.body.code;

    api_court.create({
        name:court_name,
        code:court_code,
        status: true,
    })
    .then((data)=>{
        res.status(200).json({
            message:'court added successfull',
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message:"Kindly try again"+err
        })
    })
}

exports.edit = (req, res)=>{
    const id = req.body.id;
    const name = req.body.name;
    const code = req.body.code;

    api_court.findOne({
        where:{
            id:id,
        }
    })
    .then((data)=>{
        data.update({
            name:name,
            code:code
        })
        .then(()=>{
            res.status(200).json({
                message:"court updated successful"
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message:"Fail to update"
            })
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message:"Court not found"
        }) 
    })
}

exports.findAll = (req, res)=>{
    const status = req.body.status;

    api_court.findAndCountAll()
    .then((data)=>{
        res.status(200).json({
            message:"Court(s) found",
            courts:data
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message:" No court found"
        })
    })
}

exports.findOne = (req, res)=>{
    const id = req.body.id;

    api_court.findOne({
        where:{
            id:id
        }
    })
    .then((data)=>{
        res.status(200).json({
            message:"Court details",
            court: data
        })
    })
    .catch(()=>{
        res.status(500).json({
            message:"Court not found"
        })
    })
}

exports.activate = (req, res)=>{
    const id = req.body.id;

    api_court.findOne({
        where:{
            id:id,
        }
    })
    .then((data)=>{
        data.update({
            status:true,
        })
        .then(()=>{
            res.status(200).json({
                message:"court activated successful"
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message:"Fail to activate"
            })
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message:"Court not found"
        }) 
    }) 
}
exports.deactivate = (req, res)=>{
    const id = req.body.id;

    api_court.findOne({
        where:{
            id:id,
        }
    })
    .then((data)=>{
        data.update({
            status:false,
        })
        .then(()=>{
            res.status(200).json({
                message:"court deactivated successful"
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message:"Fail to deactivate"
            })
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message:"Court not found"
        }) 
    }) 
}

exports.getCourts = (req, res)=>{
    axios({
        method:"GET",
        url: process.env.get_courts,
        responseType:"json",

    })
    .then((courts)=>{
        res.status(200).json({
            message:"Court(s) found",
            data:courts.data
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message:"Something went wrong in eCMS, Kindly try again"+err
        })
    })
}

exports.showCourts = (req, res)=>{
    const court_id = req.body.court_id
    axios({
        method:"GET",
        url: process.env.show_courts+court_id,
        responseType:"json",

    })
    .then((courts)=>{
        res.status(200).json({
            message:"Court(s) found",
            data:courts.data
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message:"Something went wrong in eCMS, Kindly try again"
        })
    })
}