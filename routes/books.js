const express = require("express");
const {
	getAllBooks,
	getSingleBook,
	addBook,
	editBook,
	deleteBook,
} = require("../controllers/books");
const { isAuthentic } = require("../middlewares");

const router = express.Router();

router.get("/", getAllBooks);

router.get("/:id", getSingleBook);

router.post("/", isAuthentic, addBook);

router.put("/:id", isAuthentic, editBook);

router.delete("/:id", isAuthentic, deleteBook);

module.exports = router;
