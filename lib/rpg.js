(function () {
  'use strict';

  var characters = {
    lchars: 'abcdefghijklmnopqrstuvwxyz',
    uchars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    digits: '0123456789',
    punctuations: '`~@#$%^&*-_=+()[]{}<>,.;:!?|/\'"\\'
  };
  var defaults = {
    set: 'ludp',
    length: 12,
    exclude: ''
  };

  function rpg(options) {
    if (options === undefined) {
      options = {};
    } else if (options === null || typeof options !== 'object' || Object.getPrototypeOf(options) !== Object.prototype) {
      throw new Error('options should be a plain object');
    }

    if (options.set !== undefined) {
      if (typeof options.set !== 'string') {
        throw new Error('set should be a string');
      } else if (!/^[ludp]+$/i.test(options.set)) {
        throw new Error('set should be combination of l(lower case), u(upper case), d(digit), p(punctuation)');
      }
    }

    if (options.length !== undefined) {
      if (typeof options.length !== 'number' || options.length <= 0 || options.length !== parseInt(options.length)) {
        throw new Error('length should be an integer and greater than 0');
      } else if (options.length > 1024) {
        throw new Error('length should not be greater than 1024');
      }
    }

    if (options.exclude !== undefined) {
      if (typeof options.exclude !== 'string') {
        throw new Error('exclude should be a string');
      }
    }

    var allowed = '';
    var result = '';
    var set = (options.set || defaults.set).toLowerCase();
    var length = options.length || defaults.length;
    var exclude = options.exclude || defaults.exclude;

    allowed += set.indexOf('l') > -1 ? characters.lchars : '';
    allowed += set.indexOf('u') > -1 ? characters.uchars : '';
    allowed += set.indexOf('d') > -1 ? characters.digits : '';
    allowed += set.indexOf('p') > -1 ? characters.punctuations : '';

    allowed = allowed.split('').filter(function (c) {
      return exclude.indexOf(c) < 0;
    }).join('');

    if (allowed.length <= 0) {
      throw new Error('allowed character set is empty');
    }

    while (length > 0) {
      result += allowed[randomInt(allowed.length)];
      length--;
    }

    return result;
  }

  function randomInt(n) {
    return Math.floor(Math.random() * n);
  }

  if (typeof define !== 'undefined' && define.amd) {
    define([], function () {
      return rpg;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = rpg;
  } else {
    this.rpg = rpg;
  }
}).call(this);
