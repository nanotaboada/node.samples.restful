'use strict';

// INFO: Simple stub for book data

/*  [{
    isbn : '9781593272821',
    title : 'Eloquent JavaScript',
    author : 'Marijn Haverbeke',
	published : '2011-02-03T00:00:00.000Z',
	publisher : 'No Starch Press',
    pages : 224,
	instock : true
	}, {
	isbn : '9780596805524',
	title : 'JavaScript: The Definitive Guide, 6th Edition',
	author : 'David Flanagan',
	published : '2011-05-10T00:00:00.000Z',
	publisher : 'O\'Reilly Media',
	pages : 1100,
	instock : true
    }, {
    isbn : '9781430247494',
    title : 'Pro JavaScript Performance: Monitoring and Visualization',
    author : 'Tom Barker',
	published : '2012-10-31T00:00:00.000Z',
    publisher : 'Apress',
	pages : 220,
    instock : true
    }, {
    isbn : '9780596806750',
	title : 'JavaScript Patterns',
	author : 'Stoyan Stefanov',
	published : '2010-09-28T00:00:00.000Z',
	publisher : 'O\'Reilly Media',
	pages : 236,
	instock : true
	}, {
	isbn : '9780321822086',
	title : 'jQuery, jQuery UI, and jQuery Mobile: Recipes and Examples',
	author : 'Adriaan de Jonge',
	published : '2012-11-12T00:00:00.000Z',
	publisher : 'Addison-Wesley Professional',
	pages : 400,
	instocl : true
    }, {
    isbn : '9780672336058',
    title : 'Windows 8 Apps with HTML5 and JavaScript Unleashed',
    author : 'Stephen Walther',
    published : '2012-11-30T00:00:00.000Z',
    publisher : 'Sams Publishing',
    pages : 368,
    instock : true
	}];
*/

var low = require('lowdb');
var db = low('books.json');

var books = {
    
    // INFO: Basic implementation of CRUD operations
    
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
