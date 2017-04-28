/*jslint unparam: true, node: true */

var pgp = require('pg-promise')();
var connection = process.env.DATABASE_URL || 'postgres:///catalog';
var db = pgp(connection);

var statements = {
    CREATE: "INSERT INTO Books (isbn, title, subtitle, author, published, publisher, pages, description, website) VALUES (${isbn}, ${title}, ${subtitle}, ${author}, ${published}, ${publisher}, ${pages}, ${description}, ${website}) RETURNING isbn",
    READ: "SELECT * FROM Books WHERE isbn = $1",
    READ_ALL: "SELECT * FROM Books",
    UPDATE: "UPDATE Books SET title = ${title}, subtitle = ${subtitle}, author = ${author}, published = ${published}, publisher = ${publisher}, pages = ${pages}, description = ${description}, website = ${website} WHERE isbn = ${isbn}",
};

var bookModel = {

    create: function(book, results) {
        db.one(statements.CREATE, book)
            .then(function(book) {
                results(book.isbn);
            });
    },

    read: function(isbn, results) {
        db.oneOrNone(statements.READ, isbn)
            .then(function(book) {
                results(book);
            });
    },

    readAll: function(results) {
        db.any(statements.READ_ALL)
            .then(function(books) {
                results(books);
            });
    },

    update: function(book, results) {
        // TODO
    },

    delete: function(isbn, callback) {
        // TODO
    }

};

module.exports = bookModel;