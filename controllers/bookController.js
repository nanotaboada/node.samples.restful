/*jslint unparam: true, node: true */

// TODO: Dependency Injection in Node.js
// https://blog.risingstack.com/dependency-injection-in-node-js/

// TODO
var bookModel = require("../models/bookModel.js");

var bookController = {
    /**
     * Creates a new Book on the data source.
     */
    post: function (request, response) {
        "use strict";
        var book = request.body;
        if (book.isbn) {
            bookModel.create(book);
            response.status(201).json(book);
        } else {
            response.status(400).json({ status: 400, message: "Bad Request" });
        }
    },

    /**
     * Retrieves a Book by id from the data source.
     */
    get: function (request, response) {
        "use strict";
        var isbn = request.params.id;
        if (isbn) {
            var book = bookModel.read(isbn);
            if (book) {
                response.status(200).json(book);
            } else {
                response.status(404).json({ status: 404, message: "Not Found" });
            }
        } else {
            response.status(400).json({ status: 400, message: "Bad Request" });
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
        var current,
            updated = request.body;
        if (updated) {
            // TODO
            current = null;
            if (current) {
                // TODO
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
        // TODO
        var book = null;
        if (book) {
            // TODO
            response.status(200).json(true);
        } else {
            response.status(404).json({ status: 404, message: "Not Found" });
        }
    }
};

module.exports = bookController;