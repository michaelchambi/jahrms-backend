require("dotenv").config({ path: "./app/.env" });
const db = require("../../models");
const capitalize = require("../../../node_modules/capitalize-the-first-letter");
const uuid = require("uuid");
const app_sub_module_action = db.app_sub_module_action;
const app_sub_module = db.app_sub_modules;
const app_roles = db.roles;
const app_action_permission = db.app_action_permission;
const Op = db.Sequelize.Op;

exports.add = (req, res) => {
	const name = req.body.name;
	const sub_moduleId = req.body.sub_module_id;

	app_sub_module
		.findOne({
			where: {
				id: sub_moduleId,
			},
		})
		.then(submodule => {
			app_sub_module_action
				.create({
					name: name.toLowerCase(),
					sub_module_id: sub_moduleId,
					module_id: submodule.module_id,
					active: true,
					uid: uuid.v4(),
				})
				.then(data => {
					app_roles
						.findAll()
						.then(roles => {
							for (const key in roles) {
								app_action_permission
									.create({
										permission: false,
										action_id: data.id,
										role_id: roles[key].id,
									})
									.catch(err => {
										res.status(500).json({
											en_message: "Fail to add sub-module action based on roles",
											sw_message: "Imeshwindwa kuongeza Action module ndogo kulingana na majukumu",
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
						en_message: "Fail to add sub module",
						sw_message: " Imeshindwa kuongeza module ndogo",
					});
				});
		})
		.catch(err => {
			res.status(500).json({
				en_message: "Submodule not found",
				sw_message: "Hakuna module ndogo",
			});
		});
};

exports.findAll = (req, res) => {
	app_sub_module_action
		.findAll({
			order: [["name", "ASC"]],
		})
		.then(data => {
			res.status(200).json({
				en_message: "Sub module action found",
				sw_message: "Vitendo vya module ndogo vimepatikana",
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

	app_sub_module_action
		.findOne({
			where: {
				uid: uid,
			},
			include: [
				{
					model: app_sub_module,
				},
			],
		})
		.then(data => {
			res.status(200).json({
				en_message: "Sub module action found",
				sw_message: "Vitendo vya module ndogo vimepatikana",
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

exports.action = (req, res) => {
	const uid = req.body.uid;

	app_sub_module_action
		.findOne({
			where: {
				uid: uid,
			},
			attributes: ["uid", "name"],
			include: [
				{
					model: app_sub_module,
					attributes: ["uid", "name"],
				},
			],
		})
		.then(data => {
			res.status(200).json({
				en_message: "Sub module action found",
				sw_message: "Vitendo vya module ndogo vimepatikana",
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

	app_sub_module_action
		.findOne({
			where: {
				uid: uid,
			},
		})
		.then(data => {
			data
				.update({
					name: name.toLowerCase(),
				})
				.then(result => {
					res.status(200).json({
						en_message: "Sub module action successful updated",
						sw_message: "Action cha module ndogo kimebadilishwa kikamilifu",
					});
				})
				.catch(err => {
					res.status(500).json({
						en_message: "Fail to update sub module action",
						sw_message: " Imeshindwa kubadili Action cha module ndogo",
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
	app_sub_module_action
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
	app_sub_module_action
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
