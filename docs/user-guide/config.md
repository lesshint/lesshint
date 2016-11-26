# Config

_If you're looking for individual linter options, please refer to the [linter documentation](/lib/linters/README.md)._

## Inline configuration
It's possible to configure rules using inline comments in your `.less` files. For example:

```less
// lesshint spaceBeforeBrace: false
.foo{ // This line won't be reported
    color: red;
}
```

It's also possible to disable rules on a single line using a trailing comment:

```less
.bar {
    color:red; // lesshint spaceAfterPropertyColon: false
}
```

If you wish to enable a rule that's disabled in your `.lesshintrc` you need to specify all the other options for it too. For example:

`.lesshintrc`:
```json
{
    "emptyRule": false,
    "spaceAfterPropertyName": false
}
```

`file.less`
```less
// lesshint spaceAfterPropertyName: { enabled: true, style: "one_space" }, emptyRule: true
.foo {
    color : red; // Won't report the extra space before ":"
}

.bar { // But this empty rule will be reported

}
```

The inline configuration options format is a less strict form of JSON. Keys doesn't need any quotes but string values need double quotes.

## Other available options

### fileExtensions
Array of file extensions to check. Either an array of extensions or `"*"` to allow all files. For example:

```js
"fileExtensions": [".less", ".css"] // Allow ".less" and ".css" files. Can be passed with or without a dot.

"fileExtensions": "*" // Allow all files
```

### excludedFiles
Array of [minimatch glob patterns](https://github.com/isaacs/minimatch) or a file to exclude. For example:

```js
"excludedFiles": ["vendor/*.less"] // Ignore all files in "vendor/"

"excludedFiles": ["vendor.less"] // Ignore a file named "vendor.less"
```

### linters
It's also possible to define your own linters to add to the built-in list. These can be the linters themselves or require paths relative to your current working directory. For example:

```js
"linters": [
    "./plugins/linters/sampleLinter"
]
```
