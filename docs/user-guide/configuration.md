# Configuring lesshint
Start by creating a `.lesshintrc` file in your project root and add your settings to it. It will be automatically loaded and merged with the default values. If no `.lesshintrc` file is found in the current working directory, `lesshint` will traverse up the directory structure looking for one, stopping once it finds one or reaches the root directory.

In the `.lesshintrc` file, each option is specified by its own JSON object, for example:

```js
{
    "fileExtensions": [".less", ".css"],

    "excludedFiles": ["vendor.less"],

    "spaceAfterPropertyColon": {
        "enabled": true,
        "style": "one_space" // Comments are allowed
    },

    "emptyRule": true, // If there are no options for a rule, you can simply enable it by setting it to true

    "importantRule": false // To disable a rule completely, set it to false
}
```

Now, take a look at the available [linter options](/lib/linters/README.md).

## Inline configuration
Sometimes, you may want to temporarily disable one or more rules in your `.less` files. This can be accomplished with the use of special inline configuration comments. For example:

```less
.foo {
    color: red !important; // Will be reported since it's outside a disable/enable range
}

// lesshint-disable
.bar {
    color: blue !important; // This won't be reported
}
// lesshint-enable

.baz {
    color: green !important; // This will also be reported since it's outside the disable/enable range
}
```

It's also possible to disable and enable a specific rule:

```less
// lesshint-disable importantRule
.bar {
    color: blue !important; // This won't be reported
}
// lesshint-enable importantRule
```

Multiple rules can be disabled and enabled at once. It's even possible to disable multiple rules and then just enabling one of them. For example:

```less
// lesshint-disable emptyRule, spaceBeforeBrace
.foo{
    // Won't report anything here
}
// lesshint-enable emptyRule
.bar{
    // Will report this empty rule, but not the missing space before the brace
}
```

To disable rules on the current or next line, use `lesshint-disable-line` and `lesshint-disable-next-line`. They can of course also accept a single rule to disable.

```less
.foo {
    color: red !important; // lesshint-disable-line
}

// lesshint-disable-next-line universalSelector
* {
    box-sizing: border-box;
}
```

__Note:__ Comments in selector and value lists are currently ignored.

### Old inline configuration style
While we still support the old style of inline configuration comments, they are deprecated and their usage highly discouraged in favor of the new style documented above.

When using the old style of inline configuration comments, they need to be on the first line of your `.less` file. For example:

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
It's also possible to define your own linters to add to the built-in list. These can be the linters themselves or require paths relative to your current working directory. Note that any custom linters will need to be enabled before they can be used. For example:

```js
"linters": [
    "/path/to/sample-linter.js"
]

"sample": {
    "enabled": true
},

"otherSample": {
    "enabled": true
}
```
