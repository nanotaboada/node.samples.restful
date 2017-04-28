var app = require("../app.js");
var supertest = require("supertest");
var request = supertest(app);
var expect = require("chai").expect;

var INVALID_BOOK = {
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
    VALID_BOOK = {
        isbn: "9781491950296",
        title: "Programming JavaScript Applications",
        subtitle: "Robust Web Architecture with Node, HTML5, and Modern JS Libraries",
        author: "Eric Elliott",
        published: "2014-07-01T00:00:00.000Z",
        publisher: "O'Reilly Media",
        pages: 254,
        description: "Take advantage of JavaScript's power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that's easier-yes, easier-to work with as your code base grows.",
        website: "http://chimera.labs.oreilly.com/books/1234000000262/index.html"
    },
    VALID_BOOK_UPDATED_DESCRIPTION = "JavaScript may be the most essential web programming language, but in the real world, JavaScript applications often break when you make changes. With this book, author Eric Elliott shows you how to add client- and server-side features to a large JavaScript application without negatively affecting the rest of your code.";

describe("Book", function() {

    /* POST /api/v1/books
    ------------------------------------------------------------------------- */

    describe("POST /api/v1/books", function() {

        it("When request body is empty, then response status code should be 400 (Bad Request)", function(done) {
            var body = [];
            request
                .post("/api/v1/books")
                .send(body)
                .end(function(error, response) {
                    expect(response.statusCode).to.equal(400);
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });

        it("When request body is valid Book, then response status code should be 201 (Created)", function(done) {
            var body = VALID_BOOK;
            request
                .post("/api/v1/books")
                .send(body)
                .end(function(error, response) {
                    expect(response.statusCode).to.equal(201);
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });

        it("When request body is valid but already existing Book, then response status code should be 409 (Conflict)", function(done) {
            var body = VALID_BOOK;
            request
                .post("/api/v1/books")
                .send(body)
                .end(function(error, response) {
                    expect(response.statusCode).to.equal(409);
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });

    });

    /* GET /api/v1/books
    ------------------------------------------------------------------------- */

    describe("GET /api/v1/books", function() {

        it("When request with no parameters, then response status code should be 200 (OK)", function(done) {
            request
                .get("/api/v1/books")
                .end(function(error, response) {
                    expect(response.statusCode).to.equal(200);
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });

        it("When request with no parameters, then response body should be an Array of Books", function(done) {
            request
                .get("/api/v1/books")
                .end(function(error, response) {
                    expect(response.body.books).to.be.an("array");
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });
    });

});