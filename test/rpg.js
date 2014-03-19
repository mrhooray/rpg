'use strict';
/*jshint -W068 */
/*jshint expr:true */

require('should');
var rpg = require('../lib/rpg');

describe('rpg.js', function () {
  it('should return a password', function () {
    rpg().should.be.type('string').and.not.be.empty;
  });
  it('should be able to accept plain object as options', function () {
    var options = [{}, {mode: 'lu', length: 8}];
    options.forEach(function (option) {
      (function () {
        rpg(option).should.be.type('string').and.not.be.empty;
      }).should.not.throw();
    });
  });
  it('should throw error when options is not a plain object', function () {
    var fn = function () {};
    var options = [0, 1, true, false, '123', [], null, fn];
    options.forEach(function (option) {
      (function () {
        rpg(option);
      }).should.throw(/options/);
    });
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
