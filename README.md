# lesshint
[![npm](https://img.shields.io/npm/v/lesshint.svg)](https://www.npmjs.com/package/lesshint)
[![Build Status](https://travis-ci.org/lesshint/lesshint.svg?branch=master)](https://travis-ci.org/lesshint/lesshint)
[![Build status](https://ci.appveyor.com/api/projects/status/d1u4477uxtv6dygk/branch/master?svg=true)](https://ci.appveyor.com/project/lesshint/lesshint/branch/master)
[![Coverage Status](https://coveralls.io/repos/lesshint/lesshint/badge.svg?branch=master)](https://coveralls.io/r/lesshint/lesshint?branch=master)

`lesshint` is a tool to aid you in writing clean and consistent [Less](http://lesscss.org/).

* [Installation](#installation)
* [Configuration](#configuration)
* [CLI usage](#cli-usage)
* [Reporters](#reporters)

## Installation
_[Node.js](https://nodejs.org/) 0.12 (or later) or [io.js](https://iojs.org/) 1.0 (or later)._

Run the following command from the command line (add `-g` to install globally):

```
npm install lesshint
```

## Configuration
`lesshint` is customizable and we highly recommend you to look at the [available linter options](/lib/linters/README.md) to tailor it to your needs.

Start by creating a `.lesshintrc` file in your project root and add your settings to it. It will be automatically loaded and merged with the default values. If no `.lesshintrc` file is found in the current working directory, it'll traverse up the directory structure looking for one, stopping once it finds one or reaches the root directory.

In the `.lesshintrc` file, each option is specified by its own JSON object, for example:

```js
{
    "fileExtensions": [".less", ".css"],

    "excludedFiles": ["vendor.less"],

    "spaceAfterPropertyColon": {
        "enabled": true,
        "style": "one_space" // Comments are allowed
    },

    "emptyRule": true, // If there's no options for a rule, you can simply enable it by setting it to true

    "importantRule": false // To disable a rule completely, set it to false
}
```

For more information on available options and inline configuration, see the [user guide](/docs/user-guide/config.md).

## CLI usage
Run `lesshint` from the command-line by passing one or more files/directories to recursively scan.

```
lesshint src/less/ lib/style.less
```

Available Flags         | Description
----------------------|---------------------
`-c`/`--config`       | Specify the configuration file to use (will be merged with defaults).
`-e`/`--exclude`      | A [minimatch glob pattern](https://github.com/isaacs/minimatch) or a file to exclude from being linted.
`-l`/`--linters`      | Paths to custom linters to add to the built-in list.
`-r`/`--reporter`     | The reporter to use. See "Reporters" below for possible values.
`-V`/`--version`      | Show the version.
`-x`/`--max-warnings` | Number of warnings to allow before exiting with a non-zero code. Passing `-1` will allow any number of warnings to pass.

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
Reporters are small modules that can be used to perform actions with the lint results, for example printing something to the terminal or generate custom reports.

For more information on using reporters, see the [user guide](/docs/user-guide/reporters.md).

If you're interested in developing reporters, please refer to the [developer guide](/docs/developer-guide/reporters.md).
