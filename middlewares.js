module.exports.isAuthentic = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	next(new Error("you are not authenticated"));
};
