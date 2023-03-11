const mongoose = require("mongoose");
const counterSchema = new mongoose.Schema(
    {
        _id: String,
        counter: Number,
    },
    { _id: false }
);

const Counter = mongoose.model("Counter", counterSchema);
module.exports = Counter;
