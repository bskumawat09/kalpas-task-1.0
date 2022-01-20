const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const { uploadCsv } = require("./controllers/upload-csv");
const bookRoutes = require("./routes/books");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.json());

app.use("/books", bookRoutes);
app.post("/upload-csv", upload.single("book-csv"), uploadCsv);

// home resource
app.get("/", (req, res) => {
	res.send("Welcome to Book-CSV API Task");
});

// for all the other invalid routes
app.all("*", (req, res, next) => {
	next(new Error("resource not found"));
});

// custom error handler
app.use((err, req, res, next) => {
	res.status(400).json({
		status: "error",
		code: 400,
		message: err.message,
	});
});

// databse connection
const connectDB = () => {
	mongoose.connect("mongodb://localhost:27017/book_csv", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	const db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error: "));

	db.once("open", function () {
		console.log("Database connected");
	});
};

connectDB();

const port = 3000;
app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});
