/**
 * The main file of node-rfr.
 * 
 * @author Su Su <s@warmsea.net>
 */

var root = '/';

var rfr = module.exports = function(idFromRoot) {
  var id = idFromRoot.toString();
  var len = id.length;
  if (len > 0 && id[0] !== '/') {
    id = '/' + id;
  }
  id = root + id;
  return require(id);
};

rfr.setRoot = function(newRoot) {
  root = coerceRoot(newRoot);
};

function coerceRoot(root) {
  var coerced = root.toString();
  var len = coerced.length;
  if (len > 0 && coerced[len - 1] === '/') {
    coerced = coerced.substring(0, len - 1);
  }
  return coerced;
}

rfr.setRoot(process.env.RFR_ROOT || process.env.PWD || process.cwd() || '/');
