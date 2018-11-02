# lesshint
[![npm](https://img.shields.io/npm/v/lesshint.svg)](https://www.npmjs.com/package/lesshint)
[![Build Status](https://travis-ci.org/lesshint/lesshint.svg?branch=master)](https://travis-ci.org/lesshint/lesshint)
[![Build status](https://ci.appveyor.com/api/projects/status/d1u4477uxtv6dygk/branch/master?svg=true)](https://ci.appveyor.com/project/lesshint/lesshint/branch/master)
[![Coverage Status](https://coveralls.io/repos/lesshint/lesshint/badge.svg?branch=master)](https://coveralls.io/r/lesshint/lesshint?branch=master)

`lesshint` is a tool to aid you in writing clean and consistent [Less](http://lesscss.org/).

* [Installation](#installation)
* [Configuration](#configuration)
* [Rules](/lib/linters/README.md)
* [CLI usage](#cli-usage)
* [Complementary tools](#complementary-tools)
* [Linters](#linters)
* [Reporters](#reporters)
* [Developer resources](#developer-resources)

## Installation
_[Node.js](https://nodejs.org/) 6 (or later) is required._

Run the following from the command line to install `lesshint` (add `-g` to install globally):

```
npm install lesshint
```

## Configuration
For information on how to configure `lesshint` and other available options, see the [user guide](/docs/user-guide/configuration.md).

Since `lesshint` is highly customizable we recommend you to also take a look at the [available rule options](/lib/linters/README.md) to tailor it to your needs.

## CLI usage
Run `lesshint` from the command-line by passing one or more files/directories to recursively scan. Quote the glob patterns for optimal cross-platform results.

```
lesshint "src/less/" "lib/style.less"
```

Available Flags         | Description
----------------------|---------------------
`-c`/`--config`       | Specify the configuration file to use (will be merged with defaults).
`-e`/`--exclude`      | A [globby glob pattern](https://www.npmjs.com/package/globby) or a file to exclude from being linted.
`-l`/`--linters`      | Paths to custom linters to add to the built-in list. See "Linters" below for more information.
`-r`/`--reporter`     | The reporter to use. See "Reporters" below for more information.
`-V`/`--version`      | Show the version.
`-x`/`--max-warnings` | Number of warnings to allow before exiting with a non-zero code. Omit it to always exit with zero code.

### Exit status codes
Depending on the linter results and options supplied, the exit status code returned by the CLI will differ.

Exit status code   | Description
-------------------|----------------------------------------------
`0`                | Everything is alright or only linting errors with a severity of `warning` were found.
`1`                | One or more linting errors with a severity of `error` were found. Or when `--max-warnings` flag is set and the number of linting errors with a severity of `warning` found is greater than the given value.
`66`               | No files to lint were supplied.
`70`               | An unknown error occurred within `lesshint`, possibly a bug. [Please file an issue!](https://github.com/lesshint/lesshint/issues/new)
`78`               | Something is wrong with the config file, most likely invalid JSON.

These codes were chosen with regards to the [preferable exit codes](http://www.gsp.com/cgi-bin/man.cgi?section=3&topic=sysexits).

## Complementary tools
* [AtomLinter plugin](https://atom.io/packages/linter-lesshint) - A Linter plugin for [Atom](https://atom.io/).
* [autolesshint](https://www.npmjs.com/package/autolesshint) - Automagically fix errors reported by `lesshint`.
* [Gulp plugin](https://www.npmjs.com/package/gulp-lesshint) - A gulp plugin for `lesshint`.
* [Grunt plugin](https://www.npmjs.com/package/grunt-lesshint) - A Grunt plugin for `lesshint`.
* [vscode-lesshint](https://github.com/tohjustin/vscode-lesshint) - A VS Code extension for `lesshint`.

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
