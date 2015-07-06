/* global describe */
var should = require('should'),
    assert = require('assert'),
	request = require('supertest'),
	url = 'http://node-samples-restful.herokuapp.com/',
	valid = 1,
	invalid = 'foobarbaz';
	
describe('Users', function() {
	describe('/users', function() {
		it('should be HTTP 401 when HTTP GET to all resources is not authenticated.', function(done) {
			request(url)
			.get('/api/v1/users')
			.end(function (error, response){
				if (error) {
				    throw error;
				};
				response.should.have.status(401);
			});
		    done();
		});
	});
	describe('/user', function() {
		it('should be HTTP 401 when HTTP GET to valid resource is not authenticated.', function(done) {
			request(url)
			.get('/api/v1/user/' + valid)
			.end(function (error, response){
				if (error) {
				    throw error;
				};
				response.should.have.status(401);
			});
		    done();
		});
		it('should be HTTP 401 when HTTP GET to invalid resource is not authenticated.', function(done) {
			request(url)
			.get('/api/v1/user/' + invalid)
			.end(function (error, response){
				if (error) {
				    throw error;
				};
				response.should.have.status(401);
			});
		    done();
		});
		it('should be HTTP 401 when HTTP POST is not authenticated.', function(done) {
			var body = { isbn : valid };
			request(url)
			.post('/api/v1/user/')
			.send(body)
			.end(function (error, response){
				if (error) {
				    throw error;
				};
				response.should.have.status(401);
			});
		    done();
		});
		it('should be HTTP 401 when HTTP PUT is not authenticated.', function(done) {
			var body = { isbn : valid };
			request(url)
			.put('/api/v1/user/' + valid)
			.send(body)
			.end(function (error, response){
				if (error) {
				    throw error;
				};
				response.should.have.status(401);
			});
		    done();
		});
		it('should be HTTP 401 when HTTP DELETE is not authenticated.', function(done) {
			request(url)
			.delete('/api/v1/user/' + valid)
			.end(function (error, response){
				if (error) {
				    throw error;
				};
				response.should.have.status(401);
			});
		    done();
		});
	});
});