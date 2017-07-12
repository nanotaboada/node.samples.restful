/*jslint unparam: true, node: true */

var bookController = require("../controllers/bookController.js"),
    express = require("express"),
    router = express.Router();

// INFO: Using HTTP Methods for RESTful Services
// http://www.restapitutorial.com/lessons/httpmethods.html

// Entire Collection
router.get("/api/v1/books", bookController.getAll);
router.post("/api/v1/books", bookController.post);

// Specific Item
router.get("/api/v1/books/:id", bookController.get);
router.put("/api/v1/books/:id", bookController.put);
router.delete("/api/v1/books/:id", bookController.delete);

module.exports = router;