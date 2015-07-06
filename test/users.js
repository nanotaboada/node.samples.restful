/* global describe */
var should = require('should'),
    assert = require('assert'),
	request = require('supertest'),

request = request('http://node-samples-restful.herokuapp.com');

var valid = 1,
	invalid = 'foobarbaz';

describe('Users', function() {
	describe('/users', function() {
		it('should be HTTP 401 when HTTP GET to all resources is not authenticated.', function(done) {
			request
			.get('/api/v1/users')
			.expect(401)
			.end(function(error, response){
        		if (error) return done(error);
        		done()
      		});
		});
	});
	describe('/user', function() {
		it('should be HTTP 401 when HTTP GET to valid resource is not authenticated.', function(done) {
			request
			.get('/api/v1/user/' + valid)
			.expect(401)
			.end(function(error, response){
        		if (error) return done(error);
        		done()
      		});
		});
		it('should be HTTP 401 when HTTP GET to invalid resource is not authenticated.', function(done) {
			request
			.get('/api/v1/user/' + invalid)
			.expect(401)
			.end(function(error, response){
        		if (error) return done(error);
        		done()
      		});
		});
		it('should be HTTP 401 when HTTP POST is not authenticated.', function(done) {
			var body = { isbn : valid };
			request
			.post('/api/v1/user')
			.send(body)
			.expect(401)
			.end(function(error, response){
        		if (error) return done(error);
        		done()
      		});
		});
		it('should be HTTP 401 when HTTP PUT is not authenticated.', function(done) {
			var body = { isbn : valid };
			request
			.put('/api/v1/user' + valid)
			.send(body)
			.expect(401)
			.end(function(error, response){
        		if (error) return done(error);
        		done()
      		});
		});
		it('should be HTTP 401 when HTTP DELETE is not authenticated.', function(done) {
			request
			.delete('/api/v1/user' + valid)
			.expect(401)
			.end(function(error, response){
        		if (error) return done(error);
        		done()
      		});
		});
	});
});