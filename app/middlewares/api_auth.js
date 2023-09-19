const jwt = require("jsonwebtoken");
require("dotenv").config({
	path: "./app/.env",
});
const db = require("../models");
const Op = db.Sequelize.Op;

//===================================
// VERIFY TOKEN
//===================================
verifyToken = (req, res, next) => {
	let token = req.headers["access_token"];

	if (!token) {
		return res.status(403).json({
			en_message: "No token provided",
			sw_message: "Hakuna tokeni iliyopokelewa",
		});
	}

	jwt.verify(token, process.env.secret, (err, decoded) => {
		if (err) {
			return res.status(401).json({
				en_message: "Session Expired..!",
				sw_message: "Session Imekwisha muda..!",
			});
		}
		req.user_id = decoded.id;
		next();
	});
};

const api_auth = {
	verifyToken: verifyToken,
};
module.exports = api_auth;
