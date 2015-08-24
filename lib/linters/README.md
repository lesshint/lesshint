# Available linters

*Warning: Before we hit 1.0 don't trust the default values, they are subject to change after votes by the community. Always specify exactly what you want to report.*

Each linter also accept a `enabled` option to turn if off/on completely. Another way of disabling a linter is by setting the whole property to `false`.

* [attributeQuotes](#attributequotes)
* [borderZero](#borderzero)
* [comment](#comment)
* [duplicateProperty](#duplicateproperty)
* [emptyRule](#emptyrule)
* [finalNewline](#finalnewline)
* [hexLength](#hexlength)
* [hexNotation](#hexnotation)
* [hexValidation](#hexvalidation)
* [idSelector](#idselector)
* [importPath](#importpath)
* [importantRule](#importantrule)
* [leadingZero](#leadingzero)
* [propertyOrdering](#propertyordering)
* [propertyUnits](#propertyunits)
* [qualifyingElement](#qualifyingelement)
* [singleLinePerProperty](#singlelineperproperty)
* [singleLinePerSelector](#singlelineperselector)
* [spaceAfterComma](#spaceaftercomma)
* [spaceAfterPropertyColon](#spaceafterpropertycolon)
* [spaceAfterPropertyName](#spaceafterpropertyname)
* [spaceAfterPropertyValue](#spaceafterpropertyvalue)
* [spaceBeforeBrace](#spacebeforebrace)
* [spaceBeforeComma](#spacebeforecomma)
* [spaceBetweenParens](#spacebetweenparens)
* [stringQuotes](#stringquotes)
* [trailingSemicolon](#trailingsemicolon)
* [trailingWhitespace](#trailingwhitespace)
* [trailingZero](#trailingzero)
* [urlFormat](#urlformat)
* [urlQuotes](#urlquotes)
* [zeroUnit](#zerounit)

## attributeQuotes
All values in attribute selectors should be enclosed in quotes.
Since some values require quotes it's better for consistency to always quote the values.

Option     | Description
---------- | ----------
`style`    | `double`, `single` (**default**)

### invalid
```css
input[type="text"] {
    color: red;
}

input[type=text] {
    color: red;
}
```

### valid
```css
input[type='text'] {
    color: red;
}
```

## borderZero
Prefer `0` over `none` in border declarations.

Option     | Description
---------- | ----------
`style`    | `none`, `zero` (**default**)

### none
```css
.foo {
    border: none;
}
```

### zero
```css
.foo {
    border: 0;
}
```

## Comment
Prefer single-line comments (`//`) over multi-line (`/* ... */`) since they're not rendered in the final CSS.

Option     | Description
---------- | ----------
`allowed`  | A regexp to match allowed comments. The default is `^!` allowing comments starting with a bang, i.e. `/*! Copyright... */`.

### invalid
```css
/* Will get rendered */
```

### valid
```css
// Won't get rendered

/*! Will get rendered, but it's OK */
```

## duplicateProperty
There shouldn't be any duplicate properties since this is usually an error, causing unexpected bugs.

However, sometimes, there might be valid reasons such as a fallback for older browsers.
In those cases, it's best to set the `exclude` option to stop `lesshint` from reporting those properties.

Option     | Description
---------- | ----------
`exclude`  | Array of properties to exclude, for example `background-color` when used with a fallback.

### invalid
```css
.foo {
    color: red;
    color: blue;
}
```

### valid
```css
.foo {
    color: red;
}
```

## emptyRule
There shouldn't be any empty rules present.

### invalid
```css
.foo {

}
```

### valid
```css
.foo {
    color: red;
}
```

## finalNewline
All files should end with a empty line to help create better diffs since the last line will always be untouched and therefore not marked as changed.

### invalid
```css
.foo {
    color: red;
}
```

### valid
```css
.foo {
    color: red;
}

...
```

## hexLength
Prefer longhand hex color declarations over short hand ones to be consistent with colors that can't be written using shorthand notation.

Option     | Description
---------- | ----------
`style`    | `long` (**default**), `short`

### long
```css
.foo {
    color: #000000;
}
```

### short
```css
.foo {
    color: #000;
}
```

## hexNotation
Hex color declarations should be written in lowercase to aid readability.

Option     | Description
---------- | ----------
`style`    | `lowercase` (**default**), `uppercase`

### lowercase
```css
.foo {
    color: #abcdef;
}
```

### uppercase
```css
.foo {
    color: #ABCDEF;
}
```

## hexValidation
Check if hex color declarations are valid.

### invalid
```css
.foo {
    color: #ab;
}
```

### valid
```css
.foo {
    color: #abc;
}
```

## idSelector
Disallow the usage of ID selectors.
ID selectors should be avoided since they introduce unnecessarily specific selectors which can't be easily overridden.

Option     | Description
---------- | ----------
`exclude`  | Array of IDs to exclude (with or without "#").

### invalid
```css
#foo {
    color: red;
}
```

### valid
```css
.foo {
    color: red;
}
```

## importantRule
Disallow the usage of `!important`.
The use of `!important` is often due to a lack of understanding of CSS specificity.

### invalid
```css
#foo {
    color: red !important;
}
```

### valid
```css
.foo {
    color: red;
}
```

## importPath
Imported files should not include a leading underscore or the filename extension.
The filename extension isn't required and underscores should be reserved for usage with config-files, such as `_vars.less`.

Option               | Description
-------------------- | ----------
`filenameExtension`  | `false` (**default**), `true`
`leadingUnderscore`  | `false` (**default**), `true`
`exclude`            | Array of files to exclude

### invalid
```css
@import 'foo.less';
@import '_bar';
```

### valid
```css
@import 'foo';
@import 'bar';
```

## leadingZero
Numbers should be written with a leading zero.

Option     | Description
---------- | ----------
`style`    | `exclude_zero`, `include_zero` (**default**)

### invalid
```css
#foo {
    font-size: .5em;
}
```

### valid
```css
.foo {
    font-size: 0.5em;
}
```

## propertyOrdering
Check for property ordering

Option       | Description
------------ | ----------
`type`       | Ordering type (Only alpha supported right now)


## propertyUnits
Specify which units are allowed for property values.

By default all properties can have any value.
The `global` option can be used to specify global units that are allowed
and the `properties` option can be used to fine tune units for each property.

*Note: Shorthands are not supported by the `properties` option. For example, to specify units for `margin`, all margin-* properties must be specified.*

Option       | Description
------------ | ----------
`global`     | Allowed units (by default all units are allowed)
`properties` | Object with property names and allowed units (empty by default)

```js
"propertyUnits": {
    "global": ["rem", "vw"], // These units are allowed for all properties
    "properties": {
        "line-height": [] // No units are allowed for line-height
    }
}
```

```css
.foo {
    font-size: 1.5rem; // Allowed
    line-height: 30px; // Not allowed
}
```

## qualifyingElement
Selectors should not include a qualifying element since this will just add unnecessary specificity.

Option               | Description
-------------------- | ----------
`allowWithAttribute` | `false` (**default**), `true`
`allowWithClass`     | `false` (**default**), `true`
`allowWithId`        | `false` (**default**), `true`

### invalid
```css
div[foo=bar] {
    color: red;
}

div.foo {
    color: red;
}

div#foo {
    color: red;
}
```

### valid
```css
[foo=bar] {
    color: red;
}

.foo {
    color: red;
}

#foo {
    color: red;
}
```

## singleLinePerProperty
Each property should be on it's own line.

### invalid
```css
.foo {
    color: red; margin-right: 10px;
}

.bar { color: red; }
```

### valid
```css
.foo {
    color: red;
    margin-right: 10px;
}

.bar {
    color: red;
}
```

## singleLinePerSelector
Each selector should be on it's own line.

### invalid
```css
.foo, .bar {
    color: red;
}
```

### valid
```css
.foo,
.bar {
    color: red;
}
```

## spaceAfterComma
Each comma in functions, mixins, etc. should be followed by a space to aid readability.

Option     | Description
---------- | ----------
`style`    | `no_space`, `one_space` (**default**)

### no_space
```css
.foo {
    color: rgb(255,255,255);
}
```

### one_space
```css
.foo {
    color: rgb(255, 255, 255);
}
```

## spaceAfterPropertyColon
Each colon in property declarations should be followed by a space to aid readability.

Option     | Description
---------- | ----------
`style`    | `no_space`, `one_space` (**default**)

### no_space
```css
.foo {
    margin:0;
}
```

### one_space
```css
.foo {
    margin: 0;
}
```

## spaceAfterPropertyName
The colon in property declarations shouldn't be preceded by any space.

Option     | Description
---------- | ----------
`style`    | `no_space` (**default**), `one_space`

### no_space
```css
.foo {
    margin: 0;
}
```

### one_space
```css
.foo {
    margin : 0;
}
```

## spaceAfterPropertyValue
The semicolon in property declarations shouldn't be preceded by any space.

Option     | Description
---------- | ----------
`style`    | `no_space` (**default**), `one_space`

### no_space
```css
.foo {
    margin: 0;
}
```

### one_space
```css
.foo {
    margin: 0 ;
}
```

## spaceBeforeBrace
A space should be present before opening braces to aid readability.

Option     | Description
---------- | ----------
`style`    | `no_space`, `one_space` (**default**), `new_line`

### no_space
```css
.foo{
    color: red;
}
```

### one_space
```css
.foo {
    color: red;
}
```

### new_line
```css
.foo
{
    color: red;
}
```

## spaceBeforeComma
Each comma in functions, mixins, etc. shouldn't be preceded by any space.

Option     | Description
---------- | ----------
`style`    | `no_space` (**default**), `one_space`

### no_space
```css
.foo {
    color: rgb(255, 255, 255);
}
```

### one_space
```css
.foo {
    color: rgb(255 , 255 , 255);
}
```

## spaceBetweenParens
There shouldn't be any space before or after parentheses.

Option     | Description
---------- | ----------
`style`    | `no_space` (**default**), `one_space`

### no_space
```css
.foo {
    color: rgb(255, 255, 255);
}
```

### one_space
```css
.foo {
    color: rgb( 255, 255, 255 );
}
```

## stringQuotes
All strings should use single quotes since they are often easier to type since the `Shift` key doesn't need to be pressed.

Option     | Description
---------- | ----------
`style`    | `double`, `single` (**default**)

### invalid
```css
.foo {
    content: "Hello world";
}
```

### valid
```css
.foo {
    content: 'Hello world';
}
```

## trailingSemicolon
All property declarations should end with a semicolon.
Semicolons are optional after the last property in a ruleset but it's a good habit to always add them since one doesn't need to think about it when adding new properties afterwards.

### invalid
```css
.foo {
    color: red
}
```

### valid
```css
.foo {
    color: red;
}
```

## trailingWhitespace
There should't be any trailing whitespace since this will mess up diffs etc.

## trailingZero
Numbers should be written without leading zeros since the number has the same meaning anyway and just adds unnecessary bytes to the CSS.

Option     | Description
---------- | ----------
`style`    | `exclude_zero`  (**default**), `include_zero`

### invalid
```css
#foo {
    font-size: 1.50em;
}
```

### valid
```css
.foo {
    font-size: 1.5em;
}
```

## urlFormat
All URLs should be relative.
Using relative URLs increases portability and is actually recommended by the [CSS spec](http://dev.w3.org/csswg/css-values/#relative-urls).

Option     | Description
---------- | ----------
`style`    | `absolute`, `relative` (**default**)

### invalid
```css
.foo {
    background-image: url('http://example.com/img/image.jpg');
}
```

### valid
```css
.foo {
    background-image: url('img/image.jpg');
}
```

## urlQuotes
All URLs should be enclosed in quotes.
Using quotes around URLs allows them to be treated as strings, making escaping of characters easier.
The [CSS spec](http://dev.w3.org/csswg/css-values/#url-value) also recommends the use of quotes.

### invalid
```css
.foo {
    background-image: url(img/image.jpg);
}
```

### valid
```css
.foo {
    background-image: url('img/image.jpg');
}
```

## zeroUnit
Length units should be omitted on zero values.

Option     | Description
---------- | ----------
`style`    | `no_unit` (**default**), `keep_unit`

### no_unit
```css
.foo {
    margin-right: 0;
}
```

### keep_unit
```css
.foo {
    margin-right: 0px;
}
```

*Note: This rule doesn't apply to [angles](https://developer.mozilla.org/en-US/docs/Web/CSS/angle) or [time units](https://developer.mozilla.org/en-US/docs/Web/CSS/time) since they always require a unit.*


Most of these rules are based on [@mdo](twitter.com/mdo)s [code guide](http://codeguide.co/#css).
