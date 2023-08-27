require("dotenv").config({
	path: "./app/.env",
});
const db = require("../../models");
const fileUpload = require("express-fileupload");
const path = require("path");
const capitalize = require("../../../node_modules/capitalize-the-first-letter/capitalize");
const uuid = require("uuid");
const mail = require("../../config/mail");
const cron = require("node-cron");
const timecheck = require("../../config/intime_check");
const intime_check = require("../../config/intime_check");
const moment = require("moment");
const axios = require("axios").default;

const app_organization = db.organization;
const set_employee = db.set_employee;

exports.saveEmployee = (req, res) => {
	const token = "1a24f1cc-eb6c-453c-86e3-4d28966f1686";
	// const url_first = "http://154.118.227.74:8702/hcmis-employee-service/api/jotpagedEmployeesByOrganization/data/'"+vote+"'/0/10000?access_token=";

	const codes = [];
	const url_values = [];
	const employees = [];
	app_organization
		.findAll()
		.then(async data => {
			// for (const key in data) {
			// 	const element = data[key].code;
			// 	// codes.push(element);

			// 	const url = "http://154.118.227.74:8702/hcmis-employee-service/api/jotpagedEmployeesByOrganization/data/" + element + "/0/10000?access_token=" + token;
			// 	url_values.push(url);
			// 	await axios({
			// 		method: process.env.REGISTRATION_METHOD,
			// 		url: url,
			// 	}).then(values => {
			// 		employees.push(values.data);
			// 	});
			// }

			for (const key in data) {
				const element = data[key].code;
				// const element = "TR34";
				const url = "http://154.118.227.74:8702/hcmis-employee-service/api/jotpagedEmployeesByOrganization/data/" + element + "/0/500000?access_token=" + token;
				const result = await axios.get(url);
				// employees.push(result.data);

				for (const val in result.data) {
					const values = result.data[val];
					set_employee.create({
						account_number: values.accountNumber,
						basic_salary: values.basicSalary,
						birth_date: values.birthDate,
						branch_name: values.branchName,
						check_number: values.checkNumber,
						confirmation_date: values.confirmationDate,
						contract_end_date: values.contractEndDate,
						contract_start_date: values.contractStartDate,
						department_code: values.departmentCode,
						email: values.email,
						employment_status_code: values.employmentStatusCode,
						file_number: values.fileNumber,
						first_name: values.firstName,
						for_appointment: values.forAppointment,
						salary_grade: values.grade,
						gross_amount: values.grossAmount,
						jobclass_code: values.jobClassCode,
						jobclass_name: values.jobClassname,
						job_code: values.jobCode,
						last_name: values.lastName,
						marital_status: values.maritalStatus,
						middle_name: values.middleName,
						mobile_number: values.mobileNumber,
						national_id: values.nationalId,
						net_salary: values.netSalary,
						organization_code: values.organizationCode,
						designation_name: values.designationName,
						recategorization_date: values.recategorizationDate,
						reegangement_date: values.reegangementDate,
						rehire_date: values.rehireDate,
						salary_step: values.salaryStep,
						salary_schedule: values.schedule,
						section_code: values.sectionCode,
						sex: values.sex,
						termination_date: values.terminationDate,
						workstation_code: values.workstationCode,
						workstation_name: values.workstationName,
					});
				}
			}

			res.status(200).json({
				message: "Completed Inserted",
			});
		})
		.catch(err => {
			res.status(500).json(err);
		});
};
