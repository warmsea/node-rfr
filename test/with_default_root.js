var assert = require('assert');
var t = require('./util').wrap;

describe('rfr with default root', function() {

  it('should use RFR_ROOT as default root', function() {
    var save = process.env.RFR_ROOT;
    process.env.RFR_ROOT = __dirname;
    t(function(rfr) {
      assert.equal(rfr('m11'), require('./m11'));
    });
    if (save === undefined) {
      delete process.env.RFR_ROOT;
    } else {
      process.env.RFR_ROOT = save;
    }
  });

  it('should use PWD as default root', function() {
    t(function(rfr) {
      assert.equal(rfr('test/m11'), require('./m11'));
    });
  });

  it('should use empty string as default root', function() {
    var save = process.env.PWD;
    delete process.env.PWD;
    t(function(rfr) {
      assert.equal(rfr('assert'), require('assert'));
    });
    if (save !== undefined) {
      process.env.PWD = save;
    }
  });

});
