const Product = require("../models/productModel");
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
exports.findProducts = catchAsync(async (req, res, next) => {
    const filter = req.query ? req.query : {};
    const products = await Product.find(filter);
    respond(res, 200, products);
});
exports.createProduct = catchAsync(async (req, res, next) => {
    const product = await Product.create({ ...req.body });
    respond(res, 201, product);
});
exports.editProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findOneAndUpdate(
        { name: req.params.name },
        { ...req.body },
        { new: true }
    );
    respond(res, 200, product);
});
