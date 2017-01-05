/*jslint unparam: true, node: true */

// TODO: Dependency Injection
// https://blog.risingstack.com/dependency-injection-in-node-js/
var bookModel = require("../models/bookModel.js");

var bookController = {
    /** Creates a new Book on the Model. */
    post: function (request, response) {
        "use strict";
        var book = request.body;
        if (book.isbn) {
            var existing = bookModel.read(book.isbn);
            if (existing) {
                response.status(409).json({ status: 409, message: "Conflict" });
            } else {
                bookModel.create(book);
                response.location("/books/" + book.isbn);
                response.status(201).json({ status: 201, message: "Created" });
            }
        } else {
            response.status(400).json({ status: 400, message: "Bad Request" });
        }
    },

    /** Retrieves a Book by Id from the Model. */
    get: function (request, response) {
        "use strict";
        // ISBN guaranteed by Router
        var isbn = request.params.id;
        var book = bookModel.read(isbn);
        if (book) {
            response.status(200).json(book);
        } else {
            response.status(404).json({ status: 404, message: "Not Found" });
        }
    },

    /** Retrieves all Books on the Model. */
    getAll: function (request, response) {
        "use strict";
        var books = bookModel.readAll();
        // Collection guaranteed by books.sqlite3 -- no need for 204 "No Content"
        response.status(200).json(books);
    },

    /** Updates a Book on the Model. */
    put: function (request, response) {
        "use strict";
        // ISBN guaranteed by Router
        var isbn = request.params.id;
        var updated = request.body;
        if (updated.isbn) {
            var existing = bookModel.read(isbn);
            if (existing) {
                bookModel.update(updated, existing);
                response.status(204).json({ status: 204, message: "No Content" });
            } else {
                response.status(404).json({ status: 404, message: "Not Found" });
            }
        } else {
            response.status(400).json({ status: 400, message: "Bad Request" });
        }
    },

    /** Deletes a Book by ISBN on the Model. */
    delete: function (request, response) {
        "use strict";
        // ISBN guaranteed by Router
        var isbn = request.params.id;
        bookModel.delete(isbn);
        response.status(204).json({ status: 204, message: "No Content" });
    }

};

module.exports = bookController;