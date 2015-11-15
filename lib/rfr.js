/**
 * The main file of node-rfr.
 * @author Su Su <s@warmsea.net>
 */

var constants = require('./constants');
if (constants.isGlobal) {
  console.warn('Using rfr as a global module is error-prone.');
}

/**
 * The default root.
 * @type {String}
 */
var defaultRoot = constants.defaultRoot;
if (defaultRoot === null) {
  defaultRoot = process.env.RFR_ROOT || process.env.PWD || '';
}
defaultRoot = coerceRoot(defaultRoot);

/**
 * Trim a root and add tailing slash if not exists.
 * @param {String} root A root.
 * @returns {String} The coerced root.
 * @private
 */
function coerceRoot(root) {
  var coerced = root.substring().trim();
  var len = coerced.length;
  if (len > 0 && coerced[len - 1] !== '/') {
    coerced = coerced + '/';
  }
  return coerced;
}

/**
 * Return a module id which can be used by the builtin `require()`.
 * @param {String} idFromRoot A RFR module id.
 * @param {String} root The root.
 * @returns {String} A standard module id.
 * @private
 */
function normalizeId(idFromRoot, root) {
  var id = idFromRoot.substring().trim();
  if (root && id.length > 0 && id[0] === '/') {
    id = id.substring(1);
  }
  id = root + id;
  return id;
}

/**
 * Create a new version of rfr with a function.
 * @param {Function} callable The rfr require function.
 * @param {String} root The root for rfr require.
 * @param {Boolean} isMaster Whether this is a master rfr.
 * @private
 */
var createRfr = function(callable, root, isMaster) {
  rfr = callable.bind(callable);

  /**
   * A read-only property tells whether this rfr instance is a master one.
   * Call `require('rfr')` to get a master rfr instance.
   * User created rfr instances, such as `require('rfr')({ root: '...' })` are
   * not master ones.
   * @type {Boolean}
   */
  Object.defineProperty(rfr, 'isMaster', {
    configurable: false,
    enumerable: true,
    value: !!isMaster,
    writable: false
  });

  /**
   * A read-only property tells whether this rfr instance is a global master.
   * Call `require('rfr')` on a global rfr module to get a master rfr instance.
   * Using the global master is error-prone.
   * @type {Boolean}
   */
  Object.defineProperty(rfr, 'isGlobalMaster', {
    configurable: false,
    enumerable: true,
    value: constants.isGlobal && !!isMaster,
    writable: false
  });

  /**
   * The root of a rfr instance.
   * @type {String}
   */
  Object.defineProperty(rfr, 'root', {
    configurable: false,
    enumerable: true,
    get: function() {
      return callable.root;
    },
    set: function(root) {
      callable.root = coerceRoot(root);
    }
  });

  /**
   * Set the root.
   * @param {String} root The new root.
   */
  rfr.setRoot = function(root) {
    this.root = root;
  };

  /**
   * Get the filename that will be loaded when this rfr is called.
   * @returns {String} module filename.
   */
  rfr.resolve = function(idFromRoot) {
    return require.resolve(normalizeId(idFromRoot, this.root));
  };

  rfr.root = root;
  return rfr;
};

/**
 * Create a new version of rfr.
 * @param {{root:String}} config config of this version.
 * @returns {rfr} a new rfr version.
 * @private
 */
function createVersion(config) {
  if (!(config && (typeof config.root === 'string'
      || config.root === null || config.root === undefined))) {
    throw new Error('"config.root" is required and must be a string');
  }
  var root = config.root;
  if (root === null || root === undefined) {
    root = defaultRoot;
  }

  return createRfr(function(idFromRoot) {
    if (typeof idFromRoot !== 'string') {
      throw new Error('A string is required for the argument of ' +
      'a user created RFR version.');
    }
    return require(normalizeId(idFromRoot, this.root));
  }, root);
}

/**
 * Do the RFR require action, or create a new version of RFR.
 * If a string is passed as the argument, this function will do the RFR require
 * action. Else, this function will create a new version of RFR with the
 * argument as config.
 * @function
 * @param {String|Object} idFromRoot Module id or RFR config.
 * @returns {Module|RFR} A module or a RFR version.
 */
var rfr = createRfr(function(idFromRoot) {
  if (typeof idFromRoot === 'string') {
    return require(normalizeId(idFromRoot, this.root));
  } else {
    return createVersion(idFromRoot);
  }
}, defaultRoot, true);

module.exports = rfr;
