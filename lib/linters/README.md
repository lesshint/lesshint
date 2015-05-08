# Available linters

*Warning: Before we hit 1.0 don't trust the default values, they are subject to change after votes by the community. Always specify exactly what you want to report.*

Each linter also accept a `enabled` option to turn if off/on completely. Another way of disabling a linter is by setting the whole property to `false`.

* [borderZero](#borderzero)
* [duplicateProperty](#duplicateproperty)
* [emptyRule](#emptyrule)
* [finalNewline](#finalnewline)
* [hexLength](#hexlength)
* [hexNotation](#hexnotation)
* [hexValidation](#hexvalidation)
* [idSelector](#idselector)
* [importantRule](#importantrule)
* [spaceAfterPropertyColon](#spaceafterpropertycolon)
* [spaceAfterPropertyName](#spaceafterpropertyname)
* [spaceBeforeBrace](#spacebeforebrace)
* [trailingSemicolon](#trailingsemicolon)
* [urlFormat](#urlformat)
* [urlQuotes](#urlquotes)

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

## duplicateProperty
There shouldn't be any duplicate properties since this is usually an error, causing unexpected bugs.

However, sometimes, there might be valid reasons such as a fallback for older browsers. 
In these cases `lesshint` won't be able to know your intentions and will still report it,
if this is undesired the best option right now is to disable this linter altogether until we have a better solution in place.

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
Prefer longhand hex color declarations over short hand ones to be consistent with colors than can't be written using shorthand notation.

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

## importantRule
Disallow the usage of !important.
The use of !important is often due to a lack of understanding of CSS specificity.

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

## idSelector
Disallow the usage of ID selectors.
ID selectors should be avoided since they introduce unnecessarily specific selectors which can't be easily overridden.

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

## urlFormat
All URLs should be relative.
Using relative URLs increases portability and is actually recommended by the [CSS spec](http://dev.w3.org/csswg/css-values/#relative-urls).

Option     | Description
---------- | ----------
`style`    | `absolute`, `relative` (**default**)

### invalid
```css
.foo {
    background-image: url(http://example.com/img/image.jpg);
}
```

### valid
```css
.foo {
    .foo {
        background-image: url(img/image.jpg);
    }
}
```

## urlQuotes
All URLs should be enclosed in quotes.
Using quotes around URLs allows them to be treated as strings, making escaping of characters easier.
The [CSS spec](http://dev.w3.org/csswg/css-values/#url-value) also recommends the use of quotes.

Option     | Description
---------- | ----------
`style`    | `no_quotes`, `double`, `single` (**default**)

### invalid
```css
.foo {
    background-image: url(img/image.jpg);
    background-image: url("img/image.jpg");
}
```

### valid
```css
.foo {
    background-image: url('img/image.jpg');
}
```

Most of these rules are based on [@mdo](twitter.com/mdo)s [code guide](http://codeguide.co/#css).
