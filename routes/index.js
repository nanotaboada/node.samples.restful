/*jslint unparam: true, node: true */

var bookController = require("../controllers/bookController.js"),
    express = require("express"),
    router = express.Router();

// Book
router.get("/api/v1/books", bookController.getAll);
router.get("/api/v1/book/:id", bookController.get);
router.post("/api/v1/book/", bookController.post);
router.put("/api/v1/book/:id", bookController.put);
router.delete("/api/v1/book/:id", bookController.delete);

module.exports = router;