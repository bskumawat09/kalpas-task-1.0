const express = require("express");
const {
	getAllBooks,
	getSingleBook,
	addBook,
	editBook,
	deleteBook,
} = require("../controllers/books");

const router = express.Router();

router.get("/", getAllBooks);

router.get("/:id", getSingleBook);

router.post("/", addBook);

router.put("/:id", editBook);

router.delete("/:id", deleteBook);

module.exports = router;
