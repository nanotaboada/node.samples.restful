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
            bookModel.create(book, function(error) {
                if (error) {
                    if (error.message === "SQLITE_CONSTRAINT: UNIQUE constraint failed: Books.isbn") {
                        response.status(409).json({ status: 409, message: "Conflict" });
                    } else {
                        // TODO: Test
                        response.status(500).json({ status: 500, message: "Internal Server Error" });
                    }
                } else {
                    response.status(201).json({ status: 201, message: "Created" });
                }
            });
        } else {
            response.status(400).json({ status: 404, message: "Not Found" });
        }
    },

    /** Retrieves a Book by Id from the Model. */
    get: function (request, response) {
        "use strict";
        // ISBN guaranteed by Router
        var isbn = request.params.id;
        bookModel.read(isbn, function(error, book) {
            if (error) {
                response.status(500).json({ status: 500, message: "Internal Server Error" });
            } else if (book) {
                response.status(200).json(book);
            } else {
                response.status(404).json({ status: 404, message: "Not Found" });
            }
        });
    },

    /** Retrieves all Books on the Model. */
    getAll: function (request, response) {
        "use strict";
        bookModel.readAll(function (error, books) {
            if (error) {
                // TODO: Test
                response.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                // Collection guaranteed by books.sqlite3 -- no need for 204 "No Content"
                response.status(200).json(books);
            }
        });
    },

    /** Updates a Book on the Model. */
    put: function (request, response) {
        "use strict";
        // ISBN guaranteed by Router
        var isbn = request.params.id;
        var book = request.body;
        if (Object.keys(book).length > 0) {
            bookModel.update(book, function(error) {
                if (error) {
                    // TODO: Test
                    response.status(500).json({ status: 500, message: "Internal Server Error" });
                } else {
                    response.status(204).json({ status: 204, message: "No Content" });
                }
            });
        } else {
            response.status(404).json({ status: 404, message: "Not Found" });
        }
    },

    /** Deletes a Book by ISBN on the Model. */
    delete: function (request, response) {
        "use strict";
        // ISBN guaranteed by Router
        var isbn = request.params.id;
        bookModel.delete(isbn, function(error) {
            if (error) {
                // TODO: Test
                response.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                response.status(204).json({ status: 204, message: "No Content" });
            }
        });
    }
};

module.exports = bookController;
