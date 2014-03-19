'use strict';
/*jshint -W068 */
/*jshint expr:true */

require('should');
var rpg = require('../lib/rpg');

describe('rpg.js', function () {
  describe('default', function () {
    it('should return a password', function () {
      rpg().should.be.type('string').and.not.be.empty;
    });
  });


  describe('options', function () {
    it('should accept plain object as options', function () {
      var options = [{}, {set: 'lu', length: 8}];
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
  });

  describe('options.length', function () {
    it('should be able to set password length', function () {
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

  describe('options.set', function () {
    it('should be able to set character set', function () {
      var sets = ['l', 'u', 'd', 'p', 'lu', 'ld', 'lp', 'ud', 'up', 'dp', 'lud', 'lup', 'ldp', 'udp'];
      sets.forEach(function (set) {
        var pwd = rpg({length: 50, set: set});
        var allowed = getAllowedCharacters(set);
        pwd.split('').forEach(function (c) {
          allowed.should.containEql(c);
        });
      });
    });
    it('should throw error when set is not a string', function () {
      var fn = function () {};
      var sets = [0, 1, true, false, {}, [], null, fn];
      sets.forEach(function (set) {
        (function () {
          rpg({set: set});
        }).should.throw(/set/);
      });
    });
    it('should throw error when set is not combination of l, u, d, p', function () {
      var sets = ['', 'a', 'aludp', 'ludpb', 'lucdp'];
      sets.forEach(function (set) {
        (function () {
          rpg({set: set});
        }).should.throw(/set/);
      });
    });

  });

  describe('options.exclude', function () {
    it('should be able to set excluded characters', function () {
      var sets = ['l', 'u', 'd', 'p', 'lu', 'ld', 'lp', 'ud', 'up', 'dp', 'lud', 'lup', 'ldp', 'udp'];
      var options = sets.map(function (set) {
        var exclude = getAllowedCharacters(set);
        return {set: set, exclude: exclude.substring(Math.random() * exclude.length, Math.random() * exclude.length)};
      });
      options.forEach(function (option) {
        var pwd = rpg(option);
        pwd.split('').forEach(function (c) {
          option.exclude.should.not.containEql(c);
        });
      });
    });
    it('should throw error when exclude is not a string', function () {
      var fn = function () {};
      var excludes = [0, 1, true, false, {}, [], null, fn];
      excludes.forEach(function (exclude) {
        (function () {
          rpg({exclude: exclude});
        }).should.throw(/exclude/);
      });
    });
    it('should throw error when allowed character set becomes empty', function () {
      var sets = ['l', 'u', 'd', 'p', 'lu', 'ld', 'lp', 'ud', 'up', 'dp', 'lud', 'lup', 'ldp', 'udp'];
      var options = sets.map(function (set) {
        return {set: set, exclude: getAllowedCharacters(set)};
      });
      options.forEach(function (option) {
        (function () {
          rpg(option);
        }).should.throw(/allowed/);
      });
    });
  });

  function getAllowedCharacters(set, exclude) {
    if (!set) {
      set = 'ludp';
    }
    if (!exclude) {
      exclude = '';
    }
    var characters = {
      lchars: 'abcdefghijklmnopqrstuvwxyz',
      uchars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      digits: '0123456789',
      punctuations: '`~@#$%^&*-_=+()[]{}<>,.;:!?|/\'"\\'
    };
    var allowed = '';
    allowed += set.indexOf('l') > -1 ? characters.lchars : '';
    allowed += set.indexOf('u') > -1 ? characters.uchars : '';
    allowed += set.indexOf('d') > -1 ? characters.digits : '';
    allowed += set.indexOf('p') > -1 ? characters.punctuations : '';
    allowed = allowed.split('').filter(function (c) {
      return exclude.indexOf(c) < 0;
    }).join('');
    return allowed;
  }
});
