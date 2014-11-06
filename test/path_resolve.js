var assert = require('assert');
var path = require('path');
var t = require('./util').wrap;

describe('rfr.resolve()', function() {

  it('should recognize sub-folders and index.js', function() {
    t(function(rfr) {
      var check = function(id, expected) {
        assert.equal(rfr.resolve(id), path.join(__dirname, expected));
      };
      rfr.root = __dirname;
      check('m11', 'm11/index.js');
      check('m11/m21', 'm11/m21/index.js');
      check('m11/m22', 'm11/m22.js');
    });
  });

  it('should accept leading slash', function() {
    t(function(rfr) {
      var check = function(id, expected) {
        assert.equal(rfr.resolve(id), path.join(__dirname, expected));
      };
      rfr.root = __dirname;
      check('/m11', 'm11/index.js');
      check('/m11/m21', 'm11/m21/index.js');
      check('/m11/m22', 'm11/m22.js');
    });
  });

});
