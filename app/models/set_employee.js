module.exports = (sequelize, Sequelize) => {
	const set_employee = sequelize.define("set_employee", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		account_number: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		basic_salary: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		birth_date: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		branch_name: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		check_number: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		confirmation_date: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		contract_end_date: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		contract_start_date: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		department_code: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		jobcode_description: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		email: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		employment_status_code: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		file_number: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		first_name: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		for_appointment: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
		},

		salary_grade: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		gross_amount: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		jobclass_code: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		jobclass_name: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		job_code: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		last_name: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		marital_status: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		middle_name: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		mobile_number: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		national_id: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		net_salary: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		organization_code: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		promotion_date: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		recategorization_date: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		reegangement_date: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		rehire_date: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		salary_step: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},

		salary_schedule: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		section_code: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		sex: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		termination_date: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		workstation_code: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		workstation_name: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		employee_number: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		designation_name: {
			type: Sequelize.STRING,
			allowNull: true,
		},
	});

	return set_employee;
};
