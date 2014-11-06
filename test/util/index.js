var m = require('module');
var idIndex = require.resolve('../..');
var idRfr = require.resolve('../../lib/rfr');

module.exports.wrap = function(tester) {
  delete m._cache[idIndex];
  delete m._cache[idRfr];
  tester(require('../..'));
};
