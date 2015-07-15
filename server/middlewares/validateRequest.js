/* global module */
/* global require */

var jwt = require("jwt-simple"),
    validateUser = require("../routes/auth").checkUser;

module.exports = function (request, response, next) {
    "use strict";
    /**
     * INFO: When performing a cross-domain request, you will recieve
     * a preflighted request first. This is to check if our the app is safe
     */
    var token, key, decoded, user, hasAPIRole, isAPIAdmin;

    token = (request.body && request.body.access_token) || (request.query && request.query.access_token) || request.headers["x-access-token"];
    key = (request.body && request.body.x_key) || (request.query && request.query.x_key) || request.headers["x-key"];

    if (token && key) {
        try {
            decoded = jwt.decode(token, require("../config/secret.js")());

            if (decoded.exp <= Date.now()) {
                // Token expired
                response.status(400);
                response.json({ status: 400, message: "Bad Request" });
                return;
            }
            user = validateUser(key);
            if (user) {
                // INFO: This logic is arbitraty just for the sake of the example:
                // basically users with admin role can access admin API URLs, then
                // users with any other role can access non-admin API URLs.
                hasAPIRole = user.role && request.url.indexOf("/api/v1") >= 0;
                isAPIAdmin = user.role === "admin" && request.url.indexOf("/api/v1/admin") >= 0;

                if (hasAPIRole || isAPIAdmin) {
                    // INFO: Move to next middleware
                    next();
                } else {
                    response.status(403);
                    response.json({ status: 403, message: "Forbidden" });
                    return;
                }
            } else {
                response.status(401);
                response.json({ status: 401, message: "Unauthorized" });
                return;
            }

        } catch (error) {
            response.status(500);
            response.json({ status: 500, message: "Internal Server Error", error: error });
        }
    } else {
        // Invalid token or key
        response.status(401);
        response.json({ status: 401, message: "Unauthorized" });
        return;
    }
};
