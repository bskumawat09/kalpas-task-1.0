const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			unique: true,
			required: true,
		},
		price: {
			type: Number,
			min: 0,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
		inStock: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
