/* global before */
/* global describe */
/* global it */
'use strict';

var request = require('supertest'),
	accessToken,
	X_KEY = 'nanotaboada@msn.com',
	CONTENT_TYPE = 'application/json; charset=utf-8',
	ENDPOINT = 'http://node-samples-restful.herokuapp.com',
	TIMEOUT_IN_MILISECONDS = 10000, // 10 seconds
	REQUEST_BODY_EMAIL_PASSWORD = { email : 'nanotaboada@msn.com', password : 'p455w0rd' },
	RESPONSE_BODY_UNAUTHORIZED = { status : 401, message : "Unauthorized" },
	VALID_USER = { id : 1, name : { first : "Paul" , last : "Cézanne" } },
	INVALID_USER = { id : -1, name : { first : "0123456789" , last : "9876543210" } };

request = request(ENDPOINT);

describe('Users', function() {
	this.timeout(TIMEOUT_IN_MILISECONDS);
	before(function() {
		request
		.post('/login')
		.send(REQUEST_BODY_EMAIL_PASSWORD)
		.end(function(error, response){
			accessToken = response.body.token;
		});
	});
	describe('/api/v1/users', function() {
		it('when GET with neither X-Key nor X-Access-Token then expect a Status of 401 Unauthorized', function(done) {
			request
			.get('/api/v1/users')
			.expect('Content-Type', CONTENT_TYPE)
			.expect(RESPONSE_BODY_UNAUTHORIZED)
			.expect(RESPONSE_BODY_UNAUTHORIZED.status, done);
		});
		it('when GET with X-Key but no X-Access-Token then expect a Status of 401 Unauthorized', function(done) {
			request
			.get('/api/v1/users')
			.set('X-Key', X_KEY)
			.expect('Content-Type', CONTENT_TYPE)
			.expect(RESPONSE_BODY_UNAUTHORIZED)
			.expect(RESPONSE_BODY_UNAUTHORIZED.status, done);
		});
		it('when GET with X-Access-Token but no X-Key then expect a Status of 401 Unauthorized', function(done) {
			request
			.get('/api/v1/users')
			.set('X-Access-Token', accessToken)
			.expect('Content-Type', CONTENT_TYPE)
			.expect(RESPONSE_BODY_UNAUTHORIZED)
			.expect(RESPONSE_BODY_UNAUTHORIZED.status, done);
		});
	});
	describe('/api/v1/user', function() {
		it('when GET to a valid resource but no X-Key/X-Access-Token then expect a Status of 401 Unauthorized', function(done) {
			request
			.get('/api/v1/user/' + VALID_USER.id)
			.expect('Content-Type', CONTENT_TYPE)
			.expect(RESPONSE_BODY_UNAUTHORIZED)
			.expect(RESPONSE_BODY_UNAUTHORIZED.status, done);
		});
		it('when GET to an invalid resource but no X-Key/X-Access-Token then expect a Status of 401 Unauthorized', function(done) {
			request
			.get('/api/v1/user/' + INVALID_USER.id)
			.expect('Content-Type', CONTENT_TYPE)
			.expect(RESPONSE_BODY_UNAUTHORIZED)
			.expect(RESPONSE_BODY_UNAUTHORIZED.status, done);
		});
		it('when POST to a valid resource but no X-Key/X-Access-Token then expect a Status of 401 Unauthorized', function(done) {
			request
			.post('/api/v1/user')
			.send(VALID_USER)
			.expect('Content-Type', CONTENT_TYPE)
			.expect(RESPONSE_BODY_UNAUTHORIZED)
			.expect(RESPONSE_BODY_UNAUTHORIZED.status, done);
		});
		it('when POST to an invalid resource but no X-Key/X-Access-Token then expect a Status of 401 Unauthorized', function(done) {
			request
			.post('/api/v1/user')
			.send(INVALID_USER)
			.expect('Content-Type', CONTENT_TYPE)
			.expect(RESPONSE_BODY_UNAUTHORIZED)
			.expect(RESPONSE_BODY_UNAUTHORIZED.status, done);
		});
		it('when PUT to a valid resource but no X-Key/X-Access-Token then expect a Status of 401 Unauthorized', function(done) {
			request
			.put('/api/v1/user/' + VALID_USER.id)
			.send(VALID_USER)
			.expect('Content-Type', CONTENT_TYPE)
			.expect(RESPONSE_BODY_UNAUTHORIZED)
			.expect(RESPONSE_BODY_UNAUTHORIZED.status, done);
		});
		it('when PUT to an invalid resource but no X-Key/X-Access-Token then expect a Status of 401 Unauthorized', function(done) {
			request
			.put('/api/v1/user/' + INVALID_USER.id)
			.send(INVALID_USER)
			.expect('Content-Type', CONTENT_TYPE)
			.expect(RESPONSE_BODY_UNAUTHORIZED)
			.expect(RESPONSE_BODY_UNAUTHORIZED.status, done);
		});
		it('when DELETE to a valid resource but no X-Key/X-Access-Token then expect a Status of 401 Unauthorized', function(done) {
			request
			.delete('/api/v1/user/' + VALID_USER.id)
			.expect('Content-Type', CONTENT_TYPE)
			.expect(RESPONSE_BODY_UNAUTHORIZED)
			.expect(RESPONSE_BODY_UNAUTHORIZED.status, done);
		});
		it('when DELETE to an invalid resource but no X-Key/X-Access-Token then expect a Status of 401 Unauthorized', function(done) {
			request
			.delete('/api/v1/user/' + INVALID_USER.id)
			.expect('Content-Type', CONTENT_TYPE)
			.expect(RESPONSE_BODY_UNAUTHORIZED)
			.expect(RESPONSE_BODY_UNAUTHORIZED.status, done);
		});
	});
});