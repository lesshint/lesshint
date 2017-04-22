# Using linters
In addition to the linters provided by `lesshint`, it's also possible to include custom ones. These can either be npm modules or paths to local linters on disk.

## The linter loading steps
1. If a relative path is passed it'll first try to load it by resolving the path against [`process.cwd()`](https://nodejs.org/api/process.html#process_process_cwd). If it's a absolute path, it'll load it directly.
2. If the first step fails, it'll try to load it as a Node module. If `lesshint` is installed globally only globally installed linters are available (the normal Node module loading rules apply).
3. If it still fails to load the linter, it'll try to load it relative to the location of the `.lesshintrc` file in use.

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
