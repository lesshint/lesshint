# lesshint
[![npm](https://img.shields.io/npm/v/lesshint.svg)](https://www.npmjs.com/package/lesshint)
[![Build Status](https://travis-ci.org/lesshint/lesshint.svg?branch=master)](https://travis-ci.org/lesshint/lesshint)
[![Build status](https://ci.appveyor.com/api/projects/status/96cx40uc5t0842u4/branch/master?svg=true)](https://ci.appveyor.com/project/jwilsson/lesshint/branch/master)
[![Coverage Status](https://coveralls.io/repos/lesshint/lesshint/badge.svg?branch=master)](https://coveralls.io/r/lesshint/lesshint?branch=master)
[![Dependency Status](https://david-dm.org/lesshint/lesshint.svg?theme=shields.io&style=flat)](https://david-dm.org/lesshint/lesshint)
[![devDependency Status](https://david-dm.org/lesshint/lesshint/dev-status.svg?theme=shields.io&style=flat)](https://david-dm.org/lesshint/lesshint#info=devDependencies)

`lesshint` is a tool to aid you in writing clean and consistent [Less](http://lesscss.org/).

* [Requirements](#requirements)
* [Installation](#installation)
* [Configuration](#configuration)
* [CLI usage](#cli-usage)
* [Reporters](#reporters)

## Requirements
[Node.js](https://nodejs.org/) 0.10 (or later) or [io.js](https://iojs.org/) 1.0 (or later).

## Installation
Run the following command from the command line (add -g to install globally):

```
npm install lesshint
```

## Configuration
`lesshint` is customizable and we highly recommend you to look at the [available options](lib/linters/README.md) to tailor it to your needs.

Start by creating a `.lesshintrc` file in your project root and add your settings to it. It will be automatically loaded and merged with the default values.

Each option is then specified by it's own JSON object, for example:

```js
"fileExtensions": [".less", ".css"],

"excludedFiles": ["vendor.less"],

"spaceAfterPropertyColon": {
    "enabled": true,
    "style": "one_space" // Comments are allowed
}
```

### Inline configuration
Since `1.4.0` it's possible to configure rules using inline comments in your `.less` files. For example:

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

## CLI usage
Run `lesshint` from the command-line by passing one or more files/directories to recursively scan.

```
lesshint src/less/ lib/style.less
```

Available Flags     | Description
--------------------|----------------------------------------------
`-c`/`--config`     | Specify the configuration file to use (will be merged with defaults).
`-e`/`--exclude`    | A [minimatch glob pattern](https://github.com/isaacs/minimatch) or a file to exclude form being linted.
`-r`/`--reporter`   | The reporter to use. See "Reporters" below for possible values.
`-V`/`--version`    | Show version.

### Exit status codes
Depending on the linter results and options supplied, the exit status code returned by the CLI will differ.

Exit status code   | Description
-------------------|----------------------------------------------
`0`                | Everything is alright, no linting errors found.
`1`                | One or more linting errors with a severity of `warning` was found.
`2`                | One or more linting errors with a severity of `error` was found (since `1.3.0`).
`66`               | No files to lint were supplied.
`70`               | An unknown error occurred within `lesshint`, possibly a bug. [Please file an issue!](https://github.com/lesshint/lesshint/issues/new)
`78`               | Something is wrong with the config file, most likely invalid JSON.

These codes were chosen with regards to the [preferable exit codes](http://www.gsp.com/cgi-bin/man.cgi?section=3&topic=sysexits).

## Reporters
As of `0.8.0` the ability to specify custom reporters has been added. These can do anything from just printing something to the terminal to generate custom reports.

There are three ways to load a reporter.

1. Pass the name of a core reporter. See below for a complete listing.
2. Pass the name of a Node module. If `lesshint` is installed globally only globally installed reporters are available (the normal Node module loading rules apply).
3. Pass a absolute or relative path to a custom reporter anywhere on the disk. Relative paths will be resolved against [`process.cwd()`](https://nodejs.org/api/process.html#process_process_cwd).

### Core reporters
* `stylish` - Colored print of all errors to the console.

### Writing your own reporter
In it's simplest form, a reporter is just a function accepting some input. The most basic reporter possible:

```js
module.exports = {
    report: function (errors) {
        console.log(errors.length ? 'Errors found' : 'No errors');
    }
};

// Old usage, deprecated as of 1.2.0:
module.exports = function (errors) {
    console.log(errors.length ? 'Errors found' : 'No errors');
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

It's then up to the reporter to do something with the errors. No `return`s or anything is needed. `lesshint` will handle everything like exit codes etc.

Take a look at the [default reporter](https://github.com/lesshint/lesshint/blob/master/lib/reporters/stylish.js) for more information.
