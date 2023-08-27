const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require('nodemailer');

module.exports = {

    transport: nodemailer.createTransport({
		host: process.env.Mail_Host,
        port: process.env.Mail_Port,
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            // user: process.env.Mail_User,
            // pass: process.env.Mail_Pass
            user: "34d0c2cee1b7c8",
            pass: "ffbbc1120843a6"
        }
	}),

    // transport: nodemailer.createTransport({
    //     host: "sandbox.smtp.mailtrap.io",
    //        port: 2525,
    //     auth: {
    //         user: "34d0c2cee1b7c8",
    //         pass: "ffbbc1120843a6"
    //     }
    // }),

    mail(email, fullname, password) {
        return mailOptions = {
            from: '"Judiciary Of Tanzania" <info@judiciary.go.tz>',
            to: email,
            subject: 'Activate Account',
            text: 'Hey there, it mail from Judiciary of Tanzania',
            html: 'Hello! ' + fullname + '<br><br> Your account with the e-mail address: ' + email + ' has been created.<br><br>Please follow the button below to activate your account.<br><br>Activation code: ' + password + '<br><br><a href="http://localhost:4200/activate-account" style="background-color: #008CBA; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">Activate Account</a><br><br><br><br><b>The Governement Chemist Laboratory Authority</b>.',
        }
    },

    USER_SIGNUP_MAIL(email, fullname, password) {
		return (mailOptions = {
			from: '"Judiciary Of Tanzania" <info@judiciary.go.tz>',
			to: email,
			subject: "HRM ACCOUNT",
			text: 'Hey there, it mail from Judiciary of Tanzania',
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
			from: '"Judiciary Of Tanzania" <info@judiciary.go.tz>',
			to: email,
			subject: "CHANGE YOUR PASSWORD",
			text: 'Hey there, it mail from Judiciary of Tanzania',
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

    passwordResetMail(email, fullname, code) {
        return mailOptions = {
            from: '"Judiciary Of Tanzania" <info@judiciary.go.tz>>',
            to: email,
            subject: 'Password Reset',
            text: 'Hey there, it is the mail from Expert Witness System ',
            html: 'Hello! ' + fullname + '<br><br> Reset your password associated with the e-mail address: ' + email + '.<br><br>Please click the button below to reset your password.<br><br><a href="http://localhost:4200/reset-password/' + code + '" style="background-color: #008CBA; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">Reset Password</a><br><br><br><br><b>The Governement Chemist Laboratory Authority</b>.',
        }
    }
};



// var transport = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "34d0c2cee1b7c8",
//       pass: "ffbbc1120843a6"
//     }
//   });