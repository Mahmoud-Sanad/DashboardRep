const Branch = require("../models/branchModel");
const Product = require("../models/productModel");
const BranchReq = require("../models/ProductReqModel");
const catchAsync = require("../util/catchAsync");
const AppError = require("../util/AppError");
const mongoose = require("mongoose");
const respond = (res, status, message) => {
    statusMessage = status >= 400 ? "Fail" : "Success";
    res.status(status).json({
        status: statusMessage,
        data: message,
    });
};
exports.findBranchs = catchAsync(async (req, res, next) => {
    const filter = req.query ? req.query : {};
    const branchs = await Branch.find(filter);
    respond(res, 200, branchs);
});
exports.createBranch = catchAsync(async (req, res, next) => {
    const branch = await Branch.create({ ...req.body });
    respond(res, 201, branch);
});
exports.editBranch = catchAsync(async (req, res, next) => {
    const branch = await Branch.findByIdAndUpdate(
        req.params.branchId,
        { ...req.body },
        { new: true }
    );
    respond(res, 200, branch);
});
exports.createProductOrder = catchAsync(async (req, res, next) => {
    const order = await BranchReq.create({
        ...req.body,
        branch: req.params.branchId,
    });
    respond(res, 201, order);
});
exports.getProductsOrders = catchAsync(async (req, res, next) => {
    const filter = req.query || "";
    const orders = await BranchReq.find(filter).sort({ status: "descending" });
    respond(res, 200, orders);
});
exports.changeStatus = catchAsync(async (req, res, next) => {
    const order = await BranchReq.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    const branch = await Branch.findOne({ name: "new cairo" });
    if (order.status === "Completed") {
        const indexOfProduct = branch.storage.findIndex(
            (x) => x.item.name === order.product.name
        );
        if (indexOfProduct !== -1) {
            branch.storage[indexOfProduct].quantity += order.quantity;
        } else {
            branch.storage.push({
                item: order.product._id,
                quantity: order.quantity,
            });
        }
    }
    await branch.save();
    respond(res, 200, order);
});
exports.addProduct = catchAsync(async (req, res, next) => {
    const branch = await Branch.findOne({ name: "new cairo" });
    const product = await Product.findOne({ name: req.body.name });

    const indexOfProduct = branch.storage.findIndex(
        (x) => x.item.name === product.name
    );
    if (indexOfProduct !== -1) {
        branch.storage[indexOfProduct].quantity += +req.body.quantity;
    } else {
        branch.storage.push({
            item: product._id,
            quantity: +req.body.quantity,
        });
    }
    await branch.save();
    respond(res, 200, branch);
});
exports.deleteRequest = catchAsync(async (req, res, next) => {
    const request = await BranchReq.findOneAndDelete({ id: req.params.id });
    console.log(request);
    respond(res, 204, "done");
});
