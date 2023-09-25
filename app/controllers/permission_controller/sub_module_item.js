require("dotenv").config({ path: "./app/.env" });
const db = require("../../models");
const uuid = require("uuid");
const capitalize = require("../../../node_modules/capitalize-the-first-letter");
const app_sub_module = db.app_sub_modules;
const app_sub_module_item = db.app_submodule_item;
const app_sub_module_action = db.app_sub_module_action;
const app_roles = db.roles;
const app_sub_module_permission = db.app_sub_module_permission;
const Op = db.Sequelize.Op;

exports.add = (req, res) => {

	const name = req.body.name;
	const link = req.body.link;
	const id = req.body.submodule_id;

	app_sub_module_item
		.create({
			uid: uuid.v4(),
			name: name,
			link: link,
			submodule_id: id,
			active: true,
		})
		.then(data => {
			
            res.status(200).json({
				en_message: "Submodule Item created"
			});
				
				
		})
		.catch(err => {
			res.status(500).json({
				en_message: err+"Fail to add sub module item",
				sw_message:err.message+ " Imeshindwa kuongeza module ndogo",
			});
		});
};

exports.findAll = (req, res) => {
	app_sub_module_item
		.findAll({
			order: [["arrangement_order", "ASC"]],
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

	app_sub_module_item
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



exports.findAllSubmoduleitem = (req, res) => {
	const uid = req.body.id;
  // return console.log('kilichofika ni',req.body)
app_sub_module.findOne({
    
                where: {
                    uid: uid,
                },
            })
           
            .then(data => {
               
                app_sub_module_item
                .findAll({
                    where: {
                        submodule_id: data.id,
                    },
					order: [["arrangement_order", "ASC"]],
                })
                .then(itemList=>{
                    res.status(200).json({
                        en_message: "Sub module found",
                        sw_message: "Module ndogo imepatikana",
                        data: itemList,
                    });
                })
                
                
            })
		.catch(err => {
			res.status(500).json({
				en_message: "Something went wrong, Kindly try again",
				sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadae",
			});
		});
};


exports.findAllSubmoduleitemBySelection = (req, res) => {
	const uid = req.body.id;
  // return console.log('kilichofika ni',req.body)
app_sub_module.findOne({
    
                where: {
                    display_option: uid,
                },
            })
           
            .then(data => {
               
                app_sub_module_item
                .findAll({
                    where: {
                        submodule_id: data.id,
                    },
					order: [["arrangement_order", "ASC"]],
                })
                .then(itemList=>{
                    res.status(200).json({
                        en_message: "Sub module found",
                        sw_message: "Module ndogo imepatikana",
                        data: itemList,
                    });
                })
                
                
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

	app_sub_module_item
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
    const name = req.body.name;
	const link = req.body.link;
	const id = req.body.module_id;
	const display_option_value = req.body.display_option;
    app_sub_module_item
		.findOne({
			where: {
				uid: uid,
			},
		})
		.then(data => {
			data
				.update({
					uid: data.uid,
			name: name,
			link: link,
			submodule_id: id,
			active: true,
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
	app_sub_module_item
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
	app_sub_module_item
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
