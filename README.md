# lesshint
[![npm](https://img.shields.io/npm/v/lesshint.svg)](https://www.npmjs.com/package/lesshint)
[![Build Status](https://travis-ci.org/lesshint/lesshint.svg?branch=master)](https://travis-ci.org/lesshint/lesshint)
[![Build status](https://ci.appveyor.com/api/projects/status/d1u4477uxtv6dygk/branch/master?svg=true)](https://ci.appveyor.com/project/lesshint/lesshint/branch/master)
[![Coverage Status](https://coveralls.io/repos/lesshint/lesshint/badge.svg?branch=master)](https://coveralls.io/r/lesshint/lesshint?branch=master)
[![Dependency Status](https://david-dm.org/lesshint/lesshint.svg?theme=shields.io&style=flat)](https://david-dm.org/lesshint/lesshint)
[![devDependency Status](https://david-dm.org/lesshint/lesshint/dev-status.svg?theme=shields.io&style=flat)](https://david-dm.org/lesshint/lesshint#info=devDependencies)

`lesshint` is a tool to aid you in writing clean and consistent [Less](http://lesscss.org/).

* [Requirements](#requirements)
* [Installation](#installation)
* [Configuration](#configuration)
* [Custom linters](#custom-linters)
* [CLI usage](#cli-usage)
* [Reporters](#reporters)

## Requirements
[Node.js](https://nodejs.org/) 0.12 (or later) or [io.js](https://iojs.org/) 1.0 (or later).

## Installation
Run the following command from the command line (add `-g` to install globally):

```
npm install lesshint
```

## Configuration
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
    }
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
    "./plugins/linters/sampleLinter",
    require("./plugins/linters/otherSampleLinter")
]
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
```

We highly recommend the following resources which are all included with `lesshint`.
* [postcss](http://api.postcss.org/postcss.html) - Main PostCSS docs.
* [postcss-less](https://github.com/webschik/postcss-less) - PostCSS Less plugin docs.
* [postcss-selector-parser](https://github.com/postcss/postcss-selector-parser) - PostCSS plugin for working with selectors.
* [postcss-values-parser](https://github.com/lesshint/postcss-values-parser) - PostCSS plugin for working with values.

## CLI usage
Run `lesshint` from the command-line by passing one or more files/directories to recursively scan.

```
lesshint src/less/ lib/style.less
```

Available Flags     | Description
--------------------|----------------------------------------------
`-c`/`--config`     | Specify the configuration file to use (will be merged with defaults).
`-e`/`--exclude`    | A [minimatch glob pattern](https://github.com/isaacs/minimatch) or a file to exclude form being linted.
`-l`/`--linters`    | Require paths of custom linters to add to the built-in list.
`-r`/`--reporter`   | The reporter to use. See "Reporters" below for possible values.
`-V`/`--version`    | Show version.

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

## Reporters
Reporters can be used to perform actions with the lint results, for example printing something to the terminal or generate custom reports.

### The reporter loading steps

1. If nothing is passed, a simple, default reporter will be used. This will just print all the warnings/errors found.
2. Pass the name of a Node module. If `lesshint` is installed globally only globally installed reporters are available (the normal Node module loading rules apply).
3. Pass a absolute or relative path to a custom reporter anywhere on the disk. Relative paths will be resolved against [`process.cwd()`](https://nodejs.org/api/process.html#process_process_cwd).

These steps always apply, no matter whether you're using the CLI or calling `lesshint` from code.

### Using reporters from the CLI
```bash
lesshint --reporter my-super-awesome-reporter file.less
lesshint --reporter /path/to/my/super/awesome/reporter.js file.less
```

### Using reporters from code
If you're writing code which utilizes `lesshint`, for example a Gulp plugin you can use the `getReporter` method on the `lesshint` object to load a reporter using the same logic as `lesshint` does.

Pass the name of a module or a path to the `getReporter` method like this:

```js
var defaultReporter = lesshint.getReporter(); //Or pass path to your custom reporter in getReporter
var promise = lesshint.checkFile('my-less-file.less');
	
promise.then(function(result){
  defaultReporter.report(result);
})
```

### Writing your own reporter
In its simplest form, a reporter is just a function accepting some input. The most basic reporter possible:

```js
module.exports = {
    name: 'my-super-awesome-reporter', // Not required, but recommended
    report: function (errors) {
        console.log(errors.length ? 'Errors found' : 'No errors');
    }
};
```

The reporter will be passed an array of objects representing each error:

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

It's then up to the reporter to do something with the errors. No `return`s or anything is needed. If running from the CLI, `lesshint` will handle the setting of correct exit codes.

Take a look at the [default reporter](https://github.com/lesshint/lesshint/blob/master/lib/reporters/default.js) for more information.


