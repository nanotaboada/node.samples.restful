/* global process */
'use strict';

var express = require('express'),
    app = express(),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    compression = require('compression');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(compression({ threshold: false }));

app.all('/*', function(request, response, next) {
    // INFO: Instead of "*" it can be restricted to a specific domain
    response.header("Access-Control-Allow-Origin", "*");
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    response.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    
    if (request.method === 'OPTIONS') {
        response.status(200).end();
    } else {
        next();
    }
});
/** 
 * Authentication middleware
 * 
 * Checks if the token is valid.
 * Only requests starting with /api/v1/* will be checked.
 * Any other URL should be avoided unless authentication is not needed.
 */
app.all('/api/v1/*', [require('./middlewares/validateRequest')]);
app.use('/', require('./routes'));

// If no route is matched by now we must return 404
app.use(function(request, response, next) {
    var error = new Error('Not Found');
    error.status = 404;
    next(error);
});

/** 
 * Application server
 */
app.set('port', process.env.PORT || 8888);

var server = app.listen(app.get('port'), function() {
    console.log('[STARTED] Express server listening on port ' + server.address().port);
});

process.on('SIGINT', function() {
    console.log('[STOPPED] Express server listening on port ' + server.address().port);
    server.close();
    process.exit();
});