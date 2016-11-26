# Node API

Start by initalizing a `lesshint` instance.

```js
var Lesshint = require('lesshint');

var lesshint = new Lesshint();

lesshint.configure();

// Do your thing using the methods below
```

## `Lesshint.checkDirectory(checkPath)`
Check a directory recursively. Will respect `fileExtensions` and `excludedFiles` options.

A `Promise` will be returned. For compatibility reasons a [Vow](https://github.com/dfilatov/vow) promise will be returned with some non-standard methods. Don't rely on these methods as native `Promise`s might be used in the future.

```js
var result = lesshint.checkDirectory('/path/to/my/directory');

result.then(function (results) {

});
```

## `Lesshint.checkFile(checkPath)`
Check a single file asynchronously. Will not check `fileExtensions` and `excludedFiles` options.

A `Promise` will be returned. For compatibility reasons a [Vow](https://github.com/dfilatov/vow) promise will be returned with some non-standard methods. Don't rely on these methods as native `Promise`s might be used in the future.

```js
var result = lesshint.checkFile('/path/to/my/file.less');

result.then(function (results) {

});
```

## `Lesshint.checkPath(checkPath)`
Check a path asynchronously. If a file is passed it will check that, if a directory is passed it will check that recursively. Will respect `fileExtensions` and `excludedFiles` options.

A `Promise` will be returned. For compatibility reasons a [Vow](https://github.com/dfilatov/vow) promise will be returned with some non-standard methods. Don't rely on these methods as native `Promise`s might be used in the future.

```js
var result = lesshint.checkPath('/path/to/my/directory');

result.then(function (results) {

});
```

## `Lesshint.checkString(input, checkPath)`
Check a Less string synchronously.

The `checkPath` argument can be used to include a file name in lint results.

If a error occurs which isn't a Less parse error, an exception will be thrown.

```js
var result;

try {
    result = lesshint.checkString('<my less code>', '/path/to/file');
} catch (Exception e) {
    console.error('Something bad happened.');
}
```

## `Lesshint.configure(config)`
Setup the options to use. This method must always be called before doing anything else, otherwise no options will be specified. Not even defaults.

The `config` argument is optional, but if a object is passed it'll be merged with the defaults.

## `Lesshint.getReporter(reporter)`
Load a reporter using `lesshint`'s logic.

The `reporter` argument can be one of the following.
* The name of a module. The normal Node.js loading rules for global/local modules apply.
* Path to a reporter. Relative paths will be resolved against [`process.cwd()`](https://nodejs.org/api/process.html#process_process_cwd).
* A already initialized reporter object which will just be returned again.

If nothing is passed, the default reporter will be returned. If the reporter loading fails for some reason, `false` will be returned.

```js
var reporter = lesshint.getReporter('/path/to/my/reporter.js');
```
