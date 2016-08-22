/*jslint unparam: true, node: true */

// TODO: Dependency Injection in Node.js
// https://blog.risingstack.com/dependency-injection-in-node-js/

var low = require("lowdb");
var db = low(__dirname + "/books.db", { storage: require("lowdb/lib/file-async") });
db.defaults({ books: require(__dirname + "/books.js") }).value();

var bookModel = {
    
    create: function (book) {
        return db.get("books").push(book).value();
    },

    read: function (isbn) {
        return db.get("books").find({ isbn: isbn }).value();
    },
    
    readAll: function () {
        return db.get("books").value();
    },
    
    update: function () {
        // TODO
    },
    
    delete: function () {
        // TODO
    }
    
};

module.exports = bookModel;
