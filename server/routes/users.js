'use strict';

// INFO: Simple stub for user data

/*
    [{
    id: '1',
    name: { first: 'Paul', last: 'Cézanne' }
    }, {
    id: '2',
    name: { first: 'Camille', last: 'Pissarro' }
    }, {
    id: '3',
    name: { first: 'Pierre-Auguste', last: 'Renoir' }
    }, {
    id: '4',
    name: { first: 'Claude', last: 'Monet' }
    }];
*/

var low = require('lowdb');
var db = low('users.json');

var users = {
    
    // INFO: Basic implementation of CRUD operations
    
    create: function(request, response) {
        var user = request.body;
        if (user) {
            db('users').push(user);
            response.status(201).json(user);   
        } else {
            response.status(400).json({ 'status': 400, 'message': 'Bad Request' });
        }
    },

    retrieve: function(request, response) {
        var user = db('users').find( { isbn : request.params.id } );
        if (user) {
            response.status(200).json(user);
        } else {
            response.status(404).json({ 'status': 404, 'message': 'Not Found' });
        }
    },

    retrieveAll: function(request, response) {
            // TODO: Implement limit & offset
            response.status(200).json(db('users').value());
    },

    update: function(request, response) {
        var updated = request.body;
        if (updated) {
            var current = db('users').find( { isbn : request.params.id } );
            if (current) {
                db('users').chain().find({ isbn: current.isbn }).assign(updated).value();       
            } else {
                response.status(404).json({ 'status': 404, 'message': 'Not Found' });
            }
        } else {
            response.status(400).json({ 'status': 400, 'message': 'Bad Request' });
        }
    },

    delete: function(request, response) {
        var user = db('users').find( { isbn : request.params.id } );
        if (user) {
            db('users').remove({ isbn : request.params.id });
            response.status(200).json(true);
        } else {
            response.status(404).json({ 'status': 404, 'message': 'Not Found' });
        }
    }
};

module.exports = users;