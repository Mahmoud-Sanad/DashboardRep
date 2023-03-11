const Counter = require("./counter");
const mongoose = require("mongoose");
const productReqSchema = new mongoose.Schema({
    id: Number,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },

    Totalprice: {
        type: Number,
    },
    status: {
        type: String,
        enum: ["Pending", "Delivering", "Completed"],
        default: "Pending",
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
    },
    quantity: {
        type: Number,
    },
});
productReqSchema.pre("save", async function (next) {
    const counter = await Counter.findById("counter");
    if (!counter) {
        let newCounter = await Counter.create({
            _id: "counter",
            counter: 1000,
        });
        this.id = newCounter.counter;
        newCounter.counter++;
        await newCounter.save();
    } else {
        this.id = counter.counter;
        counter.counter++;
        await counter.save();
    }
    await this.populate({
        path: "product",
        select: "-__v",
    });
    console.log(this);
    this.Totalprice = this.product.price * this.quantity;
    next();
});

productReqSchema.pre(/^find/, function (next) {
    this.populate({
        path: "product",
        select: "name price",
    });
    this.populate({
        path: "branch",
        select: "address",
    });
    next();
});
const ProductReq = mongoose.model("ProductReq", productReqSchema);
module.exports = ProductReq;
