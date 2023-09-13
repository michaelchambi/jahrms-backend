require("dotenv").config({
	path: "./app/.env",
});
const db = require("../../models");
const organization = db.organization;
const punishment = db.punishment_types;
const attachment = db.attachment_titles;
const axios = require("axios").default;

const Op = db.Sequelize.Op;

exports.organization_update = (req, res) => {
	const basicAuth = Buffer.from(`${process.env.LOGIN_USERNAME}:${process.env.LOGIN_PASSWORD}`).toString("base64");
	const data = new URLSearchParams();
	data.append("grant_type", process.env.LOGIN_GRANT_TYPE);
	data.append("username", process.env.LOGIN_USERNAME);
	data.append("password", process.env.LOGIN_PASSWORD);

	axios({
		method: process.env.LOGIN_METHOD,
		url: process.env.LOGIN_ENDPOINT,
		headers: {
			Authorization: `Basic ${basicAuth}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: data,
	})
		.then(info => {
			axios({
				method: process.env.REGISTRATION_METHOD,
				url: process.env.ORGANIZATION_LIST,

				headers: { Authorization: "Bearer " + info.data.access_token },
			})
				.then(data => {
					const list = data.data;
					// return res.status(200).json(list);
					for (const key in list) {
						const data_list = list[key];
						// return res.status(200).json(key);
						organization.create({
							code: data_list.organizationCode,
							name: data_list.organizationName,
							email: data_list.email,
							address: data_list.postalAddress,
							sector_code: data_list.sectorCode,
							sector_name: data_list.sectorName,
						});
					}

					res.status(200).json({
						en_message: "Organization successful updated",
						sw_message: "Taasisi zimewekwa kikamilifu",
					});
				})
				.catch(err => {
					res.status(500).json({
						en_message: "Fail to connect to Core system",
						sw_message: "Imeshindwa kuunganishwa na Core system",
						Error: err,
					});
				});
		})
		.catch(err => {
			res.status(500).json({
				en_message: "Something went wrong, Kindly try again",
				sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadae",
			});
		});
};

// exports.get_organization = (req, res) => {
// 	organization
// 		.findAll()
// 		.then(data => {
// 			res.status(200).json({
// 				en_message: "List of organization found",
// 				sw_message: "Orodha ya taasisi zilizopatikana",
// 				data: data,
// 			});
// 		})
// 		.catch(err => {
// 			res.status(500).json({
// 				en_message: "Something went wrong, Kindly try again",
// 				sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadae",
// 			});
// 		});
// };

exports.show_organization = (req, res) => {
	const code = req.params.code;

	organization
		.findOne({
			where: {
				code: code,
			},
		})
		.then(data => {
			res.status(200).json({
				en_message: "Organization found",
				sw_message: "Taasisi imepatikana",
				data: data,
			});
		})
		.catch(err => {
			res.status(500).json({
				en_message: "Something went wrong, Kindly try again",
				sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadae",
			});
		});
};

exports.get_punishment = (req, res) => {
	punishment
		.findAll()
		.then(data => {
			res.status(200).json({
				en_message: "List of punishment found",
				sw_message: "Orodha ya adhabu zilizopatikana",
				data: data,
			});
		})
		.catch(err => {
			res.status(500).json({
				en_message: "Something went wrong, Kindly try again",
				sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadae",
			});
		});
};

exports.show_punishment = (req, res) => {
	const code = req.params.code;

	punishment
		.findOne({
			where: {
				code: code,
			},
		})
		.then(data => {
			res.status(200).json({
				en_message: "Punishment found",
				sw_message: "Adhabu imepatikana",
				data: data,
			});
		})
		.catch(err => {
			res.status(500).json({
				en_message: "Something went wrong, Kindly try again",
				sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadae",
			});
		});
};

exports.get_attachment_tittle = (req, res) => {
	attachment
		.findAll()
		.then(data => {
			res.status(200).json({
				en_message: "Attachment tittle found",
				sw_message: "List ya vielelezo imepatikana",
				data: data,
			});
		})
		.catch(err => {
			res.status(500).json({
				en_message: "Something went wrong, Kindly try again",
				sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadae",
			});
		});
};
