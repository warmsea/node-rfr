/**
 * Constants.
 * @author Su Su <s@warmsea.net>
 */

/**
 * The exec path. It should looks like "/usr/local/bin/node".
 * @type {String}
 * @private
 */
var execPath = process.execPath;

/**
 * The path of global node modules.
 * @type {String|null}
 * @private
 */
var globalNodeModulesPath = null;
var end = execPath.length - 9;
if (end < 0) {
  end = -2;
}
if (typeof execPath === 'string' && execPath.indexOf('/bin/node') === end) {
  globalNodeModulesPath = execPath.substring(0, end) + '/lib';
}

/**
 * The node_modules path of this RFR install.
 * @ {String|null}
 */
var thisNodeModulesPath = null;
end = __dirname.lastIndexOf('/node_modules');
if (end >= 0) {
  thisNodeModulesPath = __dirname.substring(0, end);
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
  isGlobal: globalNodeModulesPath === thisNodeModulesPath
};
