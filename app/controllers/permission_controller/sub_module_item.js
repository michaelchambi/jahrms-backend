require("dotenv").config({ path: "./app/.env" });
const db = require("../../models");
const uuid = require("uuid");
const capitalize = require("../../../node_modules/capitalize-the-first-letter");
const app_sub_module = db.app_sub_modules;
const app_sub_module_action=db.app_sub_module_action;
// const app_sub_module = db.app_sub_modules;
const app_submodule_item=db.app_submodule_item;
const app_roles = db.roles;
const app_sub_module_item_permission = db.app_sub_module_item_permission;
const Op = db.Sequelize.Op;

exports.add = (req, res) => {
    const sub_module_id = req.body.sub_module_id;
    const submodule_item_name = req.body.item_name;

	app_submodule_item
		.create({
            uid:uuid.v4(),
            name: submodule_item_name,
            submodule_id_fk: sub_module_id,
            linkName: capitalize(submodule_item_name.toLowerCase()).split(" ").join(""),
            active: true
		})
		.then(data => {
			app_roles
				.findAll()
				.then(roles => {
					for (const key in roles) {
						app_sub_module_item_permission
							.create({
								permission: false,
								sub_module_item_id: data.id,
								role_id: roles[key].id,
							})
							.catch(err => {
								res.status(500).json({
									en_message: "Fail to add sub-module based on roles",
									sw_message: "Imeshwindwa kuongeza module ndogo kulingana na majukumu",
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
};

exports.findAll = (req, res) => {
	app_submodule_item
		.findAll({
			order: [["name", "ASC"]],
		})
		.then(data => {
			res.status(200).json({
				en_message: "Sub modules item found",
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

	app_submodule_item
		.findOne({
			where: {
				uid: uid,
			},
			include: [
				{
					model: app_sub_module_action,
				},
				{
					model: app_sub_module,
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

exports.submoduleItem = (req, res) => {
	const uid = req.body.uid;

	app_submodule_item
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
	const sub_module_id = req.body.sub_module_id;
    const submodule_item_name = req.body.item_name;

	app_submodule_item
		.findOne({
			where: {
				uid: uuid,
			},
		})
		.then(data => {
			data
				.update({
					uid:uuid.v4(),
            name: submodule_item_name,
            submodule_id_fk: sub_module_id,
            linkName: capitalize(submodule_item_name.toLowerCase()).split(" ").join(""),
            active: true
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
	app_submodule_item
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
	app_submodule_item
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
