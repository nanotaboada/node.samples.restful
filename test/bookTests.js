var app = require("../app.js");
var supertest = require("supertest");
var request = supertest(app);

var should = require("chai").should,
    expect = require("chai").expect;

var CONTENT_TYPE = "application/json",
    INVALID_RESOURCE = {
        isbn: "ABC-0123456789",
        title: "Foo bar baz",
        subtitle: "Lorem ipsum",
        author: "John Doe",
        published: new Date(),
        publisher: "John Doe",
        pages: 123,
        description: "The quick brown fox jumps over the lazy dog.",
        website: "http://code.nanotaboada.com.ar"
    },
    RESPONSE_BODY_UNAUTHORIZED = { status: 401, message: "Unauthorized" },
    VALID_RESOURCE = {
        isbn: "9781491950296",
        title: "Programming JavaScript Applications",
        subtitle: "Robust Web Architecture with Node, HTML5, and Modern JS Libraries",
        author: "Eric Elliott",
        published: "2014-07-01T00:00:00.000Z",
        publisher: "O'Reilly Media",
        pages: 254,
        description: "Take advantage of JavaScript's power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that's easier-yes, easier-to work with as your code base grows.",
        website: "http://chimera.labs.oreilly.com/books/1234000000262/index.html"
    };

describe("Book", function () {
    
    describe("POST /api/v1/book/", function () {
        
        it("Response Content-Type should be \"application/json\"", function (done) {
            request
            .post("/api/v1/book/")
            .end(function (error, response) {
                expect(response.header["content-type"]).to.contain(CONTENT_TYPE);
                done();
            });
        });
 
        it("When request body is null or empty, then response Status Code should be 400 Bad Request", function(done) {
            var body = null;
            request
            .post("/api/v1/book/")
            .send(body)
            .end(function (error, response) {
                expect(400);
                done();
            });
        });
        
        it("When request has valid Book, then response Status Code should be 201 Created", function(done) {
            var body = VALID_RESOURCE;
            request
            .post("/api/v1/book/")
            .send(body)
            .end(function (error, response) {
                expect(201);
                done();
            });
        });
        
    });
    
    describe("GET /api/v1/books", function () {

        it("Response Content-Type should be \"application/json\"", function (done) {
            request
            .get("/api/v1/books")
            .end(function (error, response) {
                expect(response.header["content-type"]).to.contain(CONTENT_TYPE);
                done();
            });
        });

        it("Response Status Code should be 200 OK", function(done) {
            request
            .get("/api/v1/books")
            .end(function (error, response) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it("Response body should be an Array of Books", function (done) {
            request
            .get("/api/v1/books")
            .end(function (error, response) {
                expect(response.body).to.be.an("array");
                done();
            });
        });
    });
    
    
    describe("GET /api/v1/book/:id", function () {
        
        it("Response Content-Type should be \"application/json\"", function (done) {
            request
            .get("/api/v1/book/" + VALID_RESOURCE.isbn)
            .end(function (error, response) {
                expect(response.header["content-type"]).to.contain(CONTENT_TYPE);
                done();
            });
        });
 
        it("When request has invalid ISBN, then response Status Code should be 404 Not Found", function(done) {
            request
            .get("/api/v1/book/" + INVALID_RESOURCE.isbn)
            .end(function (error, response) {
                expect(response.status).to.equal(404);
                done();
            });
        });
        
       it("When request has valid ISBN, then response Status Code should be 200 OK", function(done) {
            request
            .get("/api/v1/book/" + VALID_RESOURCE.isbn)
            .end(function (error, response) {
                expect(response.status).to.equal(200);
                done();
            });
        });
        
       it("When request has valid ISBN, then response body should be a Book", function(done) {
            request
            .get("/api/v1/book/" + VALID_RESOURCE.isbn)
            .end(function (error, response) {
                expect(response.body).to.be.an("object");
                expect(response.body).to.have.property("isbn");
                expect(response.body).to.have.property("title");
                expect(response.body).to.have.property("subtitle");
                expect(response.body).to.have.property("author");
                expect(response.body).to.have.property("publisher");
                expect(response.body).to.have.property("published");
                expect(response.body).to.have.property("pages");
                expect(response.body).to.have.property("description");
                expect(response.body).to.have.property("website");
                done();
            });
        });
        
    });

});
