# Using reporters
Reporters are small modules that can be used to perform actions with the lint results, for example printing something to the terminal or generate custom reports.

## The reporter loading steps
1. If nothing is passed, a simple, default reporter will be used. This will just print all the warnings/errors found.
2. Pass the name of a Node module. If `lesshint` is installed globally only globally installed reporters are available (the normal Node module loading rules apply).
3. Pass a absolute or relative path to a custom reporter anywhere on the disk. Relative paths will be resolved against [`process.cwd()`](https://nodejs.org/api/process.html#process_process_cwd).

These steps always apply, no matter whether you're using the CLI or calling `lesshint` from code.

## Using reporters from the CLI
```bash
lesshint --reporter my-super-awesome-reporter file.less
lesshint --reporter /path/to/my/super/awesome/reporter.js file.less
```
