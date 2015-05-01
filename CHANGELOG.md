# Changelog

### 0.3.0 (2015-05-01)
* Added the following linters:
    * `duplicateProperty`
    * `emptyRule`
    * `finalNewline`
    * `idSelector`
    * `trailingSemicolon`
* Better error messages, the property or value that caused the error are now more clearly described.
* Internal code cleanup.

## 0.2.0 (2015-04-27)
* Added the following linters:
    * `borderZero`
    * `hexLength`
    * `hexNotation`
    * `hexValidation`
    * `spaceAfterPropertyName`
* `lesshint` will now exit with proper status codes. E.g. `1` when there's a lint error in a checked file, thus failing builds etc.
* Made some improvements to CLI output, added colors and made it easier to read.
* Fixed an issue where the `spaceBeforeBrace` linter would report the wrong column when `style` is `one_space` ([`#4`](https://github.com/jwilsson/lesshint/issues/4)).

## 0.1.5 (2015-04-24)
* The default options are now always loaded, regardless if `lesshint` is running from the CLI or another module.
* If no files are passed via the CLI, an error is now printed.
* When something's wrong with a passed config file, the error message from `JSON.parse()` is also shown.

### 0.1.4 (2015-04-20)
* Fixed incorrect dependency name.

### 0.1.3 (2015-04-20)
* Fixed some issues where the default config wasn't properly loaded.
* Fixed an issue when the CLI was passed multiple directories and files, they weren't all linted.

### 0.1.2 (2015-04-19)
* Another version bump for npm.

### 0.1.1 (2015-04-19)
* Version bump for npm after some old files were deleted.

### 0.1.0 (2015-04-19)
* Initial release
