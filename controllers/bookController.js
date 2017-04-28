/*jslint unparam: true, node: true */

var bookModel = require("../models/bookModel.js");

// INFO: Using HTTP Methods for RESTful Services
// http://www.restapitutorial.com/lessons/httpmethods.html

var bookController = {
    /** Creates a new Book on the Model. */
    post: function(request, response) {
        "use strict";
        var book = request.body;
        if (book.isbn) {
            var existing = bookModel.read(book.isbn);
            if (existing) {
                response.status(409).end();
            } else {
                bookModel.create(book);
                response.location("/books/" + book.isbn);
                response.status(201).end();
            }
        } else {
            response.status(400).end();
        }
    },

    /** Retrieves a Book by Id from the Model. */
    get: function(request, response) {
        "use strict";
        // ISBN guaranteed by Router
        var isbn = request.params.id;
        var book = bookModel.read(isbn);
        if (book) {
            response.status(200).json(book);
        } else {
            response.status(404).end();
        }
    },

    /** Retrieves all Books on the Model. */
    getAll: function(request, response) {
        "use strict";
        var books = bookModel.readAll();
        // Collection guaranteed by books.sqlite3 -- no need for 204 "No Content"
        response.status(200).json(books);
    },

    /** Updates a Book on the Model. */
    put: function(request, response) {
        "use strict";
        // ISBN guaranteed by Router
        var isbn = request.params.id;
        var updated = request.body;
        if (updated.isbn) {
            var existing = bookModel.read(isbn);
            if (existing) {
                bookModel.update(updated, existing);
                response.status(204).end();
            } else {
                response.status(404).end();
            }
        } else {
            response.status(400).end();
        }
    },

    /** Deletes a Book by ISBN on the Model. */
    delete: function(request, response) {
        "use strict";
        // ISBN guaranteed by Router
        var isbn = request.params.id;
        bookModel.delete(isbn);
        response.status(204).end();
    }

};

module.exports = bookController;