/* global describe */
var should = require('should'),
    assert = require('assert'),
	request = require('supertest'),
	url = 'http://node-samples-restful.herokuapp.com/',
	valid = '9781449331818',
	invalid = 'foobarbaz';
	
describe('Books', function() {
	describe('/books', function() {
		it('should be HTTP 401 when HTTP GET to all resources is not authenticated.', function(done) {
			request(url)
			.get('/api/v1/books')
			.end(function (error, response){
				if (error) {
				    throw error;
				};
				response.should.have.status(401);
			});
		    done();
		});
	});
	describe('/book', function() {
		it('should be HTTP 401 when HTTP GET to valid resource is not authenticated.', function(done) {
			request(url)
			.get('/api/v1/book/' + valid)
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
			.get('/api/v1/book/' + invalid)
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
			.post('/api/v1/book/')
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
			.put('/api/v1/book/' + valid)
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
			.delete('/api/v1/book/' + valid)
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