# Utils

There are a couple of utilities included with `lesshint` which can be used when creating custom linters.

```js
const utils = require('lesshint').utils;
```

## `isAbsoluteURL(str)`
Check if a string is a absolute URL.

```js
utils.isAbsoluteURL('http://example.com'); // true
utils.isAbsoluteURL('file.less'); // false
```

## `isVariable(str)`
Check if a value is a Less variable.

```js
utils.isVariable('@foo'); // true
utils.isVariable('blue'); // false
```

## `hasNewline(str)`
Check if a value contains new line characters.

```js
utils.hasNewline('\n'); // true
utils.hasNewline('\r\n'); // true
utils.hasNewline('\t'); // false
utils.hasNewline('foo'); // false
```

## `hasQuotes(str, style)`
Check if a string is enclosed in quotes.

`style` values | Description
-------------- | -----------
`any`          | Check for any kind of quotes (**default**).
`double`       | Check for double quotes.
`single`       | Check for single quotes.

```js
utils.hasQuotes'"foo"', 'any'); // true
utils.hasQuotes('foo', 'any'); // false

utils.hasQuotes('"foo"', 'double'); // true
utils.hasQuotes("'foo'", 'double'); // false

utils.hasQuotes("'foo'", 'single'); // true
utils.hasQuotes('"foo"', 'single'); // false
```

## `nodeToString(node)`
Stringify a Node using the [`postcss-less`](https://github.com/shellscape/postcss-less/) stringifier.

```js
const nodeString = nodeToString(node); // Stringified node
```

## `parseSelector(selector)`
Parse a selector using [`postcss-selector-parser`](https://github.com/postcss/postcss-selector-parser). Accepts a selector string or a PostCSS `Rule` node.

```js
utils.parseSelector('.foo'); // Parser tree
utils.parseSelector(ruleNode); // Parser tree
```

## `parseValue(value, options)`
Parse a value using [`postcss-values-parser`](https://github.com/lesshint/postcss-values-parser).

`options` is any valid `postcss-values-parser` options. The default values are:

```js
{
    loose: true
}
```

```js
utils.parseValue('10px', {
    loose: false
}); // Parser tree
```
