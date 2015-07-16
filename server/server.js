/*jslint unparam: true, node: true */

/* -----------------------------------------------------------------------------
  Modules
----------------------------------------------------------------------------- */
var express = require("express"),
    bodyParser = require("body-parser"),
    compression = require("compression");

var app = express();
app.use(bodyParser.json());
app.use(compression({ threshold: false }));

/* -----------------------------------------------------------------------------
  Routes
----------------------------------------------------------------------------- */
app.all("/*", function(request, response, next) {
    "use strict";
    // INFO: Instead of "*" it can be restricted to a specific domain
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    response.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Access-Token,X-Key");
    if (request.method === "OPTIONS") {
        response.status(200).end();
    } else {
        next();
    }
});

/* -----------------------------------------------------------------------------
  Middleware(s)
----------------------------------------------------------------------------- */

/* validateRequest.js
 * Checks if the token is valid.
 * Only requests starting with /api/v1/* will be checked.
 * Any other URL should be avoided unless authentication is not needed.
 */
app.all("/api/v1/*", [require("./middlewares/validateRequest")]);
app.use("/", require("./routes"));

/* -----------------------------------------------------------------------------
  Server
----------------------------------------------------------------------------- */
app.set("port", process.env.PORT || 8888);
var server = app.listen(app.get("port"), function() {
    "use strict";
    console.log("[STARTED] Express server listening on port " + server.address().port);
});

process.on("SIGINT", function() {
    "use strict";
    console.log("[STOPPED] Express server listening on port " + server.address().port);
    server.close();
    process.exit();
});
