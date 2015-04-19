# lesshint

[![Build Status](https://travis-ci.org/jwilsson/lesshint.svg?branch=master)](https://travis-ci.org/jwilsson/lesshint)
[![Windows CI](https://ci.appveyor.com/api/projects/status/github/jwilsson/lesshint?svg=true)](https://ci.appveyor.com/project/jwilsson/lesshint/branch/master)
[![Dependency Status](https://david-dm.org/jwilsson/lesshint.svg?theme=shields.io&style=flat)](https://david-dm.org/jwilsson/lesshint)
[![devDependency Status](https://david-dm.org/jwilsson/lesshint/dev-status.svg?theme=shields.io&style=flat)](https://david-dm.org/jwilsson/lesshint#info=devDependencies)

`lesshint` is a tool to aid you in writing clean and consistent [Less](http://lesscss.org/).

* [Requirements](#requirements)
* [Installation](#installation)
* [Configuration](#configuration)

## Important information
This is the final project for a associate degree, because of this pull requests cannot be accepted until mid-June 2015.

However, I ([jwilsson](https://github.com/jwilsson)) will need your help to decide which options that should be available for each linter
and which option that should be the default value. For each linter that I add, I'll open a corresponding issue where a discussion/vote will 
take place for which options that should be included and which one should be the default. Therefore, I highly recommend users of this tool
to not trust the defaults until a `1.0` release since some default values will change. In short, be extremely specific about which options
you specify, don't trust the defaults just yet.

Please feel free to submit bug reports and other forms of feedback. That's greatly appreciated!

## Requirements
* [Node.js](https://nodejs.org/) 0.10 or later
* [io.js](https://iojs.org/) 1.0 or later

## Installation
Run the following command from the command line (add -g to install globally):

```
npm install lesshint
```

## Configuration
`lesshint` is customizable and we highly recommend you to look at the [available options](lib/linters/README.md) to tailor it to your needs.

Each option is specifed by it's own JSON object, for example:

```js
"spaceAfterPropertyColon": {
    "enabled": true,
    "style": "one_space" // Comments are allowed
}
```

Create a `.lesshintrc` file in your project root and add your settings to it. It will be automatically loaded and merged with the default values.

If you're running `lesshint` from the command line, the `-c` or `--config` flags can be used to load any valid configuration file.
