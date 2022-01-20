const csv = require("csv-parser");
const fs = require("fs");
const Book = require("../models/book");

module.exports.uploadCsv = (req, res, next) => {
	// console.log("uploaded file:", req.file);
	try {
		if (!req.file) {
			next(new Error("no file found"));
			return;
		}
		const results = [];
		fs.createReadStream(req.file?.path)
			.pipe(csv())
			.on("data", (row) => {
				results.push(row);
				saveToDB(row).catch((err) => console.log("ERR:", err));
			})
			.on("end", () => {
				// Parsing completed
				console.log(`parsed ${results.length} rows`);
			});

		res.status(201).json({
			status: "success",
			file: req.file,
		});
	} catch (e) {
		next(e);
	}
};

const saveToDB = async function (data) {
	const book = new Book(data);
	await book.save();
};
