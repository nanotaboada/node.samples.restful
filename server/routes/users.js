'use strict';

var low = require('lowdb'),
    db = low('users.json');

var users = {
    
    create: function(request, response) {
        var user = request.body;
        if (user) {
            db('users').push(user);
            response.status(201).json(user);   
        } else {
            response.status(400).json({ status : 400, message : 'Bad Request' });
        }
    },

    retrieve: function(request, response) {
        var user = db('users').find( { id : request.params.id } );
        if (user) {
            response.status(200).json(user);
        } else {
            response.status(404).json({ status : 404, message : 'Not Found' });
        }
    },

    retrieveAll: function(request, response) {
            // TODO: Implement limit & offset
            response.status(200).json(db('users').value());
    },

    update: function(request, response) {
        var updated = request.body;
        if (updated) {
            var current = db('users').find( { id : request.params.id } );
            if (current) {
                db('users').chain().find({ id: current.id }).assign(updated).value();       
            } else {
                response.status(404).json({ status : 404, message : 'Not Found' });
            }
        } else {
            response.status(400).json({ status : 400, message : 'Bad Request' });
        }
    },

    delete: function(request, response) {
        var user = db('users').find( { id : request.params.id } );
        if (user) {
            db('users').remove({ id : request.params.id });
            response.status(200).json(true);
        } else {
            response.status(404).json({ status : 404, message : 'Not Found' });
        }
    }
};

module.exports = users;
