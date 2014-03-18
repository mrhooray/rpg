'use strict';
/*jshint -W068 */

require('should');
var rpg = require('../lib/rpg');

describe('rpg.js', function () {
  it('should return a password', function () {
    var pwd = rpg();
    pwd.should.be.type('string');
    pwd.length.should.greaterThan(0);
  });
  it('should work with empty options object', function () {
    var pwd = rpg({});
    pwd.should.be.type('string');
    pwd.length.should.greaterThan(0);
  });
  it('should be able to configure password length', function () {
    var lengths = [1, 16, 1024];
    lengths.forEach(function (length) {
      rpg({length: length}).should.be.type('string').and.with.length(length);
    });
  });
  it('should throw error when password length is not an integer', function () {
    var lengths = [1.1, '', {}, []];
    lengths.forEach(function (length) {
      (function () {
        rpg({length: length});
      }).should.throw(/length/);
    });
  });
  it('should throw error when password length is smaller than 0', function () {
    (function () {
      rpg({length: -1});
    }).should.throw(/length/);
  });
  it('should throw error when password length is greater than 1024', function () {
    (function () {
      rpg({length: 1025});
    }).should.throw(/length/);
  });
});
