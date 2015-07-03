'use strict';

var low = require('lowdb'),
    db = low('books.json');

var books = {
    
    create: function(request, response) {
        var book = request.body;
        if (book) {
            db('books').push(book);
            response.status(201).json(book);   
        } else {
            response.status(400).json({ 'status': 400, 'message': 'Bad Request' });
        }
    },

    retrieve: function(request, response) {
        var book = db('books').find( { isbn : request.params.id } );
        if (book) {
            response.status(200).json(book);
        } else {
            response.status(404).json({ 'status': 404, 'message': 'Not Found' });
        }
    },

    retrieveAll: function(request, response) {
            // TODO: Implement limit & offset
            response.status(200).json(db('books').value());
    },

    update: function(request, response) {
        var updated = request.body;
        if (updated) {
            var current = db('books').find( { isbn : request.params.id } );
            if (current) {
                db('books').chain().find({ isbn: current.isbn }).assign(updated).value();       
            } else {
                response.status(404).json({ 'status': 404, 'message': 'Not Found' });
            }
        } else {
            response.status(400).json({ 'status': 400, 'message': 'Bad Request' });
        }
    },

    delete: function(request, response) {
        var book = db('books').find( { isbn : request.params.id } );
        if (book) {
            db('books').remove({ isbn : request.params.id });
            response.status(200).json(true);
        } else {
            response.status(404).json({ 'status': 404, 'message': 'Not Found' });
        }
    }
};

module.exports = books;
