require("dotenv").config({
	path: "./app/.env",
});
const db = require("../../models");
const uuid = require("uuid");
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const api_users = db.api_users;

exports.signup = (req, res) => {
	const organization = req.body.organization;
	const system = req.body.system;
	const access_name = req.body.access_name;
	const password = req.body.password;
	const created_by = req.body.created_by;
	api_users
		.create({
			organization: organization,
			system: system,
			access_name: access_name,
			password: bcrypt.hashSync(password, 8),
			active: true,
			created_by: created_by,
		})
		.then(api => {
			res.status(200).json({
				en_message: api.system + " successfull allowed to exchange data",
				sw_message: api.system + " imeruhusiwa kikamilifu kubadilishana taarifa",
			});
		})
		.catch(err => {
			res.status(500).json({
				en_message: "Something went wrong, Kindly try again  ",
				sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadae",
			});
		});
};

exports.signin = (req, res) => {
	const name = req.body.client_id;
	const password = req.body.client_secret;

	api_users
		.findOne({
			where: {
				access_name: name,
			},
		})
		.then(user => {
			var passwordIsValid = bcrypt.compareSync(password, user.password);

			if (!passwordIsValid) {
				return res.status(401).json({
					accessToken: null,
					en_message: "Invalid Password!",
					sw_message: "Neno la siri limekosewa",
				});
			}

			if (!user.active) {
				return res.status(401).json({
					message: "Unathorized url!",
				});
			}

			var token = jwt.sign({ id: user.id }, process.env.secret, {
				expiresIn: 86400, // 24 hours : 86400 //  1hr: 3600 // 1min = 60
			});

			if (user && passwordIsValid && token) {
				api_users
					.findOne({
						where: {
							access_name: user.access_name,
						},
					})
					.then(data => {
						res.status(200).json({
							message: "Successfull login to access API",
							access_token: token,
						});
					})
					.catch(err => {
						res.status(500).json({
							message: err.message,
						});
					});
			}
		})
		.catch(err => {
			res.status(500).json({
				en_message: "Something went wrong, Kindly try again",
				sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadae",
			});
		});
};

exports.findOne = (req, res) => {};

exports.update = (req, res) => {};

exports.changePassword = (req, res) => {};

exports.findAll = (req, res) => {};

exports.activate = (req, res) => {};

exports.deactivate = (req, res) => {};
