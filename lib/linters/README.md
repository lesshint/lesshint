# Available linters

*Warning: Before we hit 1.0 don't trust the default values, they are subject to change after votes by the community. Always specify exactly what you want to report.*

## spaceAfterPropertyColon
Each colon in property declarations should be followed by a space. For example:

```css
.foo {
    margin: 0;
}
```

Option     | Description
---------- | ----------
`style`    | `no_space`, `one_space` (**default**)

## spaceBeforeBrace
A space should be present before opening braces. For example:

```css
.foo {
    color: red;
}
```

Option     | Description
---------- | ----------
`style`    | `no_space`, `one_space` (**default**), `new_line`
