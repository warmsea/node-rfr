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

Suppose we have a project structed as the following:

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
var module2 = rfr('/lib/module2');
```

Customize the Root
------------

By default, the root path is the current working path where you run the program. If you want to use another path as the root, set it to the environment variable named ```RFR_ROOT``` before you require **node-rfr**. For example, run the program like this:

```bash
RFR_ROOT=<some_path> node run.js
```

Or set it with the following code:

```javascript
rfr.setRoot('some_path');
```

The root should be an absolute path. Maybe you want to use ```__dirname```.
