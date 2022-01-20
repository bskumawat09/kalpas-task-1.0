const passport = require("passport");
const LocalStratagy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcrypt");

const verifyCallback = async (username, password, done) => {
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return done(null, false);
		}
		const isMatched = await bcrypt.compare(password, user.password);
		if (isMatched) {
			done(null, user);
		} else {
			done(null, false);
		}
	} catch (e) {
		done(e);
	}
};

const stratagy = new LocalStratagy(verifyCallback);

passport.use(stratagy);

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then((user) => {
			done(null, user);
		})
		.catch((err) => done(err));
});
