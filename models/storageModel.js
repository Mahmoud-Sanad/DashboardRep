const mongoose = require("mongoose");
const storageSchema = new mongoose.Schema({
    stock: {
        type: Number,
    },
    address: {
        type: String,
    },
    items: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: Number,
        },
    ],
});
storageSchema.pre(/^find/, function (next) {
    this.populate({ path: "items.item", select: "-__v" });
    next();
});
const Storage = mongoose.model("Storage", storageSchema);
module.exports = Storage;
