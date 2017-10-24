# Developing linters
If you wish to create your own linter or work on one of the core ones, this is the place for you!

First of all, in order to work properly, all linters are required to expose a few things.
* `name` - The name of the linter. While we don't enforce namespaces, we recommend it when creating custom linters, to prevent naming collisions. The name should only contain `a-z 0-9 _ - /`.
* `nodeTypes` - An array of [PostCSS node types](http://api.postcss.org/postcss.html) that the linter wants to check.
* `lint` - The main lint method which will be called with the following arguments.
    * `config` - The config object for this linter.
    * `node` - The current node to lint.

If the linter doesn't find any errors or doesn't need/want to check the passed node for some reason it should return `undefined`. The linter doesn't need to check whether is's enabled or not, this will be checked beforehand by `lesshint`. If it's disabled, it'll never be called.

If the linter finds something it should return an array of result objects which looks like this:

```js
{
    column: 5,
    file: 'file.less',
    fullPath: '/path/to/file.less',
    line: 1,
    linter: 'spaceBeforeBrace',
    message: 'Opening curly brace should be preceded by one space.',
    position: 4,
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
        const results = [];

        if (true) { // Nothing to lint, return early
            return;
        }

        // Check some things...

        // Return the results
        return results;
    }
```

When working with linters, we highly recommend the following resources which are all included with `lesshint`.
* [postcss](http://api.postcss.org/postcss.html) - Main PostCSS docs.
* [postcss-less](https://github.com/webschik/postcss-less) - PostCSS Less plugin docs.
* [postcss-selector-parser](https://github.com/postcss/postcss-selector-parser) - PostCSS plugin for working with selectors.
* [postcss-values-parser](https://github.com/lesshint/postcss-values-parser) - PostCSS plugin for working with values.
