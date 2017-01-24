# Runner class

Start by initializing a `runner` instance.

```js
const Runner = require('lesshint').Runner;

// Any CLI option is valid
const options = {
    maxWarnings: 10, // Dashes in CLI flags are converted to camel case
    paths: ['file.less'] // An array of path(s) to check
};

const runner = new Runner(options);

const result = runner.run();
```

## `Runner.constructor()`
Set the options for a `Runner` instance.

```js
const runner = new Runner(options);
```

## `Runner.run()`
Run `lesshint` as if used through the CLI. All rule checks will be performed and reporters called.

A `Promise` will be returned. On failure, it'll be a `Runner` error object with a `status` property corresponding to a [CLI exit status code](/README.md#exit-status-codes).

```js
const result = runner.run();

result.then((output) => {

});
```
