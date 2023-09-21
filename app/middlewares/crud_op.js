const dotenv = require("dotenv");
const fop = require("./file_processing");
dotenv.config();
const db = require("../models");
const path = require("path");
const Op = db.Sequelize.Op;
const uid = require('uuid');
const file_names_generating_code = "abcdefghijklmnopqrstuvwxyz0123456789";



function file_codegenerator(length) {
    let result = "";
    const characterLength = file_names_generating_code.length;
    for (let i = 0; i < length; i++) {
        result += file_names_generating_code.charAt(Math.floor(Math.random() * characterLength));
    }
    return result;
}  



function creatingData(tbl_name,req_combined){

    exports.addBankInfo = (res) => {
        // return console.log('bank details are ',req.body,req.files)
        //  const card_copy = req.files.card_copy;
        //  const extensionName = path.extname(card_copy.name);
        //  const allowedExtension = [".png",".jpg","jpeg",".webp"];
        //  const file_abrev = "bnk-";
        //  const personal_folder=req.body.personal_folder;
        //  const bank_id = req.body.bank_id;
        //  const employee = req.body.employee_id;
        //  const account_no = req.body.account_number;
        //  const account_name=req.body.account_name;
        //  const employee_folder_path = process.env.employee_directory_path;
        //  if (!req.files || Object.keys(req.files).length === 0) {
        //      return res.status(400).send({
        //        message: "No files were uploaded.",
        //      });
        //    } else if (!allowedExtension.includes(extensionName)) {
        //      return res.status(422).send({
        //        message: "Invalid File | check your File format",
        //      });
        //    } else {
            tbl_name.create({req_combined}).then((data) => {
                 
                 const file_path = employee_folder_path + personal_folder;
                 const filename = data.card_copy;
                 fop.fileUploading(file_path,filename,card_copy);
                 res.json({
                     message: data.account_name + " Successful Created"
                 });
     
             }).catch((err) => {
                 res.status(500).send({message: err.message});
             });
         };
    //  };
     
}module.exports={creatingData};
