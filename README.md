node-rfr
========

**node-rfr** is a *<b>R</b>equire <b>F</b>rom project <b>R</b>oot* tool for Node.js.

**node-rfr** allows you to require modules in your project with ```rfr('/lib/module1.js')``` instead of something like ```require('../../lib/module1.js')```.

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
|--lib
   |--module1.js
   |--module2.js
```

If we run ```run.js``` in the project folder, we can require modules relatively like this:

```bash
var rfr = require('rfr');
var module1 = rfr('/lib/module1');
var module2 = rfr('lib/module2');  // Leading slash can be omitted.
```

Customize the Root
------------------

By default, the root path is the current working path where you run the program. If you want to use another path as the root, set it to the environment variable named ```RFR_ROOT``` before you require **node-rfr**. For example, run the program like this:

```bash
RFR_ROOT=<some_path> node run.js
```

Or set it with the following code:

```javascript
rfr.setRoot('some_path');
```

An absolute path is preferred for the root. Maybe you want to use `__dirname`.

Multi-version RFR
-----------------

If you want to use RFR in your module, and want to publish it to NPM. It is possible that a project depends on your module is also using RFR. And if that project changes the RFR root, your module might fail.

Multi-version RFR helps. In the following example, `rfr`, `rfr1` and `rfr2` could have different roots.

```javascript
var rfr = require('rfr');
var rfr1 = require('rfr')({
  root: '/lib'
});
var rfr2 = require('rfr')({
  root: '/include'
});

rfr.setRoot('/');  // Only changes the root of rfr

rfr('/module');   // Requires '/module'
rfr1('/module');  // Requires '/lib/module'
rfr2('/module');  // Requires '/include/module'
```

It is strongly recommended to use a versioned RFR in a project, or a module, that might be a dependency of another one.

Change Log
----------

**2014-10-06 v1.1.0** Add multi-version RFR support.

**2014-05-01 v1.0.0** First release with require from root support.
