const mongoose = require("mongoose");
const branchSchema = new mongoose.Schema({
    address: {
        type: String,
        required: [true, "branch must have an address!!"],
    },
    stock: {
        type: Number,
    },
    storage: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: Number,
        },
    ],
});
branchSchema.pre(/^find/, function (next) {
    this.populate({ path: "storage.item", select: "name price" });
    next();
});
const Branch = mongoose.model("Branch", branchSchema);
module.exports = Branch;
