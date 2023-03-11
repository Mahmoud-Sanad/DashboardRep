const express = require("express");
const app = express();
const cors = require("cors");
const productRouter = require("./router/productRouter");
const branchRouter = require("./router/branchRouter");
const storageRouter = require("./router/storageRouter");
const errorController = require("./controllers/errorController");
const morgan = require("morgan");
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1/branchs", branchRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/storage", storageRouter);
app.use("*", (req, res) => {
    res.status(404).json({
        status: "Fail",
        message: `${req.baseUrl} Not Found!!`,
    });
});

app.use(errorController);
module.exports = app;
