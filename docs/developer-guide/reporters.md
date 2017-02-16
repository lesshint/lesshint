# Developing reporters
If you wish to create your own reporter or work on one of the core ones, this is the place for you!

First of all, in order to work properly, all reporters are required to expose a few things.
* `name` - The name of the reporter. While we don't enforce namespaces, we recommend it when creating custom reporters, to prevent naming collisions.
* `report` - The main report method which will be called with the following arguments.
    * `results` - An array of all linting results. See a full example below.

Example results array passed to reporters:
```js
[{
    column: 5,
    file: 'file.less',
    fullPath: '/path/to/file.less',
    line: 1,
    linter: 'spaceBeforeBrace',
    message: 'Opening curly brace should be preceded by one space.',
    position: 4,
    severity: 'warning',
    source: '.foo{'
}]
```

Now, in its simplest form, a reporter is just a function accepting some input. The most basic reporter possible:
```js
module.exports = {
    name: 'my-namespace/my-super-awesome-reporter',
    report: function (results) {
        console.log(results.length ? 'Errors found' : 'No errors');
    }
};
```

It's now up to the reporter to do something with the errors. No `return`s or anything are needed. If running from the CLI, `lesshint` will handle the setting of correct exit codes.

Take a look at the [default reporter](https://github.com/lesshint/lesshint/blob/master/lib/reporters/default.js) for more information.

## Using reporters from code
If you're writing code which utilizes `lesshint`, for example a Gulp plugin, you can use the `getReporter` method on the `lesshint` object to load a reporter using the same logic as `lesshint` does.

Pass the name of a module, a path, or a already initialized reporter object to the `getReporter` method like this:

```js
const defaultReporter = lesshint.getReporter();
const result = lesshint.checkFile('my-less-file.less');

result.then((result) => {
    defaultReporter.report(result);
});
```
