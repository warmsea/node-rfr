/**
 * Constants.
 * @author Su Su <s@warmsea.net>
 */

var fs = require('fs');
var path = require('path');

/**
 * The node_modules path of this RFR install.
 * @ {String|null}
 */
var thisNodeModulesPath = null;
var end = __dirname.lastIndexOf(path.sep + 'node_modules');
if (end >= 0) {
  thisNodeModulesPath = __dirname.substring(0, end);
}

/**
 * The exec path. It may looks like:
 *   1. "/usr/local/bin/node"
 *   2. "/Users/warmsea/.nvm/versions/io.js/v3.1.0/bin/iojs"
 *   3. "C:\Program Files\iojs\iojs.exe"
 * @type {String}
 * @private
 */
var execPath = process.execPath;

/**
 * The path of global node modules folder or its parent folder.
 * @type {String|null}
 * @private
 */
var globalNodeModulesPath = null;
if (typeof execPath === 'string') {
  var execDir = path.dirname(execPath);
  try {
    fs.accessSync(path.join(execPath, 'node_modules'));
    globalNodeModulesPath = execDir;
  } catch (_) {
    globalNodeModulesPath = path.dirname(execDir);
  }
}

/**
 * Indicates if this RFR install is a global node module.
 * @type {boolean}
 */
var isGlobal = false;
if (globalNodeModulesPath) {
  if (globalNodeModulesPath === thisNodeModulesPath) {
    isGlobal = true;
  } else if (globalNodeModulesPath === path.dirname(thisNodeModulesPath)) {
    isGlobal = true;
  }
}

module.exports = {

  /**
   * The default root of this RFR install.
   * If it is not a module inside some node_modules directory, this variable
   * will be `null`.
   * @type {String|null}
   */
  defaultRoot: thisNodeModulesPath,

  /**
   * Whether this RFR install is a global node module.
   * @type {Boolean}
   */
  isGlobal: isGlobal
};
