/*jslint unparam: true, node: true */

// TODO: Dependency Injection
// https://blog.risingstack.com/dependency-injection-in-node-js/
var bookModel = require("../models/bookModel.js");

var bookController = {
    /** Creates a new Book on the Model. */
    post: function(request, response) {
        "use strict";
        var book = request.body;
        if (book.isbn) {
            bookModel.read(book.isbn, function(result) {
                if (result) {
                    response.status(409).json({ status: 409, message: "Conflict" });
                } else {
                    bookModel.create(book, function(result) {
                        if (result === book.isbn) {
                            response.location("/books/" + book.isbn);
                            response.status(201);
                        }
                    });
                }
            });
        } else {
            response.status(400);
        }
    },

    /** Retrieves a Book by Id from the Model. */
    get: function(request, response) {
        "use strict";
        // ISBN guaranteed by Router
        var isbn = request.params.id;
        bookModel.read(isbn, function(result) {
            if (result) {
                response.status(200).json(result);
            } else {
                response.status(404);
            }
        });
    },

    /** Retrieves all Books on the Model. */
    getAll: function(request, response) {
        "use strict";
        bookModel.readAll(function(result) {
            if (result) {
                response.status(200).json({ books: result });
            } else {
                response.status(204);
            }
        });
    },

    /** Updates a Book on the Model. */
    put: function(request, response) {
        "use strict";
        var book = request.body;
        if (book.isbn) {
            bookModel.read(book.isbn, function(result) {
                if (result) {
                    bookModel.update(book, function(result) {
                        response.status(200);
                    });
                } else {
                    response.status(404);
                }
            });
        } else {
            response.status(400);
        }
    },

    /** Deletes a Book by ISBN on the Model. */
    delete: function(request, response) {
        "use strict";
        // ISBN guaranteed by Router
        var isbn = request.params.id;
        bookModel.delete(isbn);
        response.status(204);
    }

};

module.exports = bookController;