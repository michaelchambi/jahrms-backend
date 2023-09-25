const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");


function fileUploading(file_path, filename, original_file_name){
    
    fs.mkdirSync(file_path, { recursive: true });
    original_file_name.mv(path.join(file_path, filename), (err) => {
      if (err) {
        return res.status(500).send({
          message: "No such file or directory" + err,
        });
      }
    });
}
module.exports={fileUploading};


