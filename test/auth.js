/* global describe */
var should = require('should'),
    assert = require('assert'),
	request = require('supertest'),

request = request('http://node-samples-restful.herokuapp.com');

describe('Auth', function() {
	describe('/login', function() {
		it('should be HTTP 404 when HTTP GET.', function(done) {
			request
			.get('/login')
			.expect(404)
			.end(function(error, response){
        		if (error) return done(error);
        		done()
      		});
		});
		it('should be HTTP 401 when HTTP POST with neither email nor password.', function(done) {
			request
			.post('/login')
			.expect(401)
			.end(function(error, response){
        		if (error) return done(error);
        		done()
      		});
		});
		it('should be HTTP 401 when HTTP POST with email but no password.', function(done) {
			var body = { email : 'foo@bar.baz' };
			request
			.post('/login')
			.send(body)
			.expect(401)
			.end(function(error, response){
        		if (error) return done(error);
        		done()
      		});
		});
		it('should be HTTP 401 when HTTP POST with password but no email.', function(done) {
			var body = { password : 'foobarbaz' };
			request
			.post('/login')
			.send(body)
			.expect(401)
			.end(function(error, response){
        		if (error) return done(error);
        		done()
      		});
		});
		it('should be HTTP 200 when HTTP POST with password and email.', function(done) {
			var body = { email : 'foo@bar.baz', password : 'foobarbaz' };
			request
			.post('/login')
			.send(body)
			.expect(200)
			.end(function(error, response){
        		if (error) return done(error);
        		done()
      		});
		});
	});
});
