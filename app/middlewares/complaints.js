const jwt = require("jsonwebtoken");
require("dotenv").config({
	path: "./app/.env",
});

const db = require("../models");
const app_complaints = db.app_complaints;

const attachment_requests = db.attachment_requests;
const app_complaint_attachments = db.app_complaint_attachments;
const app_attachment_titles = db.attachment_titles;

//===================================
// COMPLAINT EXISTANCE MIDDLE WARE
//===================================
complaintExistance = (req, res, next) => {
	const user_id = req.body.user_id;
	const organization_id = req.body.organization_id;
	const punishment_id = req.body.punishment_id;
	const punishment_date = req.body.punishment_date;
	app_appeal
		.findOne({
			where: {
				created_by: user_id,
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

checkComplaint = (req, res, next) => {
	const uid = req.body.uid;
	app_complaints
		.findOne({
			where: {
				uid: uid,
			},
		})
		.then(complaint => {
			if (!complaint) {
				res.status(402).json({
					en_message: "Complaint not found",
					sw_message: "Hakuna malalamiko iliyopatikana",
				});
				return;
			}
			next();
		})
		.catch(err => {
			res.status(500).json({
				message: err.error,
			});
		});
};

requestAttachments = (req, res, next) => {
	const complaint_uid = req.body.complaintUid;
	const attachments = req.body.attachmentTypes;
	const is_appeallant_true = req.body.isComplainantTrue;

	for (const key in attachments) {
		const element = attachments[key];

		app_attachment_titles
			.findOne({
				where: {
					title_code: element.titleCode,
				},
			})
			.then(data => {
				// return res.status(200).json(data);
				attachment_requests.create({
					complaint_uid: element.complaintUid,
					title_name: data.title_name,
					title_code: element.titleCode,
					is_appeallant_true: is_appeallant_true,
					is_submitted: false,
				});
			});
	}

	next();
};

saveDecisionAttachment = (req, res, next) => {
	const complaint_uid = req.body.complaintUid;
	const decisionLetters = req.body.decisionLetters;

	app_complaints
		.findOne({
			where: {
				uid: complaint_uid,
			},
		})
		.then(data => {
			for (const key in decisionLetters) {
				const attachment = decisionLetters[key];

				app_attachment_titles
					.findOne({
						where: {
							title_code: attachment.attachmentCode,
						},
					})
					.then(file => {
						app_complaint_attachments.create({
							uid: uuid.v4(),
							deleted: false,
							complaint_uid: complaint_uid,
							is_complainant_true: true,
							display_name: file.title_name,
							attachment_name: attachment.attachmentName,
							attachment_code: attachment.attachmentCode,
							attachment_path: process.env.complaint_letter_path,
							attachment_title_id: file.id,
							active: true,
							complaint_id: data.id,
							is_submitted: true,
						});
					});
			}
			next();
		})
		.catch(err => {
			res.status(200).json({
				en_message: "Complaint not found",
				sw_message: "Malalamiko haitambuliki",
			});
		});
};

updateSentAttachments = (req, res) => {
	const uid = req.body.uid;
	const is_complainant_true = req.is_complainant_true;

	app_complaint_attachments
		.findAll({
			where: {
				complaint_uid: uid,
				is_complainant_true: is_complainant_true,
				deleted: false,
				is_submitted: false,
			},
		})
		.then(attachments => {
			for (const key in attachments) {
				const att_element = attachments[key];

				app_complaint_attachments
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
				en_message: "Complaint submitted successful",
				sw_message: "Malalamiko yamewasilishwa kikamilifu",
			});
		})
		.catch(err => {
			res.status(500).json({
				en_message: "Fail to update complaint's submitted attachment details",
				sw_message: "Imeshindwa kuhusisha taarifa za vielelezo vilivyotumwa",
			});
		});
};

const complaint_check = {
	// complaintExistance: complaintExistance,
	checkComplaint: checkComplaint,
	requestAttachments: requestAttachments,
	saveDecisionAttachment: saveDecisionAttachment,
	updateSentAttachments: updateSentAttachments,
};
module.exports = complaint_check;
