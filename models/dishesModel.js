const mongoose = require("mongoose");
const dishesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "you need to insert dish name!"],
        unique: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, "you need to insert dish price!"],
    },
    type: {
        type: String,
    },
    products: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: Number,
        },
    ],
});
const Dishes = mongoose.model("Dishes", dishesSchema);
module.exports = Dishes;
