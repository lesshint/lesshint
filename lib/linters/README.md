# Available linters

* [attributeQuotes](#attributequotes)
* [borderZero](#borderzero)
* [colorVariables](#colorvariables)
* [comment](#comment)
* [decimalZero](#decimalzero)
* [depthLevel](#depthlevel)
* [duplicateProperty](#duplicateproperty)
* [emptyRule](#emptyrule)
* [finalNewline](#finalnewline)
* [hexLength](#hexlength)
* [hexNotation](#hexnotation)
* [hexValidation](#hexvalidation)
* [idSelector](#idselector)
* [importantRule](#importantrule)
* [importPath](#importpath)
* [maxCharPerLine](#maxcharperline)
* [newlineAfterBlock](#newlineafterblock)
* [propertyOrdering](#propertyordering)
* [propertyUnits](#propertyunits)
* [qualifyingElement](#qualifyingelement)
* [selectorNaming](#selectornaming)
* [singleLinePerProperty](#singlelineperproperty)
* [singleLinePerSelector](#singlelineperselector)
* [spaceAfterPropertyColon](#spaceafterpropertycolon)
* [spaceAfterPropertyName](#spaceafterpropertyname)
* [spaceAfterPropertyValue](#spaceafterpropertyvalue)
* [spaceAroundBang](#spacearoundbang)
* [spaceAroundComma](#spacearoundcomma)
* [spaceAroundOperator](#spacearoundoperator)
* [spaceBeforeBrace](#spacebeforebrace)
* [spaceBetweenParens](#spacebetweenparens)
* [stringQuotes](#stringquotes)
* [trailingSemicolon](#trailingsemicolon)
* [trailingWhitespace](#trailingwhitespace)
* [universalSelector](#universalselector)
* [urlFormat](#urlformat)
* [urlQuotes](#urlquotes)
* [variableValue](#variablevalue)
* [zeroUnit](#zerounit)

In addition to the linter specific options outlined below, each linter also accepts these options:

Option     | Default value | Description
-----------|---------------|----------------
`enabled`  | `true`        | Turn the linter on/off completely. It's also possible to disable a linter by setting the whole property to `false`.
`severity` | `"warning"`   | Set the severity level for a linter, possible values are `"warning"` and `"error"`. This will affect CLI exit codes and will be reported together with other lint results (since `1.3.0`).

***

## attributeQuotes
All values in attribute selectors should be enclosed in quotes.
Since some values require quotes it's better for consistency to always quote the values.

### invalid
```less
input[type=text] {
    color: red;
}
```

### valid
```less
input[type='text'] {
    color: red;
}

input[type="text"] {
    color: red;
}
```

## borderZero
Prefer `0` over `none` in border declarations.

Option     | Description
---------- | ----------
`style`    | `none`, `zero` (**default**)

### none
```less
.foo {
    border: none;
}
```

### zero
```less
.foo {
    border: 0;
}
```

## colorVariables
Disallow hexidecimal colors when not used as a variable assignment.

### invalid
```less
border: 1px solid #000;
```

### valid
```less
@black: #000;

...

border: 1px solid @black;
```

## Comment
Prefer single-line comments (`//`) over multi-line (`/* ... */`) since they're not rendered in the final CSS.
This linter is disabled by default.

Option     | Description
---------- | ----------
`allowed`  | A regexp to match allowed comments. The default is `^!` allowing comments starting with a bang, i.e. `/*! Copyright... */`.

### invalid
```less
/* Will get rendered */
```

### valid
```less
// Won't get rendered

/*! Will get rendered, but it's OK */
```

## decimalZero
Floating point numbers should be written with a leading/trailing zero.

Option     | Description
---------- | -------------
`leading`  | Floating point numbers must be written with a leading zero (**default**).
`trailing` | Floating point numbers must be written with a trailing zero.
`both`     | Floating point numbers must be written with a leading and trailing zero.
`none`     | Floating point numbers must not be written with a leading or trailing zero.

### invalid
```less
.foo {
  font-size: .5em;  // leading, both
  font-size: 1em;   // trailing, both
  font-size: 1.0em; // none
}
```

### valid
```less
.foo {
  font-size: 0.5em; // leading, both
  font-size: 1.0em; // trailing, both
  font-size: .5em;  // none
}
```
## depthLevel
Sets the depth of nested styles in every parent style.

Option     | Description
---------- | -------------
`depth`    | From 1-'n' levels of Depth, 3 (**default**).

### invalid (depth 3)
```less
.foo {
    margin-right: 0;
    .foo-2 {
        color: red;
        .foo-3 {
            width: 100%;
            .foo-4 {
                height: 100%;
            }
        }
    }
}
```

### valid
```less
.foo {
    margin-right: 0;
    .foo-2 {
        color: red;
        .foo-3 {
            width: 100%;
        }
    }
}
```

## duplicateProperty
There shouldn't be any duplicate properties since this is usually an error, causing unexpected bugs.

However, sometimes, there might be valid reasons such as a fallback for older browsers.
In those cases, it's best to set the `exclude` option to stop `lesshint` from reporting those properties.

Option     | Description
---------- | ----------
`exclude`  | Array of properties to exclude, for example `background-color` when used with a fallback.

### invalid
```less
.foo {
    color: red;
    color: blue;
}
```

### valid
```less
.foo {
    color: red;
}
```

## emptyRule
There shouldn't be any empty rules present.

### invalid
```less
.foo {

}
```

### valid
```less
.foo {
    color: red;
}
```

## finalNewline
All files should end with a empty line to help create better diffs since the last line will always be untouched and therefore not marked as changed.

### invalid
```less
.foo {
    color: red;
}
```

### valid
```less
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
```less
.foo {
    color: #000000;
}
```

### short
```less
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
```less
.foo {
    color: #abcdef;
}
```

### uppercase
```less
.foo {
    color: #ABCDEF;
}
```

## hexValidation
Check if hex color declarations are valid.

### invalid
```less
.foo {
    color: #ab;
}
```

### valid
```less
.foo {
    color: #abc;
}
```

## idSelector
Disallow the usage of ID selectors.
ID selectors should be avoided since they introduce unnecessarily specific selectors which can't be easily overridden.

Option     | Description
---------- | ----------
`exclude`  | Array of IDs to exclude (with or without `#`).

### invalid
```less
#foo {
    color: red;
}
```

### valid
```less
.foo {
    color: red;
}
```

## importantRule
Disallow the usage of `!important`.
The use of `!important` is often due to a lack of understanding of CSS specificity.

### invalid
```less
.foo {
    color: red !important;
}
```

### valid
```less
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
```less
@import 'foo.less';
@import '_bar';
```

### valid
```less
@import 'foo';
@import 'bar';
```

## maxCharPerLine
Lines shouldn't exceed the defined length.

Option    | Description
--------- | ----------
`limit`  | `100`

### invalid
```less
.foo {
    color: red; // A really long comment that's more than 100 chars...
}
```

### valid
```less
.foo {
    color: red; // A short comment that's less than 100 chars
}
```

## newlineAfterBlock
All blocks should be followed by a new line.

### invalid
```less
.foo {
    color: red;
}
.bar {
    color: blue;
}
```

### valid
```less
.foo {
    color: red;
}

.bar {
    color: blue;
}
```

## propertyOrdering
Make sure properties are sorted in a particular order.

Option       | Description
------------ | ----------
`style`       | `alpha` (**default**)

### invalid
```less
.foo {
    color: red;
    border: 0;
}
```

### valid
```less
.foo {
    border: 0;
    color: red;
}
```

## propertyUnits
Specify which units are allowed for property values.

By default all properties can have any value.
The `global` option can be used to specify global units that are allowed
and the `properties` option can be used to fine tune units for each property.

_Note: Shorthands are not supported by the `properties` option. For example, to specify units for `margin`, all margin-* properties must be specified._

Option        | Description
------------- | ----------
`valid`       | Allowed units (by default all units are allowed)
`invalid`     | Units not allowed under any circumstances. Overrides all other options.
`properties`  | Object with property names and allowed units (empty by default)

```js
"propertyUnits": {
    "valid": ["rem", "vw"], // These units are allowed for all properties
    "invalid": ["pt"],      // The 'pt' unit is not allowed under any circumstances
    "properties": {
        "line-height": []   // No units are allowed for line-height
    }
}
```

```less
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
```less
div[foo='bar'] {
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
```less
[foo='bar'] {
    color: red;
}

.foo {
    color: red;
}

#foo {
    color: red;
}
```

## selectorNaming

Option               | Description
-------------------- | ----------
`disallowUppercase`  | `true` (**default**), `boolean`
`disallowUnderscore` | `true` (**default**), `boolean`
`disallowDash`       | `false` (**default**), `boolean`
`exclude`            | `string array`


```js
var options = {
    disallowUppercase: true,
    disallowUnderscore: true,
    exclude: ['fooExcluded']
}
```

### valid

```less
.foo-bar {

}

.fooExcluded {

}

```

### invalid

```less
.fooBar {

}

.foo_bar {

}
```

Currently this option lets you approximate some naming conventions.
Keep in mind that it's not foolproof.

Style              | example            | options to enable
------------------ | ------------------ | -----------------
train case         | .btn-primary       | `disallowUppercase`, `disallowUnderscore`
snake case         | .btn_primary       | `disallowUppercase`, `disallowDash`
camel case         | .btnPrimary        | `disallowUnderscore`, `disallowDash`


## singleLinePerProperty
Each property should be on its own line.

Option                  | Description
----------------------- | ------------
`allowSingleLineRules`  | `false` (**default**), `true`

### invalid
```less
.foo {
    color: red; margin-right: 10px;
}

.bar { color: red; }
```

### valid
```less
.foo {
    color: red;
    margin-right: 10px;
}

.bar {
    color: red;
}
```

### valid with `allowSingleLineRules: true`
```less
.bar {
    color: red;
}

.bar { color: red; }
```

## singleLinePerSelector
Each selector should be on its own line.

Option     | Description
---------- | ----------
`style`    | `18f`, `none` (**default**)

The `18f` option refers to the [18F Style Guide](https://pages.18f.gov/frontend/css-coding-styleguide/format/).

### invalid
```less
.foo, .bar {
    color: red;
}

// Style "18f"
.foobar, .baz {
    color: red;
}
```

### valid
```less
.foo,
.bar {
    color: red;
}

// Style "18f"
.foo, .bar {
    color: red;
}
```

## spaceAfterPropertyColon
Each colon in property declarations should be followed by a space to aid readability.

Option     | Description
---------- | ----------
`style`    | `no_space`, `one_space` (**default**), `at_least_one_space`

### no_space
```less
.foo {
    margin:0;
}
```

### one_space
```less
.foo {
    margin: 0;
}
```

### at_least_one_space
This is useful when values should be aligned. For example:

```less
.foo {
    height: 20px;
    width:  20px;
}
```

## spaceAfterPropertyName
The colon in property declarations shouldn't be preceded by any space.

Option     | Description
---------- | ----------
`style`    | `no_space` (**default**), `one_space`

### no_space
```less
.foo {
    margin: 0;
}
```

### one_space
```less
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
```less
.foo {
    margin: 0;
}
```

### one_space
```less
.foo {
    margin: 0 ;
}
```

## spaceAroundBang
Defines how the exclamation mark (bang) in `!important` etc. should be formatted by a space to aid readability.

Option  | Description
--------| ------------
`style` | `after`, `before` (**default**), `both`, `none`

### after
```less
.foo {
    color: red! important;
}
```

### before
```less
.foo {
    color: red !important;
}
```

### both
```less
.foo {
    color: red ! important;
}
```

### none
```less
.foo {
    color: red!important;
}
```

## spaceAroundComma
Defines how commas in functions, mixins, etc. should be formatted by a space to aid readability.

Option          | Description
----------------| ----------
`allowNewline`  | `false` (**default**), `boolean`
`style`         | `after` (**default**), `before`, `both`, `none`

### after
```less
.foo {
    color: rgb(255, 255, 255);
}
```

### before
```less
.foo {
    color: rgb(255 ,255 ,255);
}
```

### both
```less
.foo {
    color: rgb(255 , 255 , 255);
}
```

### none
```less
.foo {
    color: rgb(255,255,255);
}
```

### allowNewline : true
```less
.foo {
  font:
    14px,
    Roboto,
    #000;
}
```

## spaceAroundOperator
Defines how operators (`+`, `-`, `*`, `/`, and `=`) should be formatted by a space to aid readability.

Option     | Description
---------- | ----------
`style`    | `both` (**default**), `none`

### both
```less
.foo {
    height: calc(10px + 10px);
}
```

### none
```less
.foo {
    height: calc(10px+10px);
}
```

## spaceBeforeBrace
A space should be present before opening braces to aid readability.

Option     | Description
---------- | ----------
`style`    | `no_space`, `one_space` (**default**), `new_line`

### no_space
```less
.foo{
    color: red;
}
```

### one_space
```less
.foo {
    color: red;
}
```

### new_line
```less
.foo
{
    color: red;
}
```

## spaceBetweenParens
There shouldn't be any space before or after parentheses.

Option     | Description
---------- | ----------
`style`    | `no_space` (**default**), `one_space`

### no_space
```less
.foo {
    color: rgb(255, 255, 255);
}
```

### one_space
```less
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
```less
.foo {
    content: "Hello world";
}
```

### valid
```less
.foo {
    content: 'Hello world';
}
```

## trailingSemicolon
All property declarations should end with a semicolon.
Semicolons are optional after the last property in a ruleset but it's a good habit to always add them since one doesn't need to think about it when adding new properties afterwards.

### invalid
```less
.foo {
    color: red
}
```

### valid
```less
.foo {
    color: red;
}
```

## trailingWhitespace
There shouldn't be any trailing whitespace since this will mess up diffs etc.

## urlFormat
All URLs should be relative.
Using relative URLs increases portability and is recommended by the [CSS spec](http://dev.w3.org/csswg/css-values/#relative-urls).

Option     | Description
---------- | ----------
`style`    | `absolute`, `relative` (**default**)

### invalid
```less
.foo {
    background-image: url('http://example.com/img/image.jpg');
}
```

### valid
```less
.foo {
    background-image: url('img/image.jpg');
}
```

## universalSelector
Disallow the usage of the universal selector anywhere in a selector expression.
The universal selector shouldn't be used since it'll cancel out any inheritance.

### invalid
```less
* {
    color: red;
}

.foo * {
    color: red;
}
```

### valid
```less
.foo {
    color: red;
}

.foo .bar {
    color: red;
}
```

## urlQuotes
All URLs should be enclosed in quotes.
Using quotes around URLs allows them to be treated as strings, making escaping of characters easier.
The [CSS spec](http://dev.w3.org/csswg/css-values/#url-value) also recommends the use of quotes.

### invalid
```less
.foo {
    background-image: url(img/image.jpg);
}
```

### valid
```less
.foo {
    background-image: url('img/image.jpg');
}
```

## variableValue
Force variable or non variable value in property.

Option     | Description
--------------- | ----------
`always`        | Array of property names
`never`         | Array of property names
`allowedValues` | Array of allowed non variables values

### always ['color'] valid
```less
.foo {
    color: @success;
}
```

### always ['color'] allowedValues ['none'] valid
```less
.foo {
    color: none;
}
```

### always ['color'] invalid
```less
.foo {
    color: #333;
}
```

### never ['color'] valid
```less
.foo {
    color: #333;
}
```

### never ['color'] invalid
```less
.foo {
    color: @success;
}
```

## zeroUnit
Zero values should include a unit for consistency with other values.

Option      | Description
------------| ----------
`style`     | `no_unit`, `keep_unit` (**default**)
`units`     | `string array` additional units to enforce.
`exclude`   | `string array` additional properties to exclude.

### no_unit
```less
.foo {
    margin-right: 0;
}
```

### keep_unit
```less
.foo {
    margin-right: 0px;
}
```

*Note: This rule doesn't apply to [angles](https://developer.mozilla.org/en-US/docs/Web/CSS/angle) or [time units](https://developer.mozilla.org/en-US/docs/Web/CSS/time) since they always require a unit.*

Most of these rules are based on [@mdo](https://twitter.com/mdo)'s [code guide](http://codeguide.co/#css).
