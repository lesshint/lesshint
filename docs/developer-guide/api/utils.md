# Utils

There are a copule of utilities included with `lesshint` which can be used when creating custom linters.

```js
const utils = require('lesshint').utils;
```

## `isAbsoluteURL`
Check if a string is a absolute URL.

```js
utils.isAbsoluteURL('http://example.com'); // true
utils.isAbsoluteURL('file.less'); // false
```

## `isVariable()`
Check if a value is a Less variable.

```js
utils.isVariable('@foo'); // true
utils.isVariable('blue'); // false
```

## `parseSelector`
Parse a selector using [`postcss-selector-parser`](https://github.com/postcss/postcss-selector-parser).

```js
utils.parseSelector('.foo'); // Parser tree
```

## `parseValue`
Parse a value using [`postcss-values-parser`](https://github.com/lesshint/postcss-values-parser).

```js
utils.parseValue('10px'); // Parser tree
```
