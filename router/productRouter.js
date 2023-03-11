const router = require("express").Router();
const productController = require("../controllers/productController");
router.route("/").get(productController.findProducts);
router.route("/create").post(productController.createProduct);
router.route("/edit/:name").post(productController.editProduct);
module.exports = router;
