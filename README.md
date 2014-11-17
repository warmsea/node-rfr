node-rfr
========

[![NPM Version][https://img.shields.io/npm/v/rfr.svg?style=flat]](https://npmjs.org/package/rfr)
[![Build Status](http://img.shields.io/travis/warmsea/node-rfr.svg?style=flat)](https://travis-ci.org/warmsea/node-rfr)
[![Coverage Status](https://img.shields.io/coveralls/warmsea/node-rfr.svg?style=flat)](https://coveralls.io/r/warmsea/node-rfr?branch=master)

**node-rfr** is a *<b>R</b>equire <b>F</b>rom (project) <b>R</b>oot* tool for
Node.js.

**node-rfr** allows you to require modules in your project with
`rfr('lib/module1.js')` instead of something like
`require('../../lib/module1.js')`.

Install
-------

```bash
npm install rfr
```

Usage
-----

Suppose we have a project with the following structure:

```
project
|--package.json
|--run.js
`--lib
   |--module1.js
   `--module2.js
```

If we run `run.js` in the project folder, we can require modules relatively
like this:

```bash
var rfr = require('rfr');
var module1 = rfr('/lib/module1');
var module2 = rfr('lib/module2');  // Leading slash can be omitted.
```

The Default Root
----------------

If not specified, a default root will be applied according to where the
*node-rfr* is located. Typically, the module folder "rfr" will be located
in a "node_modules" folder. In this case, the folder contains "node_modules"
will used as the default root.

For example, in the following project. The "project" folder will be used as the
default root.

```
project
|--package.json
|--run.js
`--node_modules
   `--rfr  (Default root: project)
```

This allows **node-rfr** to be used in a module.

```
project
|--package.json
|--run.js
`--node_modules
   |--rfr  (Default root: project)
   `--my_module
      `--node_modules
         `--rfr  (Default root: project/node_modules/my_module)
```

Customize the Root
------------------

If you want to use another path as the root, set (and get) it with the
`.root` property:

```javascript
var rfr = require('rfr');
rfr.root = '/usr/local';  // rfr adds a tailing slash if needed.
rfr.root;                 // Gets "/usr/local/"
```

Or set it with the `.setRoot()` function:

```javascript
var rfr = require('rfr');
rfr.setRoot('some_path');
```

An absolute path is preferred for the root. Maybe you want to use `__dirname`.

Details about Module Path
-------------------------

Use `.resolve()` to find the absolute path of a module without actually
importing it.

```
var rfr = require('rfr');

var path = rfr.resolve('models');
// Returns an absolute path, for example, "/project/lib/models/index.js"
```

Multi-version RFR
-----------------

Sometimes you may want more than one RFR. For example, one for
"<project_root>/lib/" and one for "<project_root>/src/". Multi-version RFR
helps. In the following example, `rfr`, `rUsr` and `rEtc` could have different
roots.

```javascript
var rfr = require('rfr');
var rUsr = require('rfr')({
  root: '/usr'
});
var rEtc = require('rfr')({
  root: '/etc'
});

rfr.setRoot('/');  // Only changes the root of the master rfr

rfr('/module');   // Requires '/module'
rUsr('/module');  // Requires '/usr/module'
rEtc('/module');  // Requires '/etc/module'
```

You can use `.isMaster` property to check whether a RFR instance is the master
one.

```javascript
rfr.isMaster;   // true
rUsr.isMaster;  // false
rEtc.isMaster;  // false
```

Change Log
----------

**2014-11-17 v1.2.0** Change default root strategy. Now can be used in modules.

**2014-10-24 v1.1.1** Adds `.root` and `.isMaster` and `.resolve()`.

**2014-10-07 v1.1.0** Adds multi-version RFR support.

**2014-05-01 v1.0.0** First release with require from root support.
