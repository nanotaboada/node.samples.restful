"use strict";

var request = require("supertest");

var CONTENT_TYPE = "application/json; charset=utf-8",
		ENDPOINT = "http://localhost:8888",
		EMAIL = "nanotaboada@msn.com",
		PASSWORD = "p455w0rd",
		RESPONSE_BODY_UNAUTHORIZED = { status: 401, message: "Unauthorized." },
		TIMEOUT_IN_MILISECONDS = 10000;

function hasAuthorizationToken(response) {
  if (response.body.token) {
    return true;
  }
};

request = request(ENDPOINT);

describe("Auth", function () {
	  this.timeout(TIMEOUT_IN_MILISECONDS);
	  describe("/login", function () {
		    it("When GET, then expect a Status of 404 Not Found", function (done) {
			      request
			      .get("/login")
			      .expect(404, done);
		    });
		    it("When POST with neither email nor password, then expect a Status of 401 Unauthorized", function (done) {
			      request
			      .post("/login")
			      .expect("Content-Type", CONTENT_TYPE)
			      .expect(RESPONSE_BODY_UNAUTHORIZED)
			      .expect(RESPONSE_BODY_UNAUTHORIZED.status, done);
		    });
		    it("When POST with email but no password, then expect a Status of 401 Unauthorized", function (done) {
			      request
			      .post("/login")
			      .send({ email : EMAIL })
			      .expect("Content-Type", CONTENT_TYPE)
			      .expect(RESPONSE_BODY_UNAUTHORIZED)
			      .expect(RESPONSE_BODY_UNAUTHORIZED.status, done);
		    });
		    it("When POST with password but no email, then expect a Status of 401 Unauthorized", function (done) {
			      request
			      .post("/login")
			      .send({ password : PASSWORD })
			      .expect("Content-Type", CONTENT_TYPE)
			      .expect(RESPONSE_BODY_UNAUTHORIZED)
			      .expect(RESPONSE_BODY_UNAUTHORIZED.status, done);
		    });
		    it("When POST with email and password, then expect a Status of 200 OK", function (done) {
			      request
			      .post("/login")
			      .send({email: EMAIL, password: PASSWORD})
			      .expect("Content-Type", CONTENT_TYPE)
			      .expect(200, done);
		    });
		    it("When POST response is 200 OK, then it should contain authorization token", function (done) {
			      request
			      .post("/login")
			      .send({email: EMAIL, password: PASSWORD})
			      .expect("Content-Type", CONTENT_TYPE)
			      .expect(hasAuthorizationToken)
			      .expect(200, done);
		    });
		    it("When PUT, then expect a Status of 404 Not Found", function (done) {
			      request
			      .put("/login")
			      .expect(404, done);
		    });
		    it("When DELETE, then expect a Status of 404 Not Found", function (done) {
			      request
			      .delete("/login")
			      .expect(404, done);
		    });
	  });
});
