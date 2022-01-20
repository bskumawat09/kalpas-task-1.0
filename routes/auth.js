const express = require("express");
const passport = require("passport");
const { registerUser, loginUser, logoutUser } = require("../controllers/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post(
	"/login",
	passport.authenticate("local", { failWithError: true }),
	loginUser
);
router.post("/logout", logoutUser);

module.exports = router;
