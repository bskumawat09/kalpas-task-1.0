const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const { uploadCsv } = require("./controllers/upload-csv");
const bookRoutes = require("./routes/books");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();
const upload = multer({ dest: "uploads/" });

const dbUrl = "mongodb://localhost:27017/book_csv";
const sessionStore = MongoStore.create({
	mongoUrl: dbUrl,
	collectionName: "sessions",
});

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		store: sessionStore,
		secret: "thisismytopsecret",
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 24 * 60 * 60 * 1000 },
	})
);

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
	mongoose.connect(dbUrl, {
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
