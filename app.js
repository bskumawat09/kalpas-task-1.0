const express = require("express");
const multer = require("multer");
const { uploadCsv } = require("./controllers/upload");
const bookRoutes = require("./routes/books");
const authRoutes = require("./routes/auth");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
require("dotenv").config();
const cors = require("cors");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// express session setup
const sessionStore = MongoStore.create({
	mongoUrl: process.env.DB_STRING,
	collectionName: "sessions",
});

app.use(
	session({
		store: sessionStore,
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 24 * 60 * 60 * 1000 },
	})
);

// passport setup
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

// for debuging
app.use((req, res, next) => {
	console.log("req.user", req.user);
	console.log(req.session);
	next();
});

// routes
app.use("/books", bookRoutes);
app.use("/auth", authRoutes);
app.post("/upload", upload.single("book-csv"), uploadCsv);

// home route
app.get("/", (req, res) => {
	res.send("Welcome to Book-CSV API Task");
});

// for invalid routes
app.all("*", (req, res, next) => {
	next(new Error("resource not found"));
});

// custom error handler
app.use((err, req, res, next) => {
	res.status(400).json({
		status: "error",
		code: 400,
		name: err.name,
		message: err.message,
	});
});

// databse connection
const { connectDb } = require("./config/database");
connectDb();

const port = 3000;
app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});
