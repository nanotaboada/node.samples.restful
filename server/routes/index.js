'use strict';

var express = require('express'),
	router = express.Router(),
	auth = require('./auth.js'),
	user = require('./users.js'),
    books = require('./books.js');

// Can be accessed by everyone
router.post('/login', auth.login);

// Can be accessed by authenticated users only
router.get('/api/v1/books', books.retrieveAll);
router.get('/api/v1/book/:id', books.retrieve);
router.post('/api/v1/book/', books.create);
router.put('/api/v1/book/:id', books.update);
router.delete('/api/v1/book/:id', books.delete);

// Can be accessed by authenticated _and_ authorized users only 
router.get('/api/v1/admin/users', user.retrieveAll);
router.get('/api/v1/admin/user/:id', user.retrieve);
router.post('/api/v1/admin/user/', user.create);
router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete);

module.exports = router;
