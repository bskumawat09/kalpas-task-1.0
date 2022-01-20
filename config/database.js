const mongoose = require("mongoose");

module.exports.connectDB = () => {
	mongoose.connect(process.env.DB_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	const db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error: "));

	db.once("open", function () {
		console.log("Database connected");
	});
};
