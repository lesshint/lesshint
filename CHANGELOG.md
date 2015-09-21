# Changelog

## 0.9.1 (2015-09-09)
* Fixed an issue in `propertyOrdering` where identical properties weren't handled correctly ([#59](https://github.com/lesshint/lesshint/issues/59)).
* Fixed an issue in `idSelector` where it would sometimes crash.
* Fixed error message language in `urlQuotes` Props [@shellscape](https://github.com/shellscape). ([#60](https://github.com/lesshint/lesshint/pull/60)).

## 0.9.0 (2015-08-31)
* `lesshint` now reports Less parse errors. Props [@shellscape](https://github.com/shellscape). ([#46](https://github.com/lesshint/lesshint/pull/46), [#47](https://github.com/lesshint/lesshint/pull/47)).
* All reporters now receive a `severity` property with the values `error` for parse errors and `warning` for rule violations. This feature will be developed further in future releases.
* A `propertyOrdering` linter has been added. Props [@srogers202](https://github.com/srogers202). ([#48](https://github.com/lesshint/lesshint/pull/48))
* Fixed an issue where `spaceBeforeComma` and `spaceAfterComma` would erroneously report on all operators. ([#49](https://github.com/lesshint/lesshint/issues/49)).
* Fixed an issue where `singleLinePerProperty` would erroneously report lines with trailing comments. Props [@CITguy](https://github.com/CITguy). ([#54](https://github.com/lesshint/lesshint/pull/53)).
* Fixed an issue where `attributeQuotes` would erroneously report on boolean attributes. Props [@CITguy](https://github.com/CITguy). ([#54](https://github.com/lesshint/lesshint/pull/54)).
* Fixed message grammar in `singleLinePerSelector` ([#42](https://github.com/lesshint/lesshint/issues/42)).

## 0.8.0 (2015-08-16)
* **This release contains possible breaking changes. Check this list before updating.**
* Support for custom reporters has been added. This enables users to do whatever they want with the lint results, not just log it to the console.
* Added the following linters:
    * `singleLinePerProperty`
    * `singleLinePerSelector`
    * `trailingWhitespace`
* The Less AST passed to each linter is now frozen to prevent accidental modifying by a linter.
* All linters now returns the complete source of each offending line.
* Linters are no longer passed a filename.

## 0.7.1 (2015-08-05)
* Fixed an issue where Windows line endings in the Less source would cause the wrong line to be reported ([#28](https://github.com/lesshint/lesshint/issues/28)).

## 0.7.0 (2015-06-24)
* `lesshint` has a new home: https://github.com/lesshint/lesshint
* Added the following linters
    * `importPath`
    * `propertyUnits`
    * `spaceAfterComma`
    * `spaceBeforeComma`
    * `spaceBetweenParens`
* Updated `gonzales-pe` dependency, adding support for all forms of `:extend()`.
* Added the possibility to exclude files. See the `excludedFiles` option and `-e`/`--exclude` flags.
* Added the possibility to specify which file extensions to check, see the `fileExtensions` option.
* Fixed an issue where `lesshint` wouldn't report any more errors when the parser encountered a problem.
* Fixed an issue where `hexNotation` would report hex codes with invalid characters.
* Fixed an issue where `spaceAfterPropertyValue` wouldn't report multiple errors in the same block.

## 0.6.2 (2015-06-01)
* Stopped `hexLength` and `hexNotation` from reporting on invalid hex colors.

## 0.6.1 (2015-05-28)
* Lock `gonzales-pe` dependency to stop things from breaking due to changes there.

## 0.6.0 (2015-05-27)
* Added the following linters:
    * `qualifyingElement`
    * `spaceAfterPropertyValue`
* Fixed an issue where `trailingSemicolon` would fail when a space was preceding the semicolon.
* Fixed an issue where `hexNotation` would incorrectly report colors with only numbers.
* Fixed an issue in `idSelector` due to a changed AST from `gonzales-pe`.
* The `detached rulesets` feature of Less is now supported thanks to a upstream patch in `gonzales-pe`.
* Increased test coverage.

## 0.5.1 (2015-05-19)
* Fixed issues with `hexLength`, `hexNotation`, and `hexValidation` where they wouldn't check for hex colors outside declarations (in variables for example) ([#28](https://github.com/lesshint/lesshint/issues/28)).

## 0.5.0 (2015-05-17)
* Added the following linters:
    * `attributeQuotes`
    * `comment`
    * `leadingZero`
    * `trailingZero`
    * `zeroUnit`
* Added an `exclude` option to the following linters:
    * `duplicateProperty`
    * `idSelector`
* The `stringQuotes` linter now checks strings everywhere, not just in rulesets.

## 0.4.1 (2015-05-11)
* Fixed two issues with `urlFormat` and `urlQuotes` where they would incorrectly report errors when the URLs were surrounded by spaces ([#22](https://github.com/lesshint/lesshint/issues/22)).

## 0.4.0 (2015-05-10)
* **Breaking change:** The `LessHint` class is now called `Lesshint`.
* The following linters have been added:
    * `importantRule`
    * `stringQuotes`
    * `urlFormat`
    * `urlQuotes`
* All linters can now be disabled by simply setting the respective property to `false`. No need to set `enabled: false` anymore.
* Some other improvements to the linters.

## 0.3.1 (2015-05-03)
* When running from the CLI and a line or column is `null`, it's no longer printed.
* Fixed an issue where the only error reported was a missing final newline.
* Fixed an issue that prevented errors on the last ruleset from being shown when a final newline was missing.
* Fixed an issue where `emptyRule` would incorrectly report errors on rules that only contain a mixin ([#16](https://github.com/lesshint/lesshint/issues/16)).
* Fixed an issue where `trailingSemicolon` would fail on an empty rule.
* Fixed an issue where `trailingSemicolon` would incorrectly report errors in rules containing variables inside `@media` directives ([#15](https://github.com/lesshint/lesshint/issues/15)).

## 0.3.0 (2015-05-01)
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
* Fixed an issue where the `spaceBeforeBrace` linter would report the wrong column when `style` is `one_space` ([`#4`](https://github.com/lesshint/lesshint/issues/4)).

## 0.1.5 (2015-04-24)
* The default options are now always loaded, regardless if `lesshint` is running from the CLI or another module.
* If no files are passed via the CLI, an error is now printed.
* When something's wrong with a passed config file, the error message from `JSON.parse()` is also shown.

## 0.1.4 (2015-04-20)
* Fixed incorrect dependency name.

## 0.1.3 (2015-04-20)
* Fixed some issues where the default config wasn't properly loaded.
* Fixed an issue when the CLI was passed multiple directories and files, they weren't all linted.

## 0.1.2 (2015-04-19)
* Another version bump for npm.

## 0.1.1 (2015-04-19)
* Version bump for npm after some old files were deleted.

## 0.1.0 (2015-04-19)
* Initial release
