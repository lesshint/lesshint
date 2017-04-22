# Lesshint class

The `Lesshint` class is the core of `lesshint`, from here all operations can be performed. To use it, start by initalizing a `lesshint` instance.

```js
const Lesshint = require('lesshint').Lesshint;

const lesshint = new Lesshint();

lesshint.configure();

// Do your thing using the methods below
```

## `Lesshint.checkDirectory(checkPath)`
**Deprecated. Use Lesshint.checkFiles() instead.**

Check a directory recursively. Will respect `fileExtensions` and `excludedFiles` options.

A `Promise` will be returned.

```js
const result = lesshint.checkDirectory('/path/to/my/directory');

result.then((results) => {

});
```

## `Lesshint.checkFile(checkPath)`
**Deprecated. Use Lesshint.checkFiles() instead.**

Check a single file asynchronously. Will not check `fileExtensions` and `excludedFiles` options.

A `Promise` will be returned.

```js
const result = lesshint.checkFile('/path/to/my/file.less');

result.then((results) => {

});
```

## `Lesshint.checkFiles(patterns)`
Check a string or an array of glob patterns asynchronously. Will respect `fileExtensions` and `excludedFiles` options.

A `Promise` will be returned.

```js
const result = lesshint.checkFiles('/path/**/*.less');

result.then((results) => {

});
```

## `Lesshint.checkPath(checkPath)`
**Deprecated. Use Lesshint.checkFiles() instead.**

Check a path asynchronously. If a file is passed it will check that, if a directory is passed it will check that recursively. Will respect `fileExtensions` and `excludedFiles` options.

A `Promise` will be returned.

```js
const result = lesshint.checkPath('/path/to/my/directory');

result.then((results) => {

});
```

## `Lesshint.checkString(input, checkPath)`
Check a Less string synchronously and return an array of linter results.

The `checkPath` argument can be used to include a file name in lint results.

If a error occurs which isn't a Less parse error, an exception will be thrown.

```js
try {
    const results = lesshint.checkString('<my less code>', '/path/to/file');
} catch (e) {
    console.error('Something bad happened.');
}
```

## `Lesshint.configure(config)`
Setup the options to use. This method must always be called before doing anything else, otherwise no options will be specified. Not even defaults.

The `config` argument is optional, but if a object is passed it'll be merged with the defaults.

The merged, final, config object will be returned.

```js
const config = {
    emptyRule: false
};

lesshint.configure(config);
```

## `Lesshint.getConfig(path)`
Load a config file using `lesshint`'s logic.

If `path` is a file, it'll be loaded and its contents returned. If `path` is a directory, it will start looking for a `.lesshintrc` file in that directory, traversing up the directory structure until it finds one. If no config file is found, `undefined` will be returned.

```js
const config = lesshint.getConfig('/path/to/my/config.json');
```


## `Lesshint.getReporter(reporter)`
Load a reporter using `lesshint`'s logic.

The `reporter` argument can be one of the following.
* The name of a module. The normal Node.js loading rules for global/local modules apply.
* Path to a reporter. Relative paths will be resolved against [`process.cwd()`](https://nodejs.org/api/process.html#process_process_cwd).
* A already initialized reporter object which will just be returned again.

If nothing is passed, the default reporter will be returned. If the reporter loading fails for some reason, `false` will be returned.

```js
const reporter = lesshint.getReporter('/path/to/my/reporter.js');
```
