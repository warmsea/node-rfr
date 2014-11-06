var assert = require('assert');
var path = require('path');
var t = require('./util').wrap;

describe('rfr custom version', function() {

  it('should accept custom root', function() {
    t(function(rfr) {
      var v = rfr({ root: __dirname });
      assert.equal(v.resolve('m11'), path.join(__dirname, 'm11/index.js'));
      v.root = '';
      assert.equal(v('util'), require('util'));
    });
  });

  it('should have the same default root with the master', function() {
    t(function(rfr) {
      var v = rfr({});
      assert.equal(v.root, rfr.root);
    });
  });

  it('should throw an error if root is not a string', function() {
    t(function(rfr) {
      assert.throws(function() {
        rfr({ root: 1 });
      });
    });
  });

  it('should throw an error if id is not a string', function() {
    t(function(rfr) {
      var v = rfr({});
      assert.throws(function() {
        v(1);
      });
    });
  });

});
