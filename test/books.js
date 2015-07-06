/* global describe */
var should = require('should'),
    assert = require('assert'),
	request = require('supertest'),
	contentType = 'application/json; charset=utf-8';

request = request('http://node-samples-restful.herokuapp.com');

var valid = '9781449331818',
	invalid = 'foobarbaz';	

describe('Books', function() {
	describe('/api/v1/books', function() {
		it('when GET to all resources is not authenticated then expect status 401', function(done) {
			request
			.get('/api/v1/books')
			.expect(401)
			.expect('Content-Type', contentType)
			.end(function(error, response){
        		if (error) return done(error);
        		done()
      		});
		});
	});
	describe('/api/v1/book', function() {
		it('when GET to valid resource is not authenticated then expect status 401', function(done) {
			request
			.get('/api/v1/book/' + valid)
			.expect('Content-Type', contentType)
			.expect(401)
			.end(function(error, response){
        		if (error) return done(error);
        		done()
      		});
		});
		it('when GET to invalid resource is not authenticated then expect status 401', function(done) {
			request
			.get('/api/v1/book/' + invalid)
			.expect('Content-Type', contentType)
			.expect(401)
			.end(function(error, response){
        		if (error) return done(error);
        		done()
      		});
		});
		it('when POST to valid resource is not authenticated then expect status 401', function(done) {
			var body = { isbn : valid };
			request
			.post('/api/v1/book')
			.send(body)
			.expect(401)
			.expect('Content-Type', contentType)
			.end(function(error, response){
        		if (error) return done(error);
        		done()
      		});
		});
		it('when POST to invalid resource is not authenticated then expect status 401', function(done) {
			var body = { isbn : invalid };
			request
			.post('/api/v1/book')
			.send(body)
			.expect(401)
			.expect('Content-Type', contentType)
			.end(function(error, response){
        		if (error) return done(error);
        		done()
      		});
		});
		it('when PUT to valid resource is not authenticated then expect status 401', function(done) {
			var body = { isbn : valid };
			request
			.put('/api/v1/book' + valid)
			.send(body)
			.expect(401)
			.expect('Content-Type', contentType)
			.end(function(error, response){
        		if (error) return done(error);
        		done()
      		});
		});
		it('when PUT to invalid resource is not authenticated then expect status 401', function(done) {
			var body = { isbn : valid };
			request
			.put('/api/v1/book' + invalid)
			.send(body)
			.expect(401)
			.expect('Content-Type', contentType)
			.end(function(error, response){
        		if (error) return done(error);
        		done()
      		});
		});
		it('when DELETE to valid resource is not authenticated then expect status 401', function(done) {
			request
			.delete('/api/v1/book' + valid)
			.expect(401)
			.expect('Content-Type', contentType)
			.end(function(error, response){
        		if (error) return done(error);
        		done()
      		});
		});
		it('when DELETE to invalid resource is not authenticated then expect status 401', function(done) {
			request
			.delete('/api/v1/book' + valid)
			.expect(401)
			.expect('Content-Type', contentType)
			.end(function(error, response){
        		if (error) return done(error);
        		done()
      		});
		});
	});
});