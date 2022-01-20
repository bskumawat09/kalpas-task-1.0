const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports.registerUser = async (req, res, next) => {
	try {
		const user = new User(req.body);
		user.password = await bcrypt.hash(user.password, 12);
		await user.save();

		res.status(201).json({
			status: "success",
			user,
		});
	} catch (e) {
		next(e);
	}
};

module.exports.loginUser = (req, res) => {
	res.status(201).json({
		status: "success",
		user: req.user,
	});
};

module.exports.logoutUser = (req, res) => {
	req.logout();
	res.status(201).json({
		status: "success",
		message: "logged out",
	});
};
