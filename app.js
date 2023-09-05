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
const filePath = [process.env.appeal_letter_path, process.env.complaint_letter_path];
cronJob.saveUsers();
data.sequelize
	.sync({
		alter: true,
		// force: true,
	})
	.then(result => {
		for (key in filePath) {
			const file_path = filePath[key];
			file_check.create_directory(file_path);
		}

		directory.initial_values();
		//  directory.moduleData();

		console.log(result, " Table created...");
	})
	.catch(err => {
		console.log(err, " Table creation failed..");
	});
// =============================================================================
// CORS CONFIGURATION
// =============================================================================
var whitelist = ["http://localhost:4200", "http://10.3.1.150:7708","http://154.118.230.244:8080"];
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
const general = require("./app/routes/general_routes/general_route");
const auth = require("./app/routes/auth_routes/auth_route");
const permissions = require("./app/routes/permissions_routes/permissions_routes");
const court_level = require("./app/routes/master_data_routes/court_level");
const court = require("./app/routes/master_data_routes/api_court_rout");
const announcement = require("./app/routes/announcement/announcement");
const bank = require("./app/routes/bank/bank");
const department = require("./app/routes/master_data_routes/department");
const qualification = require("./app/routes/master_data_routes/qualification");
const zone = require("./app/routes/master_data_routes/zone");
const designation = require("./app/routes/master_data_routes/designation");
const district = require("./app/routes/master_data_routes/district");
const ward = require("./app/routes/master_data_routes/ward");
const village = require("./app/routes/master_data_routes/village");
const units = require("./app/routes/master_data_routes/unit");
const section= require("./app/routes/master_data_routes/section");
const station= require("./app/routes/master_data_routes/station");
const scope= require("./app/routes/master_data_routes/scope");
const leave_type = require("./app/routes/master_data_routes/leave_type");
const qualification_grade = require("./app/routes/master_data_routes/qualification_grade");


app.use(url_use + api_version, route);
app.use(url_use + api_version, general);
app.use(url_use + api_version, auth);
app.use(url_use + api_version, permissions);
app.use(url_use + api_version, court_level);
app.use(url_use + api_version, court);
app.use(url_use + api_version, announcement);
app.use(url_use + api_version, bank);
app.use(url_use + api_version, department);
app.use(url_use + api_version, qualification);
app.use(url_use + api_version, qualification_grade);
app.use(url_use + api_version, zone);
app.use(url_use + api_version, village);
app.use(url_use + api_version, district);
app.use(url_use + api_version, designation);
app.use(url_use + api_version, ward);
app.use(url_use + api_version, units);
app.use(url_use + api_version, section);
app.use(url_use + api_version, scope);
app.use(url_use + api_version, station);
app.use(url_use + api_version, leave_type);
// =============================================================================
// set port, listen for requests
// =============================================================================
const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
