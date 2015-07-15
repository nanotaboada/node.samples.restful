"use strict";

var request = require("supertest");
var xAccessToken,
    X_KEY = "nanotaboada@msn.com",
    ENDPOINT = "http://node-samples-restful.herokuapp.com",
    TIMEOUT_IN_MILISECONDS = 10000, // 10 seconds
    CONTENT_TYPE = "application/json; charset=utf-8",
    REQUEST_BODY_EMAIL_PASSWORD = { email: "nanotaboada@msn.com", password: "p455w0rd" },
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
    },
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
    };

request = request(ENDPOINT);

describe("Books", function () {
    this.timeout(TIMEOUT_IN_MILISECONDS);
    before(function () {
        request
        .post("/login")
        .send(REQUEST_BODY_EMAIL_PASSWORD)
        .end(function (error, response){
            xAccessToken = response.body.token;
        });
    });
    describe("/api/v1/books", function () {
        it("when GET with neither X-Key nor X-Access-Token then expect a Status of 401 Unauthorized", function (done) {
            request
            .get("/api/v1/books")
            .expect("Content-Type", CONTENT_TYPE)
            .expect(RESPONSE_BODY_UNAUTHORIZED)
            .expect(RESPONSE_BODY_UNAUTHORIZED.status, done);
        });
        it("when GET with X-Key but no X-Access-Token then expect a Status of 401 Unauthorized", function (done) {
            request
            .get("/api/v1/books")
            .set("X-Key", X_KEY)
            .expect("Content-Type", CONTENT_TYPE)
            .expect(RESPONSE_BODY_UNAUTHORIZED)
            .expect(RESPONSE_BODY_UNAUTHORIZED.status, done);
        });
        it("when GET with X-Access-Token but no X-Key then expect a Status of 401 Unauthorized", function (done) {
            request
            .get("/api/v1/books")
            .set("X-Access-Token", xAccessToken)
            .expect("Content-Type", CONTENT_TYPE)
            .expect(RESPONSE_BODY_UNAUTHORIZED)
            .expect(RESPONSE_BODY_UNAUTHORIZED.status, done);
        });
        it("when GET with X-Access-Token and X-Key then expect a Status of 200 OK", function (done) {
              request
              .get("/api/v1/books")
              .set("X-Access-Token", xAccessToken)
              .set("X-Key", X_KEY)
              .expect("Content-Type", CONTENT_TYPE)
              .expect(200, done);
        });
    });
    describe("/api/v1/book", function () {
        it("when GET to a valid resource but no X-Key/X-Access-Token then expect a Status of 401 Unauthorized", function (done) {
            request
            .get("/api/v1/book/" + VALID_RESOURCE.isbn)
            .expect("Content-Type", CONTENT_TYPE)
            .expect(RESPONSE_BODY_UNAUTHORIZED)
            .expect(RESPONSE_BODY_UNAUTHORIZED.status, done);
        });
        it("when GET to an invalid resource but no X-Key/X-Access-Token then expect a Status of 401 Unauthorized", function (done) {
            request
            .get("/api/v1/book/" + INVALID_RESOURCE.isbn)
            .expect("Content-Type", CONTENT_TYPE)
            .expect(RESPONSE_BODY_UNAUTHORIZED)
            .expect(RESPONSE_BODY_UNAUTHORIZED.status, done);
        });
        it("when POST to a valid resource but no X-Key/X-Access-Token then expect a Status of 401 Unauthorized", function (done) {
            var body = { isbn: VALID_RESOURCE.isbn };
            request
            .post("/api/v1/book")
            .send(body)
            .expect("Content-Type", CONTENT_TYPE)
            .expect(RESPONSE_BODY_UNAUTHORIZED)
            .expect(RESPONSE_BODY_UNAUTHORIZED.status, done);
        });
        it("when POST to an invalid resource but no X-Key/X-Access-Token then expect a Status of 401 Unauthorized", function (done) {
            request
            .post("/api/v1/book")
            .send(INVALID_RESOURCE)
            .expect("Content-Type", CONTENT_TYPE)
            .expect(RESPONSE_BODY_UNAUTHORIZED)
            .expect(RESPONSE_BODY_UNAUTHORIZED.status, done);
        });
        it("when PUT to a valid resource but no X-Key/X-Access-Token then expect a Status of 401 Unauthorized", function (done) {
            request
            .put("/api/v1/book/" + VALID_RESOURCE)
            .send(VALID_RESOURCE)
            .expect("Content-Type", CONTENT_TYPE)
            .expect(RESPONSE_BODY_UNAUTHORIZED)
            .expect(RESPONSE_BODY_UNAUTHORIZED.status, done);
        });
        it("when PUT to an invalid resource but no X-Key/X-Access-Token then expect a Status of 401 Unauthorized", function (done) {
            request
            .put("/api/v1/book/" + INVALID_RESOURCE)
            .send(INVALID_RESOURCE)
            .expect("Content-Type", CONTENT_TYPE)
            .expect(RESPONSE_BODY_UNAUTHORIZED)
            .expect(RESPONSE_BODY_UNAUTHORIZED.status, done);
        });
        it("when DELETE to a valid resource but no X-Key/X-Access-Token then expect a Status of 401 Unauthorized", function (done) {
            request
            .delete("/api/v1/book/" + VALID_RESOURCE.isbn)
            .expect("Content-Type", CONTENT_TYPE)
            .expect(RESPONSE_BODY_UNAUTHORIZED)
            .expect(RESPONSE_BODY_UNAUTHORIZED.status, done);
        });
        it("when DELETE to an invalid resource but no X-Key/X-Access-Token then expect a Status of 401 Unauthorized", function (done) {
            request
            .delete("/api/v1/book/" + INVALID_RESOURCE.isbn)
            .expect("Content-Type", CONTENT_TYPE)
            .expect(RESPONSE_BODY_UNAUTHORIZED)
            .expect(RESPONSE_BODY_UNAUTHORIZED.status, done);
        });
    });
});
