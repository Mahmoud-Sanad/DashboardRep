const Storage = require("../models/storageModel");
const catchAsync = require("../util/catchAsync");
const AppError = require("../util/AppError");
const mongoose = require("mongoose");
const ProductReq = require("../models/ProductReqModel");
const respond = (res, status, message) => {
    statusMessage = status >= 400 ? "Fail" : "Success";
    res.status(status).json({
        status: statusMessage,
        data: message,
    });
};
exports.createStorage = catchAsync(async (req, res, next) => {
    const storage = await Storage.create({
        ...req.body,
    });
    respond(res, 201, storage);
});
exports.addItems = catchAsync(async (req, res, next) => {
    const storage = await Storage.findOne({ address: "Nasr City" });
    const indexOfItem =
        storage.items.length > 0
            ? storage.items.findIndex(
                  (x) => x.item._id.toString() === req.body.item.toString()
              )
            : -1;

    if (indexOfItem !== -1) {
        storage.items[indexOfItem].quantity += +req.body.quantity;
    } else
        storage.items.push({
            item: req.body.item,
            quantity: +req.body.quantity,
        });

    await storage.save();
    respond(res, 200, storage);
});
exports.getAllReq = catchAsync(async (req, res, next) => {
    const filter = req.query ? req.query : {};
    const requests = await ProductReq.find(filter);
    respond(res, 200, requests);
});
exports.changeReqStatus = catchAsync(async (req, res, next) => {
    const request = await ProductReq.findByIdAndUpdate(
        req.params.productReqId,
        { status: req.body.status },
        { new: true }
    );
    respond(res, 200, request);
});
exports.getStorage = catchAsync(async (req, res, next) => {
    const storage = await Storage.find();
    respond(res, 200, storage);
});
