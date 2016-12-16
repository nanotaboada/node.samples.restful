/*jslint unparam: true, node: true */

// TODO: Dependency Injection
// https://blog.risingstack.com/dependency-injection-in-node-js/

var bookModel = require("../models/bookModel.js");

var bookController = {
    /**
     * Creates a new Book on the data source.
     */
    post: function (request, response) {
        "use strict";
        var book = request.body;
        if (book.isbn) {
            var existing = bookModel.read(book.isbn);
            if (existing) {
                response.status(409).json({ status: 409, message: "Conflict" });
            } else {
                bookModel.create(book);
                response.status(201).json(book);
            }
        } else {
            response.status(400).json({ status: 400, message: "Bad Request" });
        }
    },

    /**
     * Retrieves a Book by id from the data source.
     */
    get: function (request, response) {
        "use strict";
        var isbn = request.params.id; // Guaranteed by express.Router();
        var book = bookModel.read(isbn);
        if (book) {
            response.status(200).json(book);
        } else {
            response.status(404).json({ status: 404, message: "Not Found" });
        }
    },

    /**
     * Retrieves all Books from the data source.
     */
    getAll: function (request, response) {
        "use strict";
        var books = bookModel.readAll();
        response.status(200).json(books);
    },

    /**
     * Updates attributes of a Book and persist it into the data source.
     */
    put: function (request, response) {
        "use strict";
        var isbn = request.params.id, // Guaranteed by express.Router();
            updated = request.body;
        if (updated.isbn) {
            var existing = bookModel.read(isbn);
            if (existing) {
                bookModel.update(updated, existing);
                response.status(200).json(updated);
            } else {
                response.status(404).json({ status: 404, message: "Not Found" });
            }
        } else {
            response.status(400).json({ status: 400, message: "Bad Request" });
        }
    },

    /**
     * Deletes a Book by ISBN from the data source.
     */
    delete: function (request, response) {
        "use strict";
        var isbn = request.params.id; // Guaranteed by express.Router();
        bookModel.delete(isbn);
        response.status(200).json(true);
    }
};

module.exports = bookController;
