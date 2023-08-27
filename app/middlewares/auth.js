const jwt = require("jsonwebtoken");
require("dotenv").config({
	path: "./app/.env",
});
const db = require("../models");
const users = db.users;
const app_appeal = db.app_appeal;
const app_complaints = db.app_complaints;
const Op = db.Sequelize.Op;
const axios = require("axios").default;
//===================================
// USER EXISTANCE MIDDLE WARE
//===================================
userExistance = (req, res, next) => {
	const email = req.body.email;
	const national_id = req.body.national_id;
	users
		.findOne({
			where: {
				[Op.or]: [{ email: email }, { national_id: national_id }],
			},
		})
		.then(user => {
			if (user) {
				res.status(402).json({
					en_message: "User account already exist",
					sw_message: "Akaunti ya mtumiaji tayari ipo",
				});
				return;
			}

			next();
		})
		.catch(err => {
			res.status(500).json({
				message: "Something went wrong Hear" +err,
			});
		});
};
//===================================
// VERIFY TOKEN
//===================================
verifyToken = (req, res, next) => {
	let token = req.headers["x-access-token"];

	if (!token) {
		return res.status(403).json({
			en_message: "No token provided",
			sw_message: "Hakuna tokeni iliyopokelewa",
			token: 0,
		});
	}

	jwt.verify(token, process.env.secret, (err, decoded) => {
		if (err) {
			return res.status(401).json({
				en_message: "Session Expired..!",
				sw_message: "Session Imekwisha muda..!",
				token: 0,
			});
		}
		req.userId = decoded.id;
		next();
	});
};

verifyUser = (req, res, next) => {
	const email = req.body.email;

	users
		.findOne({
			where: {
				email: email,
			},
		})
		.then(data => {
			if (!data) {
				return res.status(500).json({
					en_message: "User not registered..!",
					sw_message: "Mtumiaji hajasajiliwa",
				});
			}

			if (!data.active) {
				return res.status(500).json({
					en_message: "Account Deactivated, Contact System Administrator",
					sw_message: "Akaunti imezuiliwa, Wasiliana na msimamizi wa mfumo",
				});
			}

			next();
		})
		.catch(err => {
			res.status(504).json({
				en_message: "Something went wrong, Kindly try again",
				sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadae",
			});
		});
};

