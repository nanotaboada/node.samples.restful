/*jslint unparam: true, node: true */

var low = require("lowdb");
var db = low("books.json");

var books = {
    /**
     * Creates a new Book and persist it into the data source.
     */
    create: function (request, response) {
        "use strict";
        var book = request.body;
        if (book) {
            db("books").push(book);
            response.status(201).json(book);
        } else {
            response.status(400).json({ status: 400, message: "Bad Request" });
        }
    },

    /**
     * Retrieves a Book by id from the data source.
     */
    retrieve: function (request, response) {
        "use strict";
        var book = db("books").find({ isbn: request.params.id });
        if (book) {
            response.status(200).json(book);
        } else {
            response.status(404).json({ status: 404, message: "Not Found" });
        }
    },

    /**
     * Retrieves all Books matched by filter from the data source.
     */
    retrieveAll: function (request, response) {
        "use strict";
        response.status(200).json(db("books").value());
    },

    /**
     * Updates attributes of a Book and persist it into the data source.
     */
    update: function (request, response) {
        "use strict";
        var current,
            updated = request.body;
        if (updated) {
            current = db("books").find({ isbn: request.params.id });
            if (current) {
                db("books").chain().find({ isbn: current.isbn }).assign(updated).value();
            } else {
                response.status(404).json({ status: 404, message: "Not Found" });
            }
        } else {
            response.status(400).json({ status: 400, message: "Bad Request" });
        }
    },

    /**
     * Deletes a Book by Id from the data source.
     */
    delete: function (request, response) {
        "use strict";
        var book = db("books").find({ isbn: request.params.id });
        if (book) {
            db("books").remove({ isbn: request.params.id });
            response.status(200).json(true);
        } else {
            response.status(404).json({ status: 404, message: "Not Found" });
        }
    }
};

module.exports = books;
