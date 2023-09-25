const express = require("express");
const cors = require("cors");
require("dotenv").config({
  path: "./app/.env",
});
const app = express();
const fileUpload = require("express-fileupload");
const data = require("./app/models");
const config = require("./app/config/password");
const file_check = require("./app/config/directory");
const cronJob = require("./app/controllers/cron_crontrollers/cron_jobs");
const directory = require("./app/config/directory");
const url_use = "/jahrm-connect/api/";
const api_version = "v1";

// =============================================================================
// DATABASE TABLE CREATION
// =============================================================================
const filePath = [
  process.env.appeal_letter_path,
  process.env.complaint_letter_path,
];
cronJob.saveUsers();
data.sequelize
  .sync({
    alter: true,
    // force: true,
  })
  .then((result) => {
    for (key in filePath) {
      const file_path = filePath[key];
      file_check.create_directory(file_path);
    }

    directory.initial_values();
    //  directory.moduleData();

    console.log(result, " Table created...");
  })
  .catch((err) => {
    console.log(err, " Table creation failed..");
  });
// =============================================================================
// CORS CONFIGURATION
// =============================================================================
var whitelist = [
  "http://localhost:4200",
  "http://10.3.1.150:7708",
  "http://154.118.230.244:8080",
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by jot-mis-backend"));
    }
  },
};
app.use(cors(corsOptions));

// =============================================================================
// parse requests of content-type - application/x-www-form-urlencoded & JSON
// =============================================================================
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  fileUpload({
    limits: {
      fileSize: 50 * 1024 * 1024,
    },
  })
);

// =============================================================================
// ROUTES & ROUTES -- CONNECTIONS
// =============================================================================
const route = require("./app/routes/start_routes/route");
const auth = require("./app/routes/auth_routes/auth_route");
const permissions = require("./app/routes/permissions_routes/permissions_routes");
const court_level = require("./app/routes/master_data_routes/court_level");
const court = require("./app/routes/master_data_routes/api_court_rout");
const announcement = require("./app/routes/announcement/announcement");
const bank = require("./app/routes/bank/bank");
const bank_info = require("./app/routes/bank/bankInfo");
const department = require("./app/routes/master_data_routes/department");
const qualification = require("./app/routes/master_data_routes/qualification");
const zone = require("./app/routes/master_data_routes/zone");
const designation = require("./app/routes/master_data_routes/designation");
const region = require("./app/routes/master_data_routes/region");
const district = require("./app/routes/master_data_routes/district");
const ward = require("./app/routes/master_data_routes/ward");
const village = require("./app/routes/master_data_routes/village");
const units = require("./app/routes/master_data_routes/unit");
const section = require("./app/routes/master_data_routes/section");
const station = require("./app/routes/master_data_routes/station");
const scope = require("./app/routes/master_data_routes/scope");
const leave_type = require("./app/routes/master_data_routes/leave_type");
const dependant_type = require("./app/routes/master_data_routes/dependant_type");
const dependant = require("./app/routes/master_data_routes/employee/dependant");
const next_of_kin = require("./app/routes/master_data_routes/employee/next_of_kin");
const qualification_grade = require("./app/routes/master_data_routes/qualification_grade");
const cadre = require("./app/routes/master_data_routes/cadre");
const professional = require("./app/routes/master_data_routes/professional");
const skill = require("./app/routes/master_data_routes/skill");
const attachment = require("./app/routes/master_data_routes/attachment");
const designation_history = require("./app/routes/master_data_routes/designation_history");
const employmentInfo = require("./app/routes/master_data_routes/employee/employee-info");
const user_attachment = require("./app/routes/master_data_routes/user_attachment");
const spouse = require("./app/routes/master_data_routes/employee/spouse");
const marital_status = require("./app/routes/master_data_routes/employee/marital_status_details");
const working_station = require("./app/routes/master_data_routes/employee/working_station");
const transfer = require("./app/routes/transfer/transfer_routes");
const job_list = require("./app/routes/job_list_routes/job_list_routes");
const transfer_reason = require("./app/routes/transfer/transfer_reason_routes");
const designation_cahnges = require("./app/routes/change_designation_routes/promotion_routes");
const leave = require("./app/routes/leave/leave_routes");
<<<<<<< HEAD

=======
const areas = require("./app/routes/areas/areas");
>>>>>>> michael-backend

app.use(url_use + api_version, route);
app.use(url_use + api_version, auth);
app.use(url_use + api_version, permissions);
app.use(url_use + api_version, court_level);
app.use(url_use + api_version, court);
app.use(url_use + api_version, announcement);
app.use(url_use + api_version, bank);
app.use(url_use + api_version, bank_info);
app.use(url_use + api_version, qualification);
app.use(url_use + api_version, qualification_grade);
app.use(url_use + api_version, zone);
app.use(url_use + api_version, region);
app.use(url_use + api_version, district);
app.use(url_use + api_version, ward);
app.use(url_use + api_version, village);
app.use(url_use + api_version, designation);
app.use(url_use + api_version, department);
app.use(url_use + api_version, units);
app.use(url_use + api_version, section);
app.use(url_use + api_version, scope);
app.use(url_use + api_version, station);
app.use(url_use + api_version, leave_type);
app.use(url_use + api_version, dependant_type);
app.use(url_use + api_version, dependant);
app.use(url_use + api_version, next_of_kin);
app.use(url_use + api_version, cadre);
app.use(url_use + api_version, skill);
app.use(url_use + api_version, attachment);
app.use(url_use + api_version, professional);
app.use(url_use + api_version, employmentInfo);
app.use(url_use + api_version, designation_history);
app.use(url_use + api_version, user_attachment);
app.use(url_use + api_version, spouse);
app.use(url_use + api_version, marital_status);
app.use(url_use + api_version, working_station);
app.use(url_use + api_version, transfer);
app.use(url_use + api_version, job_list);
app.use(url_use + api_version, designation_cahnges);
app.use(url_use + api_version, transfer_reason);
app.use(url_use + api_version, leave);
<<<<<<< HEAD
=======
app.use(url_use + api_version, areas);
>>>>>>> michael-backend
// =============================================================================
// set port, listen for requests
// =============================================================================
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
