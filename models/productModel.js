const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "you need to insert product name!"],
        unique: true,
    },
    price: {
        type: Number,
        required: [true, "you need to insert product price!"],
    },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
