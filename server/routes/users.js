'use strict';

// INFO: Simple stub for user data
var db = [{
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

var users = {
    
     // INFO: Basic implementation of CRUD operations
    create: function(request, response) {
        var user = request.body;
        db.push(user);
        response.json(user);
    },

    retrieve: function(request, response) {
        var userId = request.params.id;
        if(userId) {
            response.json(db[userId]);
        };
    },

    retrieveAll: function(request, response) {
        response.json(db);
    },

    update: function(request, response) {
        var user = request.body;
        var userId = request.params.id;
        if (user && userId) {
            db[userId] = user;
            response.json(user);   
        }
    },

    delete: function(request, response) {
        var userId = request.params.id;
        if (userId) {
            db.splice(userId, 1);
            response.json(true);            
        }
    }
};

module.exports = users;
