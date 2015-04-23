# Available linters

*Warning: Before we hit 1.0 don't trust the default values, they are subject to change after votes by the community. Always specify exactly what you want to report.*

Each linter also accept a `enabled` option to turn if off/on completely.

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

## new_line
```css
.foo
{
    color: red;
}
```
