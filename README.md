# lesshint

[![Build Status](https://travis-ci.org/jwilsson/lesshint.svg?branch=master)](https://travis-ci.org/jwilsson/lesshint)
[![Windows CI](https://ci.appveyor.com/api/projects/status/github/jwilsson/lesshint?svg=true)](https://ci.appveyor.com/project/jwilsson/lesshint/branch/master)
[![Coverage Status](https://coveralls.io/repos/jwilsson/lesshint/badge.svg?branch=master)](https://coveralls.io/r/jwilsson/lesshint?branch=master)
[![Dependency Status](https://david-dm.org/jwilsson/lesshint.svg?theme=shields.io&style=flat)](https://david-dm.org/jwilsson/lesshint)
[![devDependency Status](https://david-dm.org/jwilsson/lesshint/dev-status.svg?theme=shields.io&style=flat)](https://david-dm.org/jwilsson/lesshint#info=devDependencies)

`lesshint` is a tool to aid you in writing clean and consistent [Less](http://lesscss.org/).

* [Requirements](#requirements)
* [Installation](#installation)
* [Configuration](#configuration)
* [CLI usage](#cli-usage)
* [Known issues](#known-issues)

## Important information
This is the final project for a associate degree, because of this pull requests cannot be accepted until mid-June 2015.

However, I ([jwilsson](https://github.com/jwilsson)) will need your help to decide which options that should be available for each linter
and which option that should be the default value. For each linter that I add, I'll open a corresponding issue where a discussion/vote will 
take place for which options that should be included and which one should be the default. Therefore, I highly recommend users of this tool
to not trust the defaults until a `1.0` release since some default values will change. In short, be extremely specific about which options
you specify, don't trust the defaults just yet.

Please feel free to submit bug reports and other forms of feedback. That's greatly appreciated!

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

Each option is then specifed by it's own JSON object, for example:

```js
"fileExtensions": [".less", ".css"],

"excludedFiles": ["vendor.less"],

"spaceAfterPropertyColon": {
    "enabled": true,
    "style": "one_space" // Comments are allowed
}
```

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
`-V`/`--version`    | Show version.

## Known issues
We are aware of some instances where some Less features won't be properly parsed. In those cases the whole file will simply be ignored by `lesshint`.

* Using variables in `@media` directives are not supported. Related [issue](https://github.com/tonyganch/gonzales-pe/issues/17).
* Using variables in selectors are not supported. Related [issue](https://github.com/tonyganch/gonzales-pe/issues/75).