checkActiveAppeal = (req, res) => {
	const uid = req.body.uid;
	const name = req.name;
	const email = req.email;
	const phone = req.phone;

	users
		.findOne({
			where: {
				uid: uid,
			},
		})
		.then(data => {
			app_appeal
				.count({
					where: {
						created_by: data.id,
						is_submitted: true,
						active: true,
					},
				})
				.then(appeal => {
					if (appeal > 0) {
						const userData = {
							phone: phone,
							email: email,
							name: name,
						};

						const basicAuth = Buffer.from(`${process.env.LOGIN_USERNAME}:${process.env.LOGIN_PASSWORD}`).toString("base64");
						const login_data = new URLSearchParams();
						login_data.append("grant_type", process.env.LOGIN_GRANT_TYPE);
						login_data.append("username", process.env.LOGIN_USERNAME);
						login_data.append("password", process.env.LOGIN_PASSWORD);

						axios({
							method: process.env.LOGIN_METHOD,
							url: process.env.LOGIN_ENDPOINT,
							headers: {
								Authorization: `Basic ${basicAuth}`,
								"Content-Type": "application/x-www-form-urlencoded",
							},
							data: login_data,
						})
							.then(data => {
								const token = data.data.access_token;

								axios({
									method: process.env.LOGIN_METHOD,
									url: process.env.CHANGE_USER_DETAILS + token,
									data: userData,
								})
									.then(results => {
										res.status(200).json({
											en_message: name + "'s infomration updated successful",
											sw_message: "Taarifa za " + name + " amebadilishwa kikamilifu",
										});
									})
									.catch(err => {
										res.status(500).json({
											en_message: "Fail to update the information for " + name,
											sw_message: "Imeshindwa kubadili taarifa za " + name,
										});
									});
							})
							.catch(err => {
								res.status(500).json({
									en_message: "Fail to communicate with Core System",
									sw_message: "Imeshindwa kuwasiliana na Tume",
								});
							});
					}
					if (appeal == 0) {
						res.status(200).json({
							en_message: data.name + " updated successful",
							sw_message: data.name + " amebadilishwa kikamilifu",
						});
					}
				})
				.catch(err => {
					res.status(500).json({
						en_message: "Fail to know active appeals",
						sw_message: "Imeshindwa kujua rufaa zinazoendelea",
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

checkActiveComplaint = (req, res, next) => {
	const uid = req.body.uid;
	const name = req.name;
	const email = req.email;
	const phone = req.phone;

	users
		.findOne({
			where: {
				uid: uid,
			},
		})
		.then(data => {
			app_complaints
				.count({
					where: {
						created_by: data.id,
						is_submitted: true,
						active: true,
					},
				})
				.then(complaint => {
					if (complaint > 0) {
						const userData = {
							phone: phone,
							email: email,
							name: name,
						};

						const basicAuth = Buffer.from(`${process.env.LOGIN_USERNAME}:${process.env.LOGIN_PASSWORD}`).toString("base64");
						const login_data = new URLSearchParams();
						login_data.append("grant_type", process.env.LOGIN_GRANT_TYPE);
						login_data.append("username", process.env.LOGIN_USERNAME);
						login_data.append("password", process.env.LOGIN_PASSWORD);

						axios({
							method: process.env.LOGIN_METHOD,
							url: process.env.LOGIN_ENDPOINT,
							headers: {
								Authorization: `Basic ${basicAuth}`,
								"Content-Type": "application/x-www-form-urlencoded",
							},
							data: login_data,
						})
							.then(data => {
								const token = data.data.access_token;

								axios({
									method: process.env.LOGIN_METHOD,
									url: process.env.CHANGE_USER_DETAILS + token,
									data: userData,
								})
									.then(results => {
										res.status(200).json({
											en_message: name + "'s infomration updated successful",
											sw_message: "Taarifa za " + name + " amebadilishwa kikamilifu",
										});
									})
									.catch(err => {
										res.status(500).json({
											en_message: "Fail to update the information for " + name,
											sw_message: "Imeshindwa kubadili taarifa za " + name,
										});
									});
							})
							.catch(err => {
								res.status(500).json({
									en_message: "Fail to communicate with Core System",
									sw_message: "Imeshindwa kuwasiliana na Tume",
								});
							});
					}
					if (appeal == 0) {
						const name = req.name;
						const email = req.email;
						const phone = req.phone;
						next();
					}
				})
				.catch(err => {
					res.status(500).json({
						en_message: "Fail to know active appeals",
						sw_message: "Imeshindwa kujua rufaa zinazoendelea",
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

coreLogin = (req, res, next) => {
	const basicAuth = Buffer.from(`${process.env.LOGIN_USERNAME}:${process.env.LOGIN_PASSWORD}`).toString("base64");
	const login_data = new URLSearchParams();
	login_data.append("grant_type", process.env.LOGIN_GRANT_TYPE);
	login_data.append("username", process.env.LOGIN_USERNAME);
	login_data.append("password", process.env.LOGIN_PASSWORD);

	axios({
		method: process.env.LOGIN_METHOD,
		url: process.env.LOGIN_ENDPOINT,
		headers: {
			Authorization: `Basic ${basicAuth}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: login_data,
	})
		.then(data => {
			// const token = data.data.access_token
			req.token = data.data.access_token;
			req.name = "Abdulatif";
			req.title = "Title";
			req.val = {
				name: req.name,
				title: req.title,
			};
			next();
		})
		.catch(err => {
			res.status(500).json({
				en_message: "Fail to communicate with Public Services Commission",
				sw_message: "Imeshindwa kuwasiliana na Tume ya Utumishi wa Umma",
			});
		});
};

const auth = {
	userExistance: userExistance,
	verifyToken: verifyToken,
	verifyUser: verifyUser,
	checkActiveAppeal: checkActiveAppeal,
	checkActiveComplaint: checkActiveComplaint,
	coreLogin: coreLogin,
};
module.exports = auth;
