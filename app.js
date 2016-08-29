/*jslint unparam: true, node: true */

/* --------------------------------------------------------------------------
   Module Dependencies & Configuration
-------------------------------------------------------------------------- */

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var path = require('path');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* --------------------------------------------------------------------------
   Routing & Error Handling
-------------------------------------------------------------------------- */

app.use('/', require('./routes/index'));

// Uncomment only after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// HTTP 404 forwards to error handler
app.use(function(request, response, next) {
    var error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Development
if (app.get('env') === 'development') {
    app.use(function(error, request, response) {
        response.status(error.status || 500);
        response.json( { message: error.message, error: error } );
    });
}

// Production
app.use(function(error, request, response) {
    response.status(error.status || 500);
    response.json( { message: error.message, error: {} } );
});

module.exports = app;
