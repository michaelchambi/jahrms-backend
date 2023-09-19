require("dotenv").config({
	path: "./app/.env",
});
const db = require("../../models");
const capitalize = require("../../../node_modules/capitalize-the-first-letter/capitalize");
const pass = require("../../config/password");
const uuid = require("uuid");
const mail = require("../../config/mail");
const querystring = require("querystring");
const qs = require("qs");
const users = db.users;
const role_user = db.role_user;
const role = db.roles;
const axios = require("axios").default;
const initial_password = require("../../config/password");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const { json } = require("body-parser");

const Op = db.Sequelize.Op;

exports.signupExternalUser = (req, res)=>{
	 //return console.log('tumepokea data hizi',req.body)
    const first_name = req.body.first_name;
    const middle_name = req.body.middle_name;
    const last_name = req.body.last_name;
    const phone = req.body.phone_number;
    const email = req.body.email;
	const fullname=first_name+ ' '+last_name;
	const national_id = req.body.national_id;
	const designation = req.body.designation;
    const tempPass = initial_password.password();
	const today = new Date();
	const newDate = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000);

    users.create({
        uid: uuid.v4(),
        first_name:first_name,
        middle_name:middle_name,
        last_name:last_name,
        phone_number:phone,
        email:email,
		name:fullname,
		national_id:national_id,
		designation:designation,
        isStaff:true,
        status:true,
        first_login:true,
        password: bcrypt.hashSync(tempPass,8),
		password_expiration_date: newDate,
		account_non_locked: false,
		credential_non_expired: false,
		number_of_attempt: 0,
		active: true,
		created_by: 1,
    })
    .then((data)=>{
                return res.json({
                    message: data.name+" successful registered, Kindly check your email"
                })
            
        })
        .catch((err)=>{
            res.status(500).json({
                message:"fail to create user"+err
            })
        })

    }

exports.signin = (req, res) => {
	const email = req.body.email;
	const passoword = req.body.password;
	users
		.findOne({
			where: {
				email: email,
			},
		})
		.then(data => {
			var passwordIsValid = bcrypt.compareSync(passoword, data.password);

			if (!passwordIsValid) {
				return res.status(401).json({
					accessToken: null,
					en_message: "Invalid Password!",
					sw_message: "Neno la siri limekosewa",
				});
			}

			var token = jwt.sign(
				{
					id: data.id,
				},
				process.env.secret,
				{
					expiresIn: 3600, // 24 hours : 86400 //  1hr: 3600 // 1min = 60 //5min = 300 // 1hr .5sec = 3630
				}
			);

			if (data && passwordIsValid && token) {
				role_user.findOne({where: {
					user_id: data.id,
				},include: [
					{ model: role}]
				})
				  .then((user_role_details ) => {
					// if(!user_role_details.role.name){
					// 	res.status(200).json({
					// 	en_message: "You can not Reset Email Unit you "
					// 	})
					// }
					// return console.log('login data is ',data);
					const role_name=user_role_details.role.name;
					// res.status(200).send(user_role_details );
					res.status(200).json({
						// const user_role=user_role_details.
						en_message: "Welcome " + data.name,
						sw_message: "Karibu " + data.name,
						
						data: {
							id: data.id,
							uid: data.uid,
							name: data.name,
							email: data.email,
							phone_number: data.phone_number,
							check_number: data.check_number,
							employee_number: data.employee_number,
							national_id: data.national_id,
							first_login: data.first_login,
							accessToken: token,
							staff_role:role_name
						},
					});
				  })
				
			}

		})
		.catch(err => {
			res.status(500).json({
				message: err.message,
			});
		});
};

exports.forgot_password = (req, res) => {
	const email = req.body.email;
	const tempPass = pass.passoword();
	users
		.findOne({
			where: {
				email: email,
			},
		})
		.then(data => {
			if (data) {
				data
					.update({
						first_login: true,
						password: bcrypt.hashSync(tempPass, 8),
					})
					.then(() => {
						mail.transport.sendMail(mail.USER_FORGOT_PASSWORD_MAIL(data.email, data.name, tempPass), (error, info) => {
							if (error) {
								return res.json({
									en_message: "Fail to send email to " + data.email + " but password successful forgoten ",
									sw_message: "Imeshindwa kutuma barua pepe kwenda " + data.email + "  lakin nenosiri limesahaulika kikamilifu ",
								});
							}
							return res.json({
								en_message: "You're all set, Check your email to reset password,",
								sw_message: " Congraturation !, tumekutumia barua pepe na maelekezo jinsi ya kurejesha nenosiri",
							});
						});
					});
			} else {
				res.status(401).json({
					en_message: email + " doesn't exist",
					sw_message: "Mtumiaji " + email + " hajasajiliwa",
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

exports.change_password = (req, res) => {
	const uid = req.body.uid;
	const password = req.body.password;

	users
		.findOne({
			where: {
				uid: uid,
				first_login: true,
			},
		})
		.then(data => {
			data
				.update({
					password: bcrypt.hashSync(password, 8),
					first_login: false,
				})
				.then(() => {
					res.status(200).json({
						en_message: "Password successful updated",
						sw_message: "Neno la siri limebadilika kikamilifu",
					});
				})
				.catch(() => {
					res.status(504).json({
						en_message: "Fail to update, Kindly try again",
						sw_message: "Imeshindwa kubadili neno la siri, Tafadhali jaribu tena",
					});
				});
		})
		.catch(err => {
			res.status(504).json({
				en_message: "Something went wrong, Kindly try again",
				sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadae",
			});
		});
};
