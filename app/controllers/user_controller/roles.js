require("dotenv").config({ path: "./app/.env" });
const db = require("../../models");
const capitalize = require("../../../node_modules/capitalize-the-first-letter");
const roles = db.roles;
const role_user = db.role_user;
const users = db.users;
const app_modules = db.app_modules;
const app_sub_modules = db.app_sub_modules;
const app_sub_module_action = db.app_sub_module_action;
const app_module_permission = db.app_module_permission;
const app_sub_module_permission = db.app_sub_module_permission;
const app_action_permission = db.app_action_permission;

const Op = db.Sequelize.Op;

exports.add = (req, res) => {
	const name = req.body.name;
	const modal_name = req.body.modal_name;
	roles
		.create({
			name: name,
			modal_name: modal_name,
			active: true,
		})
		.then(role => {
			app_modules
				.findAll()
				.then(module => {
					for (const key in module) {
						app_module_permission
							.create({
								permission: false,
								module_id: module[key].id,
								role_id: role.id,
							})
							.catch(err => {
								res.status(500).json({
									en_message: "Fail to add module permission",
									sw_message: "Imeshwindwa kuongeza majukumu ya module",
								});
							});
					}
				})
				.then(() => {
					app_sub_modules
						.findAll()
						.then(submodule => {
							for (const key in submodule) {
								app_sub_module_permission
									.create({
										permission: false,
										sub_module_id: submodule[key].id,
										role_id: role.id,
									})
									.catch(err => {
										res.status(500).json({
											en_message: "Fail to add sub module permission",
											sw_message: "Imeshwindwa kuongeza majukumu ya module ndogo",
										});
									});
							}
						})
						.then(() => {
							app_sub_module_action
								.findAll()
								.then(action => {
									for (const key in action) {
										app_action_permission
											.create({
												permission: false,
												action_id: action[key].id,
												role_id: role.id,
											})
											.catch(err => {
												res.status(500).json({
													en_message: "Fail to add sub module action permission",
													sw_message: "Imeshwindwa kuongeza majukumu ya vitendo vya module ndogo",
												});
											});
									}
								})
								.catch(err => {
									res.status(500).json({
										en_message: "Something went wrong to retrieve sub modules actions",
										sw_message: "Kuna shida kwenye kupata orodha vitendo vya module ndogo",
									});
								});
						})
						.then(() => {
							res.status(200).json({
								en_message: role.name + " Successfull created",
								sw_message: role.name + " Imetengenezwa kikamilifu",
							});
						})
						.catch(err => {
							res.status(500).json({
								en_message: "Something went wrong to retrieve sub modules",
								sw_message: "Kuna shida kwenye kupata orodha module ndogo",
							});
						});
				})
				.catch(err => {
					res.status(500).json({
						en_message: "Something went wrong to retrieve modules",
						sw_message: "Kuna shida kwenye kupata orodha module",
					});
				});
		})
		.catch(err => {
			res.status(500).json({
				en_message: "Fail to add roles",
				sw_message: "Imeshindwa kutengeneza majukumu",
			});
		});
};

exports.edit = (req, res) => {
	const id = req.body.id;
	const name = req.body.name;
	const modal_name = req.body.modal_name;
	const role = capitalize(name.toLowerCase());
	roles
		.findOne({
			where: {
				id: id,
			},
		})
		.then(result => {
			result.update({
				name: name,
				modal_name: modal_name,
			});

			res.status(200).json({
				en_message: "Role Successful Edited",
				sw_message: "Majukumu yamebadilishwa kikamilifu",
			});
		})
		.catch(err => {
			res.status(500).json({
				en_message: "Fail to edit roles",
				sw_message: "Imeshindwa kubadili majukumu",
			});
		});
};

exports.findOne = (req, res) => {
	const id = req.body.id;

	roles
		.findOne({
			where: {
				id: id,
			},
		})
		.then(data => {
			res.status(200).json({
				en_message: "Roles found",
				sw_message: "Majukumu yamepatikana",
				data: data,
			});
		})
		.catch(err => {
			res.status(500).json({
				en_message: "No roles found",
				sw_message: "Majukumu hayajapatikana",
			});
		});
};

exports.findAll = (req, res) => {
	roles
		.findAll({
			order: [["name", "ASC"]],
		})
		.then(data => {
			res.status(200).json({
				en_message: "Roles found",
				sw_message: "Majukumu yamepatikana",
				data: data,
			});
		})
		.catch(err => {
			res.status(500).json({
				en_message: "No roles found",
				sw_message: "Majukumu hayajapatikana",
			});
		});
};

exports.activate = (req, res) => {
	const id = req.body.id;

	roles
		.findOne({
			where: {
				id: id,
			},
		})
		.then(result => {
			result.update({
				active: true,
			});

			res.status(200).json({
				en_message: "Role Successful Activated",
				sw_message: "Jukumu limeruhusiwa kikamilifu",
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
	const id = req.body.id;

	roles
		.findOne({
			where: {
				id: id,
			},
		})
		.then(result => {
			result
				.update({
					active: false,
				})
				.then(() => {
					res.status(200).json({
						en_message: "Role Successful Activated",
						sw_message: "Jukumu limeruhusiwa kikamilifu",
					});
				})
				.catch(err => {
					res.status(500).json({
						en_message: "Fail to deactive role",
						sw_message: "Imeshindwa kuzuia  jukumu",
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

exports.changeRoles = (req, res) => {
	const roles = req.body.roles;
	const uid = req.body.uid;

	users
		.findOne({
			where: {
				uid: uid,
			},
		})
		.then(data => {
			role_user
				.destroy({
					where: {
						userId: data.id,
					},
				})
				.then(() => {
					for (const key in roles) {
						const element = roles[key];

						role_user.create({
							role_id: element,
							userId: data.id,
						});
					}

					res.status(200).json({
						en_message: "Roles successful changes",
						sw_message: "Majukumu yamebadilishwa kikamilifu",
					});
				})
				.catch(err => {
					res.status(500).json({
						en_message: "Fail to identify roles assigned before",
						sw_message: "Imeshindwa kutambua majukumu aliyokuwa nayo awali",
					});
				});
		})
		.catch(err => {
			res.status(500).json({
				en_message: "Fail to identify user",
				sw_message: "Imeshindwa kutambua mtumiaji",
			});
		});
};
