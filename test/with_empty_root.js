var assert = require('assert');
var t = require('./util').wrap;

describe('rfr with root ""', function() {

  it('should work as native require', function() {
    t(function(rfr) {
      rfr.root = '';
      assert.equal(rfr('util'), require('util'));
    });
  });

});
