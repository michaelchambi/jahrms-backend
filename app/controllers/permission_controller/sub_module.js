require("dotenv").config({ path: "./app/.env" });
const db = require("../../models");
const uuid = require("uuid");
const capitalize = require("../../../node_modules/capitalize-the-first-letter");
const app_module = db.app_modules;
const app_sub_module = db.app_sub_modules;
const app_sub_module_action = db.app_sub_module_action;
const app_roles = db.roles;
const app_sub_module_permission = db.app_sub_module_permission;
const Op = db.Sequelize.Op;

exports.add = (req, res) => {
// return	console.log('the data received are',req.body);
	const name = req.body.name;
	const link = req.body.link;
	const icon = req.body.icon;
	const id = req.body.module_id;
	const display_option_value = req.body.display_option;

	app_sub_module
		.create({
			uid: uuid.v4(),
			name: name,
			link: link,
			icon:icon,
			module_id: id,
			display_option:display_option_value,
			linkName: capitalize(name.toLowerCase()).split(" ").join(""),
			active: true,
		})
		.then(data => {
			app_roles
				.findAll()
				.then(roles => {
					for (const key in roles) {
						app_sub_module_permission
							.create({
								permission: false,
								sub_module_id: data.id,
								role_id: roles[key].id,
							})
							.catch(err => {
								res.status(500).json({
									en_message:err+"Fail to add sub-module based on roles",
									sw_message:err+ "Imeshwindwa kuongeza module ndogo kulingana na majukumu",
								});
							});
					}
				})
				.then(result => {
					res.status(200).json({
						en_message: data.name + " Successfull created",
						sw_message: data.name + " Imetengenezwa kikamilifu",
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
				en_message: err+"Fail to add sub module",
				sw_message: err+" Imeshindwa kuongeza module ndogo",
			});
		});
};

exports.findAll = (req, res) => {
	app_sub_module
		.findAll({
			order: [["name", "ASC"]],
		})
		.then(data => {
			res.status(200).json({
				en_message: "Sub modules found",
				sw_message: "Module ndogo zimepatikana",
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

exports.findAllEmbeded = (req, res) => {
	app_sub_module
		.findAll({
			where:{
				display_option:'multi_2'
			},
			order: [["name", "ASC"]],
		})
		.then(data => {
			res.status(200).json({
				en_message: "Sub modules found",
				sw_message: "Module ndogo zimepatikana",
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

	app_sub_module
		.findOne({
			where: {
				uid: uid,
			},
			include: [
				{
					model: app_sub_module_action,
				},
				{
					model: app_module,
					attributes: ["uid", "name"],
				},
			],
		})
		.then(data => {
			res.status(200).json({
				en_message: "Sub module found",
				sw_message: "Module ndogo imepatikana",
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

exports.submodule = (req, res) => {
	const uid = req.body.uid;

	app_sub_module
		.findOne({
			where: {
				uid: uid,
			},
			attributes: ["uid", "name"],
			include: [
				{
					model: app_module,
					attributes: ["uid", "name"],
				},
			],
		})
		.then(data => {
			res.status(200).json({
				en_message: "Sub module found",
				sw_message: "Module ndogo imepatikana",
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
	const link = req.body.link;
	const display_option_value = req.body.display_option;
	app_sub_module
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
					link: link,
					display_option:display_option_value,
					linkName: capitalize(name.toLowerCase()).split(" ").join(""),
				})
				.then(result => {
					res.status(200).json({
						en_message: "Sub module successful updated",
						sw_message: "Module ndogo imebadilishwa kikamilifu",
					});
				})
				.catch(err => {
					res.status(500).json({
						en_message: "Fail to update sub module",
						sw_message: " Imeshindwa kubadili module ndogo",
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
	app_sub_module
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
	app_sub_module
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
