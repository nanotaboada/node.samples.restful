/* global describe */
/* global it */
/* global before */
'use strict';

var should = require('should'),
    assert = require('assert'),
	request = require('supertest'),
	contentType = 'application/json; charset=utf-8',
	accessKey = 'nanotaboada@msn.com',
	accessToken,
	email = 'foo@bar.baz',
	password = 'foobarbaz',
	validResource = 1,
	invalidResource = -1;

request = request('http://node-samples-restful.herokuapp.com');

describe('Users', function() {
	this.timeout(4000); // 4 seconds
	before(function() {
		var body = { email : email, password : password };
		request
		.post('/login')
		.send(body)
		.end(function(error, response){
			accessToken = response.body.token;
		});
	});
	describe('/api/v1/users', function() {
		it('when GET with neither X-Key nor X-Access-Token then expect a Status of 401 Unauthorized', function(done) {
			request
			.get('/api/v1/users')
			.expect(401)
			.expect('Content-Type', contentType)
			.end(function(error, response){
        		if (error) {
					return done(error)
				};
        		done();
      		});
		});
		it('when GET with X-Key but no X-Access-Token then expect a Status of 401 Unauthorized', function(done) {
			request
			.get('/api/v1/users')
			.set('X-Key', accessKey)
			.expect(401)
			.expect('Content-Type', contentType)
			.end(function(error, response){
        		if (error) {
					return done(error)
				};
        		done();
      		});
		});
		it('when GET with X-Access-Token but no X-Key then expect a Status of 401 Unauthorized', function(done) {
			request
			.get('/api/v1/users')
			.set('X-Access-Token', accessToken)
			.expect(401)
			.expect('Content-Type', contentType)
			.end(function(error, response){
        		if (error) {
					return done(error)
				};
        		done();
      		});
		});
	});
	describe('/api/v1/user', function() {
		it('when GET to a valid resource but no X-Key/X-Access-Token then expect a Status of 401 Unauthorized', function(done) {
			request
			.get('/api/v1/user/' + validResource)
			.expect('Content-Type', contentType)
			.expect(401)
			.end(function(error, response){
        		if (error) {
					return done(error)
				};
        		done();
      		});
		});
		it('when GET to an invalid resource but no X-Key/X-Access-Token then expect a Status of 401 Unauthorized', function(done) {
			request
			.get('/api/v1/user/' + invalidResource)
			.expect('Content-Type', contentType)
			.expect(401)
			.end(function(error, response){
        		if (error) {
					return done(error)
				};
        		done();
      		});
		});
		it('when POST to a valid resource but no X-Key/X-Access-Token then expect a Status of 401 Unauthorized', function(done) {
			var body = { id : validResource };
			request
			.post('/api/v1/user')
			.send(body)
			.expect(401)
			.expect('Content-Type', contentType)
			.end(function(error, response){
        		if (error) {
					return done(error)
				};
        		done();
      		});
		});
		it('when POST to an invalid resource but no X-Key/X-Access-Token then expect a Status of 401 Unauthorized', function(done) {
			var body = { id : invalidResource };
			request
			.post('/api/v1/user')
			.send(body)
			.expect(401)
			.expect('Content-Type', contentType)
			.end(function(error, response){
        		if (error) {
					return done(error)
				};
        		done();
      		});
		});
		it('when PUT to a valid resource but no X-Key/X-Access-Token then expect a Status of 401 Unauthorized', function(done) {
			var body = { id : validResource };
			request
			.put('/api/v1/user/' + validResource)
			.send(body)
			.expect(401)
			.expect('Content-Type', contentType)
			.end(function(error, response){
        		if (error) {
					return done(error)
				};
        		done();
      		});
		});
		it('when PUT to an invalid resource but no X-Key/X-Access-Token then expect a Status of 401 Unauthorized', function(done) {
			var body = { id : validResource };
			request
			.put('/api/v1/user/' + invalidResource)
			.send(body)
			.expect(401)
			.expect('Content-Type', contentType)
			.end(function(error, response){
        		if (error) {
					return done(error)
				};
        		done();
      		});
		});
		it('when DELETE to a valid resource but no X-Key/X-Access-Token then expect a Status of 401 Unauthorized', function(done) {
			request
			.delete('/api/v1/user/' + validResource)
			.expect(401)
			.expect('Content-Type', contentType)
			.end(function(error, response){
        		if (error) {
					return done(error)
				};
        		done();
      		});
		});
		it('when DELETE to an invalid resource but no X-Key/X-Access-Token then expect a Status of 401 Unauthorized', function(done) {
			request
			.delete('/api/v1/user/' + validResource)
			.expect(401)
			.expect('Content-Type', contentType)
			.end(function(error, response){
        		if (error) {
					return done(error)
				};
        		done();
      		});
		});
	});
});