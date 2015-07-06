/* global describe */
var should = require('should'),
    assert = require('assert'),
	request = require('supertest');
	
describe('Routes', function() {
	var url = 'http://node-samples-restful.herokuapp.com/';
	// var url = 'http://localhost:8888';
	var id = '9781449331818';
	describe('Books', function() {
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
		it('should be HTTP 401 when HTTP GET to valid resource is not authenticated.', function(done) {
			request(url)
			.get('/api/v1/books/' + id)
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
			.get('/api/v1/books/' + 'foobarbaz')
			.end(function (error, response){
				if (error) {
				    throw error;
				};
				response.should.have.status(401);
			});
		    done();
		});
		it('should be HTTP 401 when HTTP POST is not authenticated.', function(done) {
			var body = { isbn : id };
			request(url)
			.post('/api/v1/books/')
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
			var body = { isbn : id };
			request(url)
			.put('/api/v1/books/' + id)
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
			.delete('/api/v1/books/' + id)
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