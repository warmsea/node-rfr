var assert = require('assert');
var path = require('path');
var t = require('./util').wrap;

describe('rfr', function() {

  it('should add tailing slash if needed', function() {
    t(function(rfr) {
      var check = function(raw, expected) {
        rfr.root = '';
        rfr.root = raw;
        assert.equal(rfr.root, expected);
        rfr.root = '';
        rfr.setRoot(raw);
        assert.equal(rfr.root, expected);
      };
      check('', '');  // Shouldn't add tailing slash here
      check('/', '/');
      check(path.join(__dirname, 'test'), path.join(__dirname, 'test/'));
      check(path.join(__dirname, 'test/'), path.join(__dirname, 'test/'));
    });
  });

});
