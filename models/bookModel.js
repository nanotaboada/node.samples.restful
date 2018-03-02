/*jslint unparam: true, node: true */

var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync(__dirname + '/books.json');
var db = low(adapter);
db.defaults({ books: require(__dirname + '/books.js') }).write();

var bookModel = {

    create: function(book) {
        return db.get("books").push(book).write();
    },

    read: function(isbn) {
        return db.get("books").find({ isbn: isbn }).value();
    },

    readAll: function() {
        return db.get("books").value();
    },

    update: function(updated, existing) {
        db.get("books").find({ isbn: existing.isbn }).assign(updated).write();
    },

    delete: function(isbn) {
        db.get("books").remove({ isbn: isbn }).write();
    }

};

module.exports = bookModel;
