/* global describe */
/* global it */

var should = require('should'),
    assert = require('assert'),
	request = require('supertest'),
	contentType = 'application/json; charset=utf-8';

request = request('http://node-samples-restful.herokuapp.com');

describe('Auth', function() {
	describe('/login', function() {
		it('when GET then expect a Status of 404 Not Found', function(done) {
			request
			.get('/login')
			.expect(404)
			.end(function(error, response){
        		if (error) {
					return done(error)
				};
        		done();;
      		});
		});
		it('when POST with neither email nor password then expect a Status of 401 Unauthorized', function(done) {
			request
			.post('/login')
			.expect(401)
			.expect('Content-Type', contentType)
			.end(function(error, response){
        		if (error) {
					return done(error)
				};
        		done();
      		});
		});
		it('when POST with email but no password then expect a Status of 401 Unauthorized', function(done) {
			var body = { email : 'foo@bar.baz' };
			request
			.post('/login')
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
		it('when POST with password but no email expect a Status of 401 Unauthorized', function(done) {
			var body = { password : 'foobarbaz' };
			request
			.post('/login')
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
		it('when POST with email and password then expect a Status of 200 OK', function(done) {
			var body = { email : 'foo@bar.baz', password : 'foobarbaz' };
			request
			.post('/login')
			.send(body)
			.expect(200)
			.expect('Content-Type', contentType)
			.end(function(error, response){
        		if (error) {
					return done(error)
				};
        		done();
      		});
		});
		it('when POST response is 200 OK then it should contain authorization token', function(done) {
			var body = { email : 'foo@bar.baz', password : 'foobarbaz' };
			request
			.post('/login')
			.send(body)
			.expect(200)
			.expect('Content-Type', contentType)
			.end(function(error, response){
				response.body.should.have.property('token')
        		if (error) return done(error);
        		done();
      		});
		});
		it('when PUT then expect a Status of 404 Not Found', function(done) {
			request
			.put('/login')
			.expect(404)
			.end(function(error, response){
        		if (error) {
					return done(error)
				};
        		done();;
      		});
		});
		it('when DELETE then expect a Status of 404 Not Found', function(done) {
			request
			.delete('/login')
			.expect(404)
			.end(function(error, response){
        		if (error) {
					return done(error)
				};
        		done();;
      		});
		});
	});
});
