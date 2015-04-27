# Available linters

*Warning: Before we hit 1.0 don't trust the default values, they are subject to change after votes by the community. Always specify exactly what you want to report.*

Each linter also accept a `enabled` option to turn if off/on completely.

* [borderZero](#borderzero)
* [hexLength](#hexlength)
* [hexNotation](#hexnotation)
* [hexValidation](#hexvalidation)
* [spaceAfterPropertyColon](#spaceafterpropertycolon)
* [spaceAfterPropertyName](#spaceafterpropertyname)
* [spaceBeforeBrace](#spacebeforebrace)
* [trailingSemicolon](#trailingsemicolon)

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

## hexLength
Prefer longhand hex color declarations over short hand ones.

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
Hex color declarations should be written in lowercase.

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

## spaceAfterPropertyColon
Each colon in property declarations should be followed by a space.

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
A space should be present before opening braces.

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
