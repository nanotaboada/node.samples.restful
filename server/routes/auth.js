/*jslint unparam: true, node: true */

var jwt = require("jwt-simple");

/**
 * Generates JWT authentication token.
 */
function generateToken(user) {
    "use strict";
    var date = new Date(),
        days = 7,
        expires = date.setDate(date.getDate() + days),
        token = jwt.encode({ exp: expires }, require("../config/secret")());

    return {
        token: token,
        expires: expires,
        user: user
    };
}

var auth = {
    /**
     * Logs in User
     * @param {IncomingMessage} request The client request.
     * @param {ServerResponse} response The server response.
     */
    login: function (request, response) {
        "use strict";
        var email = request.body.email,
            password = request.body.password,
            user;

        if (!email || !password) {
            response.status(401);
            response.json({ status: 401, message: "Unauthorized." });
            return;
        }

        user = auth.check(email, password);

        if (!user) {
            response.status(401);
            response.json({ status: 401, message: "Unauthorized" });
            return;
        }

        response.json(generateToken(user));
    },

    /**
     * Checks a User by email and password.
     * @param {string} email The User's email.
     * @param {string} password The User's password.
     */
    check: function (email, password) {
        "use strict";
        // INFO: Mocking the DB response for the sake of this sample
        if (email && password) {
            var user = {
                name: { first: "Nano", last: "Taboada" },
                email: "nanotaboada@msn.com",
                role: "admin"
            };

            return user;
        }
    },

    /**
     * Checks a User by email.
      * @param {string} email The User's email.
     */
    checkUser: function (email) {
        "use strict";
        // INFO: Mocking the DB response for the sake of this sample
        if (email) {
            var user = {
                name: { first: "Nano", last: "Taboada" },
                email: "nanotaboada@msn.com",
                role: "admin"
            };

            return user;
        }
    }
};

module.exports = auth;
