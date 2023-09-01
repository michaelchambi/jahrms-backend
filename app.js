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
const court = require("./app/routes/master_data_routes/api_court_rout");
const announcement = require("./app/routes/announcement/announcement");
const bank = require("./app/routes/bank/bank");

app.use(url_use + api_version, route);
app.use(url_use + api_version, general);
app.use(url_use + api_version, auth);
app.use(url_use + api_version, permissions);
app.use(url_use + api_version, court);
app.use(url_use + api_version, announcement);
app.use(url_use + api_version, bank);

// =============================================================================
// set port, listen for requests
// =============================================================================
const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
