# lesshint
[![npm](https://img.shields.io/npm/v/lesshint.svg)](https://www.npmjs.com/package/lesshint)
[![Build Status](https://travis-ci.org/lesshint/lesshint.svg?branch=master)](https://travis-ci.org/lesshint/lesshint)
[![Build status](https://ci.appveyor.com/api/projects/status/d1u4477uxtv6dygk/branch/master?svg=true)](https://ci.appveyor.com/project/lesshint/lesshint/branch/master)
[![Coverage Status](https://coveralls.io/repos/lesshint/lesshint/badge.svg?branch=master)](https://coveralls.io/r/lesshint/lesshint?branch=master)

`lesshint` is a tool to aid you in writing clean and consistent [Less](http://lesscss.org/).

* [Installation](#installation)
* [Configuration](#configuration)
* [CLI usage](#cli-usage)
* [Linters](#linters)
* [Reporters](#reporters)
* [Developer resources](#developer-resources)

## Installation
_[Node.js](https://nodejs.org/) 4 (or later) is required._

Run the following from the command line to install `lesshint` (add `-g` to install globally):

```
npm install lesshint
```

## Configuration
<<<<<<< HEAD
For information on how to configure `lesshint` and other available options, see the [user guide](/docs/user-guide/configuration.md).

Since `lesshint` is highly customizable we recommend you to also take a look at the [available rule options](/lib/linters/README.md) to tailor it to your needs.
=======
`lesshint` is customizable and we highly recommend you to look at the [available options](lib/linters/README.md) to tailor it to your needs.

Start by creating a `.lesshintrc` file in your project root and add your settings to it. It will be automatically loaded and merged with the default values.

Each option is then specified by its own JSON object, for example:

```js
{
    "fileExtensions": [".less", ".css"],

    "excludedFiles": ["vendor.less"],

    "spaceAfterPropertyColon": {
        "enabled": true,
        "style": "one_space" // Comments are allowed
    },

    "emptyRule": true // If there are no options for a rule, you can simply enable it by setting it to true
}
```

### Setting custom configuration path

```js
var path = require('path');
var fs = require('fs');
var LessHint = require('lesshint');
var lesshint = new LessHint();

var lesshintConfigPath = path.resolve('my-custom-path/.lesshintrc');
var lesshintConfig = JSON.parse(fs.readFileSync(lesshintConfigurePath, 'utf8'));

lesshint.configure(lesshintConfiguration);
```

### Inline configuration
It's also possible to configure rules using inline comments in your `.less` files. For example:

```less
// lesshint spaceBeforeBrace: false
.foo{ // This line won't be reported
    color: red;
}
```

It's also possible to disable rules on a single line using a trailing comment:

```less
.bar {
    color:red; // lesshint spaceAfterPropertyColon: false
}
```

If you wish to enable a rule that's disabled in your `.lesshintrc` you need to specify any other options too. But rules without options can be enabled by just setting it to `true`. For example:

`.lesshintrc`:
```json
{
    "emptyRule": false,
    "spaceAfterPropertyName": false
}
```

`file.less`
```less
// lesshint spaceAfterPropertyName: { enabled: true, style: "one_space" }, emptyRule: true
.foo {
    color : red; // Won't report the extra space before ":"
}

.bar {

}
```

The options format is a less strict form of JSON. Keys doesn't need any quotes but string values need double quotes.

### Options

#### fileExtensions
Array of file extensions to check. Either an array of extensions or `"*"` to allow all files. For example:

```js
"fileExtensions": [".less", ".css"] // Allow ".less" and ".css" files. Can be passed with or without a dot.

"fileExtensions": "*" // Allow all files
```

#### excludedFiles
Array of [minimatch glob patterns](https://github.com/isaacs/minimatch) or a file to exclude. For example:

```js
"excludedFiles": ["vendor/*.less"] // Ignore all files in "vendor/"

"excludedFiles": ["vendor.less"] // Ignore a file named "vendor.less"
```

#### linters
It's also possible to define your own linters to add to the built-in list. These can be the linters themselves or require paths relative to your current working directory. For example:

```js
"linters": [
    "/path/to/sample-linter.js"
],

"sample": {
    "enabled": true
},

"otherSample": {
    "enabled": true
}
```


## Custom linters
Since `2.0.0` it's possible to create your own linters when needed for something team/project specfic or something that's out of scope for `lesshint`.

To work properly, all linters are required to expose a few things.
* `name` - The name of the linter. While we don't enforce namespaces, we recommend it to prevent naming collisions.
* `nodeTypes` - An array of [PostCSS node types](http://api.postcss.org/postcss.html) that the linter wants to check.
* `lint` - The main lint method which will be called with the following arguments.
    * `config` - The config object for this linter.
    * `node` - The current node to lint.

If the linter doesn't find any errors or doesn't need/want to check the passed node for some reason it should return `undefined`. If it finds something it should return an array of result objects which looks like this:

```js
{
    column: 5,
    file: 'file.less',
    fullPath: 'path/to/file.less',
    line: 1,
    linter: 'spaceBeforeBrace',
    message: 'Opening curly brace should be preceded by one space.',
    severity: 'warning',
    source: '.foo{'
}
```

If a linter doesn't set a value for a property, `lesshint` will set it. Most of the time, you'll only want to set `column`, `line`, and `message` while leaving the rest to `lesshint`.

A simple linter example:
```js
module.exports = {
    name: 'my-namespace/my-super-awesome-linter',
    nodeTypes: ['decl'],
    lint: function (config, node) {
        var results = [];

        if (true) { // Nothing to lint, return early
            return;
        }

        // Check some things...

        // Return the results
        return results;
    }
};
```

We highly recommend the following resources which are all included with `lesshint`.
* [postcss](http://api.postcss.org/postcss.html) - Main PostCSS docs.
* [postcss-less](https://github.com/webschik/postcss-less) - PostCSS Less plugin docs.
* [postcss-selector-parser](https://github.com/postcss/postcss-selector-parser) - PostCSS plugin for working with selectors.
* [postcss-values-parser](https://github.com/lesshint/postcss-values-parser) - PostCSS plugin for working with values.
>>>>>>> master

## CLI usage
Run `lesshint` from the command-line by passing one or more files/directories to recursively scan.

```
lesshint src/less/ lib/style.less
```

Available Flags         | Description
----------------------|---------------------
`-c`/`--config`       | Specify the configuration file to use (will be merged with defaults).
`-e`/`--exclude`      | A [minimatch glob pattern](https://github.com/isaacs/minimatch) or a file to exclude from being linted.
`-l`/`--linters`      | Paths to custom linters to add to the built-in list. See "Linters" below for more information.
`-r`/`--reporter`     | The reporter to use. See "Reporters" below for more information.
`-V`/`--version`      | Show the version.
`-x`/`--max-warnings` | Number of warnings to allow before exiting with a non-zero code.

### Exit status codes
Depending on the linter results and options supplied, the exit status code returned by the CLI will differ.

Exit status code   | Description
-------------------|----------------------------------------------
`0`                | Everything is alright, no linting errors found.
`1`                | One or more linting errors with a severity of `warning` was found.
`2`                | One or more linting errors with a severity of `error` was found.
`66`               | No files to lint were supplied.
`70`               | An unknown error occurred within `lesshint`, possibly a bug. [Please file an issue!](https://github.com/lesshint/lesshint/issues/new)
`78`               | Something is wrong with the config file, most likely invalid JSON.

These codes were chosen with regards to the [preferable exit codes](http://www.gsp.com/cgi-bin/man.cgi?section=3&topic=sysexits).

## Linters
In addition to the linters included with `lesshint`, it's also possible to include custom ones. For example to check something team or project specific.

For more information on using custom linters, see the [user guide](/docs/user-guide/linters.md).

## Reporters
Reporters are small modules that can be used to perform actions with the lint results, for example printing something to the terminal or generate custom reports.

For more information on using reporters, see the [user guide](/docs/user-guide/reporters.md).

## Developer resources
* [Node API](/docs/developer-guide/API.md) - `lesshint`'s public Node API reference.
* [Developing linters](/docs/developer-guide/linters.md) - Guide for hacking on linters.
* [Developing reporters](/docs/developer-guide/reporters.md) - Guide for hacking on reporters.
