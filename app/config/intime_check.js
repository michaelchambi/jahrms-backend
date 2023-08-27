require("dotenv").config({
	path: "./app/.env",
});
const { toInteger } = require("lodash");

module.exports = {
	appealTimeCheck(receival_date) {
		const today = new Date();
		const date_receive = new Date(receival_date);

		const timeDiff = today.getTime() - date_receive.getTime();
		const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

		if (daysDiff + 1 > 45) {
			return false;
		} else {
			return true;
		}
	},
	complaintTimeCheck(receival_date) {
		const today = new Date();
		const end = new Date(receival_date);

		const yearsDiff = today.getUTCFullYear() - end.getUTCFullYear();
		const monthsDiff = today.getUTCMonth() - end.getUTCMonth();
		const totalMonths = yearsDiff * 12 + monthsDiff;

		if (totalMonths > 12) {
			return false;
		} else {
			return true;
		}
	},

	organizationDeadline(requested_date) {
		const request = new Date(requested_date);
		// Calculate the deadline date
		request.setDate(request.getDate() + toInteger(process.env.ORGANIZATION_SUBMISSION_DAYS));

		const deadline = new Date(request);
		return deadline;
	},
};
