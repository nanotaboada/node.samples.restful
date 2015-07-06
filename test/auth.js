/* global describe */
/* global it */

var should = require('should'),
    assert = require('assert'),
	request = require('supertest'),
	contentType = 'application/json; charset=utf-8';

request = request('http://node-samples-restful.herokuapp.com');

describe('Auth', function() {
	describe('/login', function() {
		it('when GET then expect status 404', function(done) {
			request
			.get('/login')
			.expect(404)
			.end(function(error, response){
        		if (error) return done(error);
        		done();;
      		});
		});
		it('when POST with neither email nor password then expect status 401', function(done) {
			request
			.post('/login')
			.expect(401)
			.expect('Content-Type', contentType)
			.end(function(error, response){
        		if (error) return done(error);
        		done();
      		});
		});
		it('when POST with email but no password then expect status 401', function(done) {
			var body = { email : 'foo@bar.baz' };
			request
			.post('/login')
			.send(body)
			.expect(401)
			.expect('Content-Type', contentType)
			.end(function(error, response){
        		if (error) return done(error);
        		done();
      		});
		});
		it('when POST with password but no email then expect status 401', function(done) {
			var body = { password : 'foobarbaz' };
			request
			.post('/login')
			.send(body)
			.expect(401)
			.expect('Content-Type', contentType)
			.end(function(error, response){
        		if (error) return done(error);
        		done();
      		});
		});
		it('when POST with email and password then expect status 200', function(done) {
			var body = { email : 'foo@bar.baz', password : 'foobarbaz' };
			request
			.post('/login')
			.send(body)
			.expect(200)
			.expect('Content-Type', contentType)
			.end(function(error, response){
        		if (error) return done(error);
        		done();
      		});
		});
		it('when POST is 200 then response should contain authorization token', function(done) {
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
	});
});
