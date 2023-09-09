const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const path = require("path");
const capitalize = require("capitalize-the-first-letter");
const Op = db.Sequelize.Op;

const uuid = require('uuid');
const announcement_tbl = db.announcement;
const user=db.users;
const fs = require("fs");
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const file_names_generating_code = "abcdefghijklmnopqrstuvwxyz0123456789";

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

exports.addAannouncement = (req, res) => {
  //  return console.log('received data are ',req.files)
  const fileUrl = req.files.fileUrl;
  const extensionName = path.extname(fileUrl.name);
  const allowedExtension = [".png",".jpg","jpeg",".webp"];

  const announcement_director_path = process.env.announcement_director_path;
  const description = req.body.description;
  const announcement_register = parseInt(req.body.user_id);
  const announcement_abreve = "jot-";
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({
      message: "No files were uploaded.",
    });
  } else if (!allowedExtension.includes(extensionName)) {
    return res.status(422).send({
      message: "Invalid File | check your File format",
    });
  } else {
    announcement_tbl
      .create({
        announcement_description: description,
        content_provider: announcement_register,
        active:false,
        uid:uuid.v4(),
        announcement_folder: announcement_abreve + codegenerator(8),
        announcement_image: announcement_abreve + file_codegenerator(6) + extensionName,
      })
      .then((data) => {
        const file_path = announcement_director_path + data.announcement_folder;
        const filename = data.announcement_image;
        fs.mkdirSync(file_path, { recursive: true });
        fileUrl.mv(path.join(file_path, filename), (err) => {
          if (err) {
            return res.status(500).send({
              message: "No such file or directory" + err,
            });
          }
        });
        res.json({
          message:'Announcement'+" Successful Created",
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err+' Imekataa kuhifadhi',
        });
      });
  }
};

exports.editAnnouncement= (req, res) => {
  const id = req.body.id;
  const fileUrl = req.files.fileUrl;
  const extensionName = path.extname(fileUrl.name);
  const allowedExtension = [".png",".jpg","jpeg",".webp"];
  const announcement_director_path = process.env.announcement_director_path;
  const description = req.body.description;
  const announcement_register = parseInt(req.body.user_id);
  const announcement_abreve = "jot-";
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({
      message: "No files were uploaded.",
    });
  } else if (!allowedExtension.includes(extensionName)) {
    return res.status(422).send({
      message: "Invalid File | check your File format",
    });
  } else {
  announcement_tbl
    .findOne({
      where: {
        id: id,
      },
    })
    .then((data) => {
      data
        .update({
          announcement_description: description,
        content_provider: announcement_register,
        active:false,
        uid:uuid.v4(),
        announcement_folder: announcement_abreve + codegenerator(8),
        announcement_image: announcement_abreve + file_codegenerator(6) + extensionName,
        })
        .then((result) => {
          const file_path = announcement_director_path + data.announcement_folder;
          const filename = data.announcement_image;
          fs.mkdirSync(file_path, { recursive: true });
          fs.mkdirSync(path, { recursive: true });
          res.status(200).send({
            message:'Announcement'+" Successful Created",
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
    });
  }
};

exports.findOne = (req, res) => {
  const id = req.body.id;
  announcement_tbl
    .findOne({
      where: {
        id: id,
      },
      include: [
        { model: user ,as:"provider"},
        { model: user ,as:"approver"},
      ],
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};






exports.findAllFree = (req, res) => {

  announcement_tbl
    .findAll({ where:{active:true},
      include: [
        { model: user ,as:"provider"},
        { model: user ,as:"approver"},
      ],
      order: [["createdAt", "ASC"]],
    })
    .then((data) => {
    
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.findAll = (req, res) => {

  announcement_tbl
    .findAll({
      include: [
        { model: user ,as:"provider"},
        { model: user ,as:"approver"},
      ],
      order: [["createdAt", "ASC"]],
    })
    .then((data) => {
    
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.activate = (req, res) => {
  // return console.log('the data received are ',req.body)
  const id = req.body.uid;
  const user_id=req.body.user_id;

  announcement_tbl
    .findOne({
      where: {
        id: id,
      },
    })
    .then((data) => {
      data
        .update({
          active: true,
          content_approver:user_id
        })
        .then((result) => {
          res.status(200).send({
            message:  " Successful activated",
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.errors[0].message,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.deactivate = (req, res) => {
  const id = req.body.uid;

  announcement_tbl
    .findOne({
      where: {
        id: id,
      },
    })
    .then((data) => {
      data
        .update({
          active: false,
        })
        .then((result) => {
          res.status(200).send({
            message: " Successful deactivated",
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.errors[0].message,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.mobile_findOne = (req, res) => {
  // return console.log('data received are ',req.body)
  const id = req.params.id;
  announcement_tbl
    .findOne({
      where: {
        id: id,
      },
      include: [
        { model: user ,as:"provider"},
        { model: user ,as:"approver"},
      ],
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.mobile_findAll = (req, res) => {
  announcement_tbl
    .findAll({
      where: {
        summon_assignment: 1,
      },
      order: [["received_date", "ASC"]],
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.countReceivedAnnouncements = (req, res) => {
  announcement_tbl
    .count()
    .then((totalData) => {
      res.json(totalData);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error while Retrieving Judgement items",
      });
    });
};



exports.download = (req, res) => {
  const summonfolder = req.params.d1r3c7095;
  const fileName = req.params.name;
  const directoryPath = "../../../STORAGES/hrm-storage-files/announcement/";
  res.download(
    directoryPath + summonfolder + "/" + fileName,
    fileName,
    (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
    }
  );
};
