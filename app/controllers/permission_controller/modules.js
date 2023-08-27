require("dotenv").config({ path: "./app/.env" });
const db = require("../../models");
const capitalize = require("../../../node_modules/capitalize-the-first-letter");
const uuid = require("uuid");
const app_module = db.app_modules;
const app_sub_modules = db.app_sub_modules;
const app_roles = db.roles;
const app_module_permission = db.app_module_permission;
const Op = db.Sequelize.Op;

exports.add = (req, res) => {
	const name = req.body.name;
	const icon = req.body.icon;
	const display=req.body.display_option;
	const module = capitalize(name.toLowerCase());
	app_module
		.create({
			name: name,
			icon: icon,
			display_option:display,
			linkName: module.split(" ").join("-").toLowerCase(),
			active: true,
			uid: uuid.v4(),
		})
		.then(module => {
			app_roles
				.findAll()
				.then(roles => {
					for (const key in roles) {
						app_module_permission
							.create({
								permission: false,
								module_id: module.id,
								role_id: roles[key].id,
							})
							.catch(err => {
								res.status(500).json({
									en_message: "Fail to add module based on roles",
									sw_message: "Imeshwindwa kuongeza module kulingana na majukumu",
								});
							});
					}
				})
				.then(() => {
					res.status(200).json({
						en_message: module.name + " Successfull created",
						sw_message: module.name + " Imetengenezwa kikamilifu",
					});
				})
				.catch(err => {
					res.status(500).json({
						en_message: "Fail to retrieve roles",
						sw_message: " Imeshindwa kupata majukumu",
					});
				});
		})
		.catch(err => {
			res.status(500).json({
				en_message: "Fail to add module",
				sw_message: " Imeshindwa kuongeza module",
			});
		});
};

exports.findAll = (req, res) => {
	app_module
		.findAll({
			order: [["name", "ASC"]],
		})
		.then(data => {
			res.status(200).json({
				en_message: "Modules found",
				sw_message: "Module zimepatikana",
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

exports.findOne = (req, res) => {
	const uid = req.body.uid;

	app_module
		.findOne({
			where: {
				uid: uid,
			},
			include: [
				{
					model: app_sub_modules,
				},
			],
		})
		.then(data => {
			res.status(200).json({
				en_message: "Module found",
				sw_message: "Module imepatikana",
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

exports.module = (req, res) => {
	const uid = req.body.uid;

	app_module
		.findOne({
			where: {
				uid: uid,
			},
			attributes: ["uid", "name"],
			include: [
				{
					model: app_sub_modules,
					attributes: ["uid", "name"],
				},
			],
		})
		.then(data => {
			res.status(200).json({
				en_message: "Module found",
				sw_message: "Module imepatikana",
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

exports.edit = (req, res) => {
	const uid = req.body.uid;
	const name = req.body.name;
	const icon = req.body.icon;
	const module = capitalize(name.toLowerCase());

	app_module
		.findOne({
			where: {
				uid: uid,
			},
		})
		.then(data => {
			data
				.update({
					name: name,
					icon: icon,
					linkName: module.split(" ").join(""),
				})
				.then(result => {
					res.status(200).json({
						en_message: "Module successful updated",
						sw_message: "Module imebadilishwa kikamilifu",
					});
				})
				.catch(err => {
					res.status(500).json({
						en_message: "Fail to update module",
						sw_message: " Imeshindwa kubadili module",
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

exports.activate = (req, res) => {
	const uid = req.body.uid;
	app_module
		.findOne({
			where: {
				uid: uid,
			},
		})
		.then(data => {
			data.update({
				active: true,
			});
			res.status(200).json({
				en_message: data.name + " Successful activated",
				sw_message: data.name + " Imeruhusiwa kikamilifu",
			});
		})
		.catch(err => {
			res.status(500).json({
				en_message: "Something went wrong, Kindly try again",
				sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadae",
			});
		});
};

exports.deactivate = (req, res) => {
	const uid = req.body.uid;
	app_module
		.findOne({
			where: {
				uid: uid,
			},
		})
		.then(data => {
			data.update({
				active: false,
			});
			res.status(200).json({
				en_message: data.name + " Successful deactivated",
				sw_message: data.name + " Inactive kikamilifu",
			});
		})
		.catch(err => {
			res.status(500).json({
				en_message: "Something went wrong, Kindly try again",
				sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadae",
			});
		});
};
