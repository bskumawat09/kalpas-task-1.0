const Book = require("../models/book");

module.exports.getAllBooks = async (req, res, next) => {
	try {
		const books = await Book.find();

		res.status(200).json({
			status: "success",
			results: books.length,
			books,
		});
	} catch (e) {
		next(e);
	}
};

module.exports.getSingleBook = async (req, res, next) => {
	const book = await Book.findById(req.params.id);

	if (!book) {
		return next(new Error("book not found"));
	}
	res.status(200).json({
		status: "success",
		results: 1,
		book,
	});
};

module.exports.addBook = async (req, res, next) => {
	try {
		const book = new Book(req.body);
		await book.save();

		res.status(201).json({
			status: "success",
			book,
		});
	} catch (e) {
		next(e);
	}
};

module.exports.editBook = async (req, res, next) => {
	try {
		const book = await Book.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true }
		);
		if (!book) {
			next(new Error("book not found"));
			return;
		}
		res.status(201).json({
			status: "success",
			book,
		});
	} catch (e) {
		next(e);
	}
};

module.exports.deleteBook = async (req, res, next) => {
	try {
		const book = await Book.findByIdAndDelete(req.params.id);
		if (!book) {
			next(new Error("book not found"));
			return;
		}
		res.status(200).json({
			status: "success",
			book,
		});
	} catch (e) {
		next(e);
	}
};
