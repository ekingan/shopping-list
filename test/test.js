var request = require('request'),
   expect = require('chai').expect;

// DESCRIBE WHAT WE ARE TESTING
  // SAY WHAT BEHAVIOR 'IT' AUGHT TO HAVE
    // SEND THE REQUEST
      // USE CHAI-EXPECT TO EXPECT THE STATUS RESULT
      // CHECK FALSE VALUE TO SEE IF WE CAN MAKE TEST FAIL
      // CALL DONE();

describe('home', function() {
  it('should have a HTTP of 200 - success', function(done) {
    request('http://localhost:3000', function(err, res, body) {
      expect(res.statusCode).to.equal(200);
      // expect(res.statusCode).to.equal(300)
      done();
    });
  });
});

describe('guest-page', function() {
  it('should have a HTTP of 200 - success', function(done) {
    request.post('http://localhost:3000/users', function(err, res, body) {
      console.log(body);
      // expect(res.statusCode).to.equal(200);
      // expect(res.statusCode).to.equal(300)
      done();
    });
  });
});