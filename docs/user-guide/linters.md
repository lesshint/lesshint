# Using linters
In addition to the linters provided by `lesshint`, it's also possible to include custom ones. These can either be npm modules or paths to local linters on disk.

## Using reporters from the CLI
```bash
lesshint --linters my-super-awesome-linter file.less
lesshint --linters /path/to/my/super/awesome/linter.js file.less
```

Please note that each custom linter will need to be enabled in your `.lesshintrc` file before they can be used.

```js
"awesomeLinter": {
    "enabled": true,
    "someOption": false
}
```
