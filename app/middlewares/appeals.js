const jwt = require("jsonwebtoken");
require("dotenv").config({
	path: "./app/.env",
});
const db = require("../models");
const uuid = require("uuid");
const app_appeal = db.app_appeal;
const attachment_requests = db.attachment_requests;
const app_appeal_attachments = db.app_appeal_attachments;
const app_attachment_titles = db.attachment_titles;

//===================================
// APPEAL EXISTANCE MIDDLE WARE
//===================================
appealExistance = (req, res, next) => {
	const userId = req.body.userId;
	const organization_id = req.body.organization_id;
	const punishment_id = req.body.punishment_id;
	const punishment_date = req.body.punishment_date;
	app_appeal
		.findOne({
			where: {
				created_by: userId,
				organization_id: organization_id,
				punishment_types_id: punishment_id,
				punishment_date: punishment_date,
			},
		})
		.then(appeal => {
			if (appeal) {
				res.status(402).json({
					en_message: "This appeal has already been registered",
					sw_message: "Rufaa hii tayari imekwisha sajiliwa",
				});
				return;
			}

			next();
		})
		.catch(err => {
			res.status(500).json({
				message: err,
			});
		});
};

appealCheck = (req, res, next) => {
	const uid = req.body.uid;
	app_appeal
		.findOne({
			where: {
				uid: uid,
			},
		})
		.then(appeal => {
			if (!appeal) {
				res.status(402).json({
					en_message: "Appeal not found",
					sw_message: "Hakuna rufaa iliyopatikana",
				});
				return;
			}
			next();
		})
		.catch(err => {
			res.status(500).json({
				message: err,
			});
		});
};

requestAttachments = (req, res, next) => {
	const attachments = req.body.attachmentTypes;
	const uid = req.body.appealUid;
	const is_appeallant_true = req.body.isAppeallantTrue;

	app_appeal
		.findOne({
			where: {
				uid: uid,
			},
		})
		.then(() => {
			for (const key in attachments) {
				const element = attachments[key];
				attachment_requests.create({
					appeal_uid: element.appealUid,
					title_name: element.titleName,
					title_code: element.titleCode,
					is_appeallant_true: is_appeallant_true,
					is_submitted: false,
				});
			}

			next();
		})
		.catch(err => {
			res.status(500).json({
				en_message: "Appeal not found",
				sw_message: "Rufaa haijapatikana",
			});
		});
};

saveDecisionAttachment = (req, res, next) => {
	const appeal_uid = req.body.appealUid;
	const decisionLetters = req.body.decisionLetters;

	app_appeal
		.findOne({
			where: {
				uid: appeal_uid,
			},
		})
		.then(data => {
			// return res.status(200).json(file);
			for (const key in decisionLetters) {
				const attachment = decisionLetters[key];

				app_attachment_titles
					.findOne({
						where: {
							title_code: attachment.attachmentCode,
						},
					})
					.then(file => {
						app_appeal_attachments.create({
							uid: uuid.v4(),
							deleted: false,
							appeal_uid: appeal_uid,
							is_appeallant_true: attachment.isAppeallantTrue,
							display_name: file.title_name,
							attachment_name: attachment.attachmentName,
							attachment_code: attachment.attachmentCode,
							attachment_path: process.env.appeal_letter_path,
							attachment_title_id: file.id,
							active: true,
							appeal_id: data.id,
							is_submitted: true,
						});
					});
			}

			next();
		})
		.catch(err => {
			res.status(500).json({
				en_message: "Appeal not found",
				sw_message: "Rufaa haitambuliki",
			});
		});
};

updateSentAttachments = (req, res) => {
	const uid = req.body.uid;
	const is_appeallant_true = req.is_appeallant_true;

	app_appeal_attachments
		.findAll({
			where: {
				appeal_uid: uid,
				is_appeallant_true: is_appeallant_true,
				deleted: false,
				is_submitted: false,
			},
		})
		.then(attachments => {
			for (const key in attachments) {
				const att_element = attachments[key];

				app_appeal_attachments
					.findOne({
						where: {
							uid: att_element.uid,
						},
					})
					.then(att_info => {
						att_info.update({
							is_submitted: true,
						});
					});
			}

			res.status(200).json({
				en_message: "Appeal submitted successful",
				sw_message: "Rufaa imewasilishwa kikamilifu",
			});
		})
		.catch(err => {
			res.status(500).json({
				en_message: "Fail to update appeal's submitted attachment details",
				sw_message: "Imeshindwa kuhusisha taarifa za vielelezo vilivyotumwa",
			});
		});
};

const checKAppeal = {
	appealExistance: appealExistance,
	appealCheck: appealCheck,
	requestAttachments: requestAttachments,
	saveDecisionAttachment: saveDecisionAttachment,
	updateSentAttachments: updateSentAttachments,
};
module.exports = checKAppeal;
