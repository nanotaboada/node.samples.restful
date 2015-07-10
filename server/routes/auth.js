'use strict';

var jwt = require('jwt-simple');

var auth = {

/**
 * Sample request
 * - Headers
 *   Content-Type  application/json
 * - Payload
 *   {
 *     "email" : "foo",
 *     "password" : "bar"
 *   }
 */
    login: function(request, response) {

        var email = request.body.email,
            password = request.body.password;

        if (!email || !password) {
            response.status(401);
            response.json({ status : 401, message : 'Unauthorized.' });
            return;
        }

        var user = auth.check(email, password);

        if (!user) {
            response.status(401);
            response.json({ status : 401,  message : 'Unauthorized' });
            return;
        } else {
            response.json(generateToken(user));
        }
    },

    check: function(email, password) {
        // INFO: Mocking the DB response for the sake of this sample
        var user = {
            name: { first: 'Nano', last: 'Taboada' },
            email: 'nanotaboada@msn.com',
            role: 'admin'
        };

        return user;
    },

    checkUser: function(email) {
        // INFO: Mocking the DB response for the sake of this sample
        var user = {
            name: { first: 'Nano', last: 'Taboada' },
            email: 'nanotaboada@msn.com',
            role: 'admin'
        };
        
        return user;
    },
};

// TODO: Modularize
function generateToken(user) {
    var date = new Date(),
        days = 7,
        expires = date.setDate(date.getDate() + days),
        token = jwt.encode({ exp: expires }, require('../config/secret')());

    return {
        token: token,
        expires: expires,
        user: user
    };
}

module.exports = auth;
