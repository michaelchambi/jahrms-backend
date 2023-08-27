require("dotenv").config({
	path: "./app/.env",
});

const db = require("../../models");

const instructions = db.app_instructions;
const Op = db.Sequelize.Op;

exports.update = (req, res) => {
	const info = req.body.info;

	instructions
		.update(
			{
				instruction: info,
			},
			{
				where: {
					id: 1,
				},
			}
		)
		.then(() => {
			res.status(200).json({
				en_message: "Instruction successful updated",
				sw_message: "Maelekezo yamewekwa kikamilifu",
			});
		})
		.catch(err => {
			res.status(504).json({
				en_message: "Something went wrong, Kindly try again",
				sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadae",
			});
		});
};

exports.get_instruction = (req, res) => {
	instructions
		.findOne({
			where: {
				id: 1,
			},
		})
		.then(data => {
			res.status(200).json({
				en_message: "Instruction found",
				sw_message: "Maelekezo yamepatikana",
				data: data,
			});
		})
		.catch(err => {
			res.status(504).json({
				en_message: "Something went wrong, Kindly try again",
				sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadae",
			});
		});
};
