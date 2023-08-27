require("dotenv").config({
	path: "./app/.env",
});
const nodemailer = require("nodemailer");

const from = '"Judiciary of Tanzania" <noreply@judiciary.go.tz>';
const text = "This is a valid Email from, Judiciary Of Tanzania ";

module.exports = {
	// PRODUCTION CONFIGURATION
	//===========================
	transport: nodemailer.createTransport({
		host: process.env.jot_mail_Host,
		port: process.env.jot_mail_Port,
		secure: false,
		auth: {
			user: process.env.jot_mail_User,
			pass: process.env.jot_mail_Pass,
		},
		tls: {
			rejectUnauthorized: false,
		},
	}),

	// DEVELOPMENT CONFIGURATION
	//===========================
	// transport: nodemailer.createTransport({
	// 	host: process.env.Mail_Host,
	// 	port: process.env.Mail_Port,
	// 	auth: {
	// 		user: process.env.Mail_User,
	// 		pass: process.env.Mail_Pass,
	// 	},
	// }),

	USER_SIGNUP_MAIL(email, fullname, password) {
		return (mailOptions = {
			from: from,
			to: email,
			subject: "HRM ACCOUNT",
			text: text,
			html:
				"Hi! <b>" +
				fullname +
				" </b><br><br> Your account email : <b><i>" +
				email +
				"</i></b> Successfully Created.<br><br>Click the Button to Change the Password.<br><br>Your Temporary Password: <b>" +
				password +
				"</b><br><br><a href='" +
				process.env.portal_link +
				"' style='background-color: #008CBA; color: white; padding: 10px; text-align: center; text-decoration: none; display: inline-block;'>JOT-MIS Portal</a> <br> <br>For more information</p><br><b>JUDICIARY OF TANZANIA,</b><br>Jengo la Chimwaga (UDOM), Ghorofa ya 2<br>2 Barabara ya UDOM <br>S.L.P 9004,<br>40405 DAR ES SALAAM<br>Tanzania<br>+255 XXXXX / +255 XXXXXX<br>info@judiciary.go.tz<br>www.judiciary.go.tz.",
		});
	},

	USER_FORGOT_PASSWORD_MAIL(email, fullname, password) {
		return (mailOptions = {
			from: from,
			to: email,
			subject: "CHANGE YOUR PASSWORD",
			text: text,
			html:
				"Hi! <b>" +
				fullname +
				" </b><br><br> The passqword relating to email : <b><i>" +
				email +
				"</i></b> has successfully changed.<br><br> Click the Button below to Change the Password.<br><br>Your Temporary Password: <b>" +
				password +
				"</b><br><br><a href='" +
				process.env.portal_link +
				"' style='background-color: #008CBA; color: white; padding: 10px; text-align: center; text-decoration: none; display: inline-block;'>JOT-MIS Portal</a> <br> <br>For more information</p><br><b>JUDICIARY OF TANZANIA,</b><br>Jengo la Chimwaga (UDOM), Ghorofa ya 2<br>2 Barabara ya UDOM <br>S.L.P 9004,<br>40405 DAR ES SALAAM<br>Tanzania<br>+255 XXXXX / +255 XXXXXX<br>info@judiciary.go.tz<br>www.judiciary.go.tz.",
		});
	},

	APPEAL_SUBMISSION_MAIL(email, fullname, organization, punishment, number) {
		return (mailOptions = {
			from: from,
			to: email,
			subject: "KUWASILISHA RUFAA",
			text: text,
			html:
				"Habari! <b>" +
				fullname +
				" </b><br><br> Rufaaa yako ya kupinga adhabu ya <b>" +
				punishment +
				"</b> uliyopewa na Mamlaka ya nidhamu  <b>" +
				organization +
				"</b> imewasilishwa kwa katibu wa Tume kikamilifu na kupewa namba ya usajili <b>" +
				number +
				"</b>.<br>Tumia namba hii ya usajili wakati wa kufuatilia rufaa yako.<br><br>Kwa maelezo zaidi wasiliana na Tume ya Utumishi wa Umma</p><br><b>Katibu,<br>Ofisi ya Rais,<br>Tume ya Utumishi wa Umma,</b><br>Chuo Kikuu cha Dodoma (UDOM),<br>Jengo la Chimwaga (UDOM), Ghorofa ya 2<br>2 Barabara ya UDOM <br>S.L.P 1074,<br>40405 DODOMA<br>Tanzania<br>+255 738 166 703 / +255 733 005 974<br>secretary@jot.go.tz<br>www.jot.go.tz.",
		});
	},

	APPEAL_ORGANIZATION_ATTACHMENT_REQUEST(email, name, workstation, appeal_number, submission_date, punishment, deadline) {
		return (mailOptions = {
			from: from,
			to: email,
			subject: "MAOMBI YA KUWASILISHA VIELELEZO",
			text: text,
			html:
				"<p style='line-height: 1.6;'>Habari!<br> Ofisi yako inaombwa kuwasilisha vielelezo pamoja na majibu ya hoja ya barua ya rufaa ya ndugu <b>" +
				name +
				"</b> (Kituo cha kazi: " +
				workstation +
				") iliyowasilishwa kwa Katibu wa Tume tarehe <b>" +
				submission_date +
				"</b> nakupewa namba ya usajili <b>" +
				appeal_number +
				"</b> akipinga adhabu ya <b>" +
				punishment +
				" </b>.</p><p style='line-height: 1.6;'>Unaombwa kuwasilisha vielelezo na majibu ya hoja ya rufaa hii ndani ya <b>siku 14</b> kwa njia ya mfumo, mwisho wa kuwasilisha ni tarehe <b>" +
				deadline +
				"</b>. <br><br>Kuingia kwenye mfumo bofya kitufe:<br> <a href='" +
				process.env.portal_link +
				"' style='background-color: #008CBA; color: white; padding: 10px; text-align: center; text-decoration: none; display: inline-block;'>JOT-MIS Portal</a> <br> <br>Kwa maelezo zaidi wasiliana na Tume ya Utumishi wa Umma</p><br><b>Katibu,<br>Ofisi ya Rais,<br>Tume ya Utumishi wa Umma,</b><br>Chuo Kikuu cha Dodoma (UDOM),<br>Jengo la Chimwaga (UDOM), Ghorofa ya 2<br>2 Barabara ya UDOM <br>S.L.P 1074,<br>40405 DODOMA<br>Tanzania<br>+255 738 166 703 / +255 733 005 974<br>secretary@jot.go.tz<br>www.jot.go.tz.",
		});
	},

	APPEAL_ORGANIZATION_ATTACHMENT_REQUEST_ADDITION(email, name, workstation, appeal_number, submission_date, punishment) {
		return (mailOptions = {
			from: from,
			to: email,
			subject: "MAOMBI YA KUWASILISHA VIELELEZO VYA ZIADA",
			text: text,
			html:
				"<p style='line-height: 1.6;'>Habari!<br> Ofisi yako inaombwa kuwasilisha vielelezo vya ziada vya rufaa ya ndugu <b>" +
				name +
				"</b> (Kituo cha kazi: " +
				workstation +
				") iliyowasilishwa kwa Katibu wa Tume tarehe <b>" +
				submission_date +
				"</b> nakupewa namba ya usajili <b>" +
				appeal_number +
				"</b> akipinga adhabu ya <b>" +
				punishment +
				" </b>.</p><p style='line-height: 1.6;'>Unaombwa kuwasilisha vielelezo hivyo vya ziada kwa njia ya mfumo,<br><br>Kuingia kwenye mfumo bofya kitufe:<br> <a href='" +
				process.env.portal_link +
				"' style='background-color: #008CBA; color: white; padding: 10px; text-align: center; text-decoration: none; display: inline-block;'>JOT-MIS Portal</a> <br> <br>Kwa maelezo zaidi wasiliana na Tume ya Utumishi wa Umma</p><br><b>Katibu,<br>Ofisi ya Rais,<br>Tume ya Utumishi wa Umma,</b><br>Chuo Kikuu cha Dodoma (UDOM),<br>Jengo la Chimwaga (UDOM), Ghorofa ya 2<br>2 Barabara ya UDOM <br>S.L.P 1074,<br>40405 DODOMA<br>Tanzania<br>+255 738 166 703 / +255 733 005 974<br>secretary@jot.go.tz<br>www.jot.go.tz.",
		});
	},

	APPEAL_APPLICANTS_ATTACHMENT_REQUEST_ADDITION(email, name, workstation, appeal_number, submission_date, punishment) {
		return (mailOptions = {
			from: from,
			to: email,
			subject: "MAOMBI YA KUWASILISHA VIELELEZO VYA ZIADA",
			text: text,
			html:
				"<p style='line-height: 1.6;'>Habari!<br> Ndugu <b>" +
				name +
				"</b> (Kituo cha kazi: " +
				workstation +
				")  unaombwa kuwasilisha vielelezo vya ziada vya rufaa yako iliyowasilishwa kwa Katibu wa Tume tarehe <b>" +
				submission_date +
				"</b> na kupewa namba ya usajili <b>" +
				appeal_number +
				"</b> ukipinga adhabu ya <b>" +
				punishment +
				" </b>.</p><p style='line-height: 1.6;'>Unaombwa kuwasilisha vielelezo hivyo vya ziada kwa njia ya mfumo,<br><br>Kuingia kwenye mfumo bofya kitufe:<br> <a href='" +
				process.env.portal_link +
				"' style='background-color: #008CBA; color: white; padding: 10px; text-align: center; text-decoration: none; display: inline-block;'>JOT-MIS Portal</a> <br> <br>Kwa maelezo zaidi wasiliana na Tume ya Utumishi wa Umma</p><br><b>Katibu,<br>Ofisi ya Rais,<br>Tume ya Utumishi wa Umma,</b><br>Chuo Kikuu cha Dodoma (UDOM),<br>Jengo la Chimwaga (UDOM), Ghorofa ya 2<br>2 Barabara ya UDOM <br>S.L.P 1074,<br>40405 DODOMA<br>Tanzania<br>+255 738 166 703 / +255 733 005 974<br>secretary@jot.go.tz<br>www.jot.go.tz.",
		});
	},

	APPEAL_APPLICANT_RECEIVE_DECISION(email, name, workstation, appeal_number) {
		return (mailOptions = {
			from: from,
			to: email,
			subject: "UAMUZI WA RUFAA",
			text: text,
			html:
				"<p style='line-height: 1.6;'>Habari!<br> Ndugu <b>" +
				name +
				"</b> (Kituo cha kazi: " +
				workstation +
				") rufaa yako yenye usajili wa namba <b>" +
				appeal_number +
				"</b> imeamuliwa.</p><p style='line-height: 1.6;'>Tafadhali ingia kwenye Mfumo ili kuona Uamuzi uliotolewa<br><br>Kuingia kwenye mfumo bofya kitufe:<br> <a href='" +
				process.env.portal_link +
				"' style='background-color: #008CBA; color: white; padding: 10px; text-align: center; text-decoration: none; display: inline-block;'>JOT-MIS Portal</a> <br> <br>Kwa maelezo zaidi wasiliana na Tume ya Utumishi wa Umma</p><br><b>Katibu,<br>Ofisi ya Rais,<br>Tume ya Utumishi wa Umma,</b><br>Chuo Kikuu cha Dodoma (UDOM),<br>Jengo la Chimwaga (UDOM), Ghorofa ya 2<br>2 Barabara ya UDOM <br>S.L.P 1074,<br>40405 DODOMA<br>Tanzania<br>+255 738 166 703 / +255 733 005 974<br>secretary@jot.go.tz<br>www.jot.go.tz.",
		});
	},

	APPEAL_ORGANIZATION_RECEIVE_DECISION(email, name, workstation, appeal_number) {
		return (mailOptions = {
			from: from,
			to: email,
			subject: "UAMUZI WA RUFAA",
			text: text,
			html:
				"<p style='line-height: 1.6;'>Habari!<br> Rufaa ya Ndugu <b>" +
				name +
				"</b> (Kituo cha kazi: " +
				workstation +
				") yenye usajili wa namba <b>" +
				appeal_number +
				"</b> imeamuliwa.</p><p style='line-height: 1.6;'>Tafadhali ingia kwenye Mfumo ili kuona Uamuzi uliotolewa<br><br>Kuingia kwenye mfumo bofya kitufe:<br> <a href='" +
				process.env.portal_link +
				"' style='background-color: #008CBA; color: white; padding: 10px; text-align: center; text-decoration: none; display: inline-block;'>JOT-MIS Portal</a> <br> <br>Kwa maelezo zaidi wasiliana na Tume ya Utumishi wa Umma</p><br><b>Katibu,<br>Ofisi ya Rais,<br>Tume ya Utumishi wa Umma,</b><br>Chuo Kikuu cha Dodoma (UDOM),<br>Jengo la Chimwaga (UDOM), Ghorofa ya 2<br>2 Barabara ya UDOM <br>S.L.P 1074,<br>40405 DODOMA<br>Tanzania<br>+255 738 166 703 / +255 733 005 974<br>secretary@jot.go.tz<br>www.jot.go.tz.",
		});
	},

	COMPLAINT_SUBMISSION_MAIL(email, fullname, organization, number) {
		return (mailOptions = {
			from: from,
			to: email,
			subject: "KUWASILISHA MALALAMIKO",
			text: text,
			html:
				"Habari! <b>" +
				fullname +
				" </b><br><br> Malalamiko yako dhidi ya <b>" +
				organization +
				"</b> yamewasilishwa kwa katibu wa Tume kikamilifu na kupewa namba ya usajili <b>" +
				number +
				"</b>.<br>Tumia namba hii ya usajili wakati wa kufuatilia malalamiko yako.<br><br>Kwa maelezo zaidi wasiliana na Tume ya Utumishi wa Umma</p><br><b>Katibu,<br>Ofisi ya Rais,<br>Tume ya Utumishi wa Umma,</b><br>Chuo Kikuu cha Dodoma (UDOM),<br>Jengo la Chimwaga (UDOM), Ghorofa ya 2<br>2 Barabara ya UDOM <br>S.L.P 1074,<br>40405 DODOMA<br>Tanzania<br>+255 738 166 703 / +255 733 005 974<br>secretary@jot.go.tz<br>www.jot.go.tz.",
		});
	},

	COMPLAINT_APPLICANTS_ATTACHMENT_REQUEST_ADDITION(email, name, workstation, complaint_number, submission_date) {
		return (mailOptions = {
			from: from,
			to: email,
			subject: "MAOMBI YA KUWASILISHA VIELELEZO VYA ZIADA",
			text: text,
			html:
				"<p style='line-height: 1.6;'>Habari!<br> Ndugu <b>" +
				name +
				"</b> (Kituo cha kazi: " +
				workstation +
				")  unaombwa kuwasilisha vielelezo vya ziada vya malalamiko yako iliyowasilishwa kwa Katibu wa Tume tarehe <b>" +
				submission_date +
				"</b> nakupewa namba ya usajili <b>" +
				complaint_number +
				".</p><p style='line-height: 1.6;'>Unaombwa kuwasilisha vielelezo hivyo vya ziada kwa njia ya mfumo,<br><br>Kuingia kwenye mfumo bofya kitufe:<br> <a href='" +
				process.env.portal_link +
				"' style='background-color: #008CBA; color: white; padding: 10px; text-align: center; text-decoration: none; display: inline-block;'>JOT-MIS Portal</a> <br> <br>Kwa maelezo zaidi wasiliana na Tume ya Utumishi wa Umma</p><br><b>Katibu,<br>Ofisi ya Rais,<br>Tume ya Utumishi wa Umma,</b><br>Chuo Kikuu cha Dodoma (UDOM),<br>Jengo la Chimwaga (UDOM), Ghorofa ya 2<br>2 Barabara ya UDOM <br>S.L.P 1074,<br>40405 DODOMA<br>Tanzania<br>+255 738 166 703 / +255 733 005 974<br>secretary@jot.go.tz<br>www.jot.go.tz.",
		});
	},

	COMPLAINT_ORGANIZATION_ATTACHMENT_REQUEST_ADDITION(email, name, workstation, complaint_number, submission_date) {
		return (mailOptions = {
			from: from,
			to: email,
			subject: "MAOMBI YA KUWASILISHA VIELELEZO VYA ZIADA",
			text: text,
			html:
				"<p style='line-height: 1.6;'>Habari!<br> Ofisi yako inaombwa kuwasilisha vielelezo vya ziada vya malalamiko ya ndugu <b>" +
				name +
				"</b> (Kituo cha kazi: " +
				workstation +
				") iliyowasilishwa kwa Katibu wa Tume tarehe <b>" +
				submission_date +
				"</b> nakupewa namba ya usajili <b>" +
				complaint_number +
				".</p><p style='line-height: 1.6;'>Unaombwa kuwasilisha vielelezo hivyo vya ziada kwa njia ya mfumo,<br><br>Kuingia kwenye mfumo bofya kitufe:<br> <a href='" +
				process.env.portal_link +
				"' style='background-color: #008CBA; color: white; padding: 10px; text-align: center; text-decoration: none; display: inline-block;'>JOT-MIS Portal</a> <br> <br>Kwa maelezo zaidi wasiliana na Tume ya Utumishi wa Umma</p><br><b>Katibu,<br>Ofisi ya Rais,<br>Tume ya Utumishi wa Umma,</b><br>Chuo Kikuu cha Dodoma (UDOM),<br>Jengo la Chimwaga (UDOM), Ghorofa ya 2<br>2 Barabara ya UDOM <br>S.L.P 1074,<br>40405 DODOMA<br>Tanzania<br>+255 738 166 703 / +255 733 005 974<br>secretary@jot.go.tz<br>www.jot.go.tz.",
		});
	},

	COMPLAINT_ORGANIZATION_ATTACHMENT_REQUEST(email, name, workstation, complaint_number, submission_date, deadline) {
		return (mailOptions = {
			from: from,
			to: email,
			subject: "MAOMBI YA KUWASILISHA VIELELEZO",
			text: text,
			html:
				"<p style='line-height: 1.6;'>Habari!<br> Ofisi yako inaombwa kuwasilisha vielelezo pamoja na majibu ya hoja ya barua ya malalmiko ya ndugu <b>" +
				name +
				"</b> (Kituo cha kazi: " +
				workstation +
				") iliyowasilishwa kwa Katibu wa Tume tarehe <b>" +
				submission_date +
				"</b> nakupewa namba ya usajili <b>" +
				complaint_number +
				".</p><p style='line-height: 1.6;'>Unaombwa kuwasilisha vielelezo na majibu ya hoja ya malalamiko hayo ndani ya <b>siku 14</b> kwa njia ya mfumo, mwisho wa kuwasilisha ni tarehe <b>" +
				deadline +
				"</b>. <br><br>Kuingia kwenye mfumo bofya kitufe:<br> <a href='" +
				process.env.portal_link +
				"' style='background-color: #008CBA; color: white; padding: 10px; text-align: center; text-decoration: none; display: inline-block;'>JOT-MIS Portal</a> <br> <br>Kwa maelezo zaidi wasiliana na Tume ya Utumishi wa Umma</p><br><b>Katibu,<br>Ofisi ya Rais,<br>Tume ya Utumishi wa Umma,</b><br>Chuo Kikuu cha Dodoma (UDOM),<br>Jengo la Chimwaga (UDOM), Ghorofa ya 2<br>2 Barabara ya UDOM <br>S.L.P 1074,<br>40405 DODOMA<br>Tanzania<br>+255 738 166 703 / +255 733 005 974<br>secretary@jot.go.tz<br>www.jot.go.tz.",
		});
	},

	COMPLAINT_APPLICANT_RECEIVE_DECISION(email, name, workstation, complaint_number) {
		return (mailOptions = {
			from: from,
			to: email,
			subject: "UAMUZI WA MALALAMIKO",
			text: text,
			html:
				"<p style='line-height: 1.6;'>Habari!<br> Ndugu <b>" +
				name +
				"</b> (Kituo cha kazi: " +
				workstation +
				") malalamiko yako yenye usajili wa namba <b>" +
				complaint_number +
				"</b> yameamuliwa.</p><p style='line-height: 1.6;'>Tafadhali ingia kwenye Mfumo ili kuona Uamuzi uliotolewa<br><br>Kuingia kwenye mfumo bofya kitufe:<br> <a href='" +
				process.env.portal_link +
				"' style='background-color: #008CBA; color: white; padding: 10px; text-align: center; text-decoration: none; display: inline-block;'>JOT-MIS Portal</a> <br> <br>Kwa maelezo zaidi wasiliana na Tume ya Utumishi wa Umma</p><br><b>Katibu,<br>Ofisi ya Rais,<br>Tume ya Utumishi wa Umma,</b><br>Chuo Kikuu cha Dodoma (UDOM),<br>Jengo la Chimwaga (UDOM), Ghorofa ya 2<br>2 Barabara ya UDOM <br>S.L.P 1074,<br>40405 DODOMA<br>Tanzania<br>+255 738 166 703 / +255 733 005 974<br>secretary@jot.go.tz<br>www.jot.go.tz.",
		});
	},

	COMPLAINT_ORGANIZATION_RECEIVE_DECISION(email, name, workstation, complaint_number) {
		return (mailOptions = {
			from: from,
			to: email,
			subject: "UAMUZI WA MALALAMIKO",
			text: text,
			html:
				"<p style='line-height: 1.6;'>Habari!<br> Malalamiko ya Ndugu <b>" +
				name +
				"</b> (Kituo cha kazi: " +
				workstation +
				") yenye usajili wa namba <b>" +
				complaint_number +
				"</b> yameamuliwa.</p><p style='line-height: 1.6;'>Tafadhali ingia kwenye Mfumo ili kuona Uamuzi uliotolewa<br><br>Kuingia kwenye mfumo bofya kitufe:<br> <a href='" +
				process.env.portal_link +
				"' style='background-color: #008CBA; color: white; padding: 10px; text-align: center; text-decoration: none; display: inline-block;'>JOT-MIS Portal</a> <br> <br>Kwa maelezo zaidi wasiliana na Tume ya Utumishi wa Umma</p><br><b>Katibu,<br>Ofisi ya Rais,<br>Tume ya Utumishi wa Umma,</b><br>Chuo Kikuu cha Dodoma (UDOM),<br>Jengo la Chimwaga (UDOM), Ghorofa ya 2<br>2 Barabara ya UDOM <br>S.L.P 1074,<br>40405 DODOMA<br>Tanzania<br>+255 738 166 703 / +255 733 005 974<br>secretary@jot.go.tz<br>www.jot.go.tz.",
		});
	},
};
