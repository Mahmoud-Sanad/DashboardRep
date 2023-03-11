const router = require("express").Router();
const storageController = require("../controllers/storageController");
router.route("/").get(storageController.getStorage);
router.route("/create").post(storageController.createStorage);
router.route("/additem").post(storageController.addItems);
module.exports = router;
