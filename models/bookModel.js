/*jslint unparam: true, node: true */

// TODO: Dependency Injection
// https://blog.risingstack.com/dependency-injection-in-node-js/
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(__dirname + "/books.sqlite3");

var statements = {
    CREATE : "INSERT INTO Books (isbn, title, subtitle, author, published, publisher, pages, description, website) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    READ : "SELECT * FROM Books WHERE isbn = ?",
    READ_ALL : "SELECT * FROM Books",
    UPDATE : "UPDATE Books SET title = ?, subtitle = ?, author = ?, published = ?, publisher = ?, pages = ?, description = ?, website = ? WHERE isbn = ?",
    DELETE : "DELETE FROM Books WHERE isbn = ?"
};

var bookModel = {

    create: function (book, callback) {
        db.run(statements.CREATE, [
            book.isbn,
            book.title,
            book.subtitle,
            book.author,
            book.published,
            book.publisher,
            book.pages,
            book.description,
            book.website
        ], function(error) {
            if (error) {
                callback(error);
            } else {
                callback(null);
            }
        });
    },

    read: function (isbn, callback) {
        db.get(statements.READ, isbn, function(error, result) {
            if (error) {
                callback(error);
            } else {
                callback(null, result);
            }
        });
    },

    readAll: function (callback) {
        db.all(statements.READ_ALL, function(error, results) {
            if (error) {
                callback(error);
            } else {
                callback(null, results);
            }
        });
    },

    update: function (book, callback) {
        db.run(statements.UPDATE, [
            book.title,
            book.subtitle,
            book.author,
            book.published,
            book.publisher,
            book.pages,
            book.description,
            book.website,
            book.isbn
        ], function(error) {
            if (error) {
                callback(error);
            } else {
                callback(null);
            }
        });
    },

    delete: function (isbn, callback) {
        db.run(statements.DELETE, isbn, function(error) {
            if (error) {
                callback(error);
            } else {
                callback(null);
            }
        });
    }

};

module.exports = bookModel;
