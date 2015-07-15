/*jslint unparam: true, node: true */

var low = require("lowdb");
var db = low("users.json");

var users = {
    /**
     * Creates a new User and persist it into the data source.
     * @param {IncomingMessage} request The client request.
     * @param {ServerResponse} response The server response.
     */
    create: function (request, response) {
        "use strict";
        var user = request.body;
        if (user) {
            db("users").push(user);
            response.status(201).json(user);
        } else {
            response.status(400).json({ status: 400, message: "Bad Request" });
        }
    },

    /**
     * Retrieves a User by id from the data source.
     * @param {IncomingMessage} request The client request.
     * @param {ServerResponse} response The server response.
     */
    retrieve: function (request, response) {
        "use strict";
        var user = db("users").find({ id: request.params.id });
        if (user) {
            response.status(200).json(user);
        } else {
            response.status(404).json({ status: 404, message: "Not Found" });
        }
    },

    /**
     * Retrieves all Users matched by filter from the data source.
     * @param {IncomingMessage} request The client request.
     * @param {ServerResponse} response The server response.
     */
    retrieveAll: function (request, response) {
        "use strict";
        response.status(200).json(db("users").value());
    },

    /**
     * Updates attributes of a User and persist it into the data source.
      * @param {IncomingMessage} request The client request.
     * @param {ServerResponse} response The server response.
     */
    update: function (request, response) {
        "use strict";
        var current,
            updated = request.body;
        if (updated) {
            current = db("users").find({ id: request.params.id });
            if (current) {
                db("users").chain().find({ id: current.id }).assign(updated).value();
            } else {
                response.status(404).json({ status: 404, message: "Not Found" });
            }
        } else {
            response.status(400).json({ status: 400, message: "Bad Request" });
        }
    },

    /**
     * Deletes a User by Id from the data source.
     * @param {IncomingMessage} request The client request.
     * @param {ServerResponse} response The server response.
     */
    delete: function (request, response) {
        "use strict";
        var user = db("users").find({ id: request.params.id });
        if (user) {
            db("users").remove({ id: request.params.id });
            response.status(200).json(true);
        } else {
            response.status(404).json({ status: 404, message: "Not Found" });
        }
    }
};

module.exports = users;
