/* global describe */
var should = require('should'),
    assert = require('assert'),
	request = require('supertest'),
	url = 'http://node-samples-restful.herokuapp.com/',
	id = '9781449331818';
	
describe('Auth', function() {
	describe('/login', function() {
		it('should be HTTP 404 when HTTP GET.', function(done) {
			request(url)
			.post('/login')
			.end(function (error, response){
				if (error) {
				    throw error;
				};
				response.should.have.status(404);
			});
		    done();
		});
		it('should be HTTP 401 when HTTP POST with neither email nor password.', function(done) {
			request(url)
			.post('/login')
			.end(function (error, response){
				if (error) {
				    throw error;
				};
				response.should.have.status(401);
			});
		    done();
		});
		it('should be HTTP 401 when HTTP POST with email but no password.', function(done) {
			var body = { email : 'foo@bar.baz' };
			request(url)
			.post('/login')
			.send(body)
			.end(function (error, response){
				if (error) {
				    throw error;
				};
				response.should.have.status(401);
			});
		    done();
		});
		it('should be HTTP 401 when HTTP POST with password but no email.', function(done) {
			var body = { password : 'foobarbaz' };
			request(url)
			.post('/login')
			.send(body)
			.end(function (error, response){
				if (error) {
				    throw error;
				};
				response.should.have.status(401);
			});
		    done();
		});
		it('should be HTTP 200 when HTTP POST with password and email.', function(done) {
			var body = { email : 'foo@bar.baz', password : 'foobarbaz' };
			request(url)
			.post('/login')
			.send(body)
			.end(function (error, response){
				if (error) {
				    throw error;
				};
				response.should.have.status(200);
			});
		    done();
		});
	});
});
