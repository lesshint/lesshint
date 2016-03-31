# Changelog
## 1.5.2 (2016-03-31)
* Changed `gonzales-pe` full URL to GitHub pattern. ([e83e665](https://github.com/lesshint/lesshint/commit/e83e665f36e8beba0976b9ee32ad478067a117e5))

## 1.5.1 (2016-03-29)
* Fixed an issue where `zeroUnit` would crash in certain cases. ([34606cc](https://github.com/lesshint/lesshint/commit/34606cc78963be33e988c1061d404f53e1b26d19))

## 1.5.0 (2016-03-24)
* Added a `at_least_one_space` value for the `style` option in `spaceAfterPropertyColon`. ([5e9fd1e](https://github.com/lesshint/lesshint/commit/5e9fd1e1d6be23a822394e06f9a8d31bddbac018))
* Added `units` and `exclude` options to `zeroUnit`. ([728f37a](https://github.com/lesshint/lesshint/commit/728f37a73d117d6352d2bf146fa09240be4453a2))
* Fixed an issue where `decimalZero` wouldn't check all numbers. ([661cc57](https://github.com/lesshint/lesshint/commit/661cc574e6f7d1c04199339daffa1f83475ae66e))
* Fixed an issue where `zeroUnit` would erroneously report properties without units. ([728f37a](https://github.com/lesshint/lesshint/commit/728f37a73d117d6352d2bf146fa09240be4453a2))

## 1.4.0 (2016-03-01)
* Added the following linters:
    * `depthLevel` ([18bb203](https://github.com/lesshint/lesshint/commit/18bb2038be240f9805b0a8a8756fe700cbe47526))
* Added support for configuration using inline comments. ([cf757cd](https://github.com/lesshint/lesshint/commit/cf757cd9741cffeef966885de76168d50dc58716))
* Added a `18f` option to `singleLinePerSelector`. ([2f65c31](https://github.com/lesshint/lesshint/commit/2f65c3175ff3bd1b2b56daa4250ac8c505602bfb))
* Fixed an issue where `singleLinePerProperty` would erroneously report mixins without semicolons. ([ef97361](https://github.com/lesshint/lesshint/commit/ef9736100f3b5b481140e2fc25aaca9c5374d3c1))
* Fixed an issue where `spaceAroundOperator` would erroneously report negative numbers. ([2569d73](https://github.com/lesshint/lesshint/commit/2569d7347f2aae6bb068b5edcddabca03a0df734))
* Fixed an issue where `trailingWhitespace` would output errors when checking empty files. ([26ba39b](https://github.com/lesshint/lesshint/commit/26ba39b9bebc815edc4bf3393a168a6dd8e84ca0))
* Fixed an issue where `importPath` would erroneously report files with different file extensions than `.less`. ([b7610dd](https://github.com/lesshint/lesshint/commit/b7610dd0355d296bcfe25c558d51990878a649eb))
* Fixed an issue where `singleLinePerSelector` would erroneously report selectors with the comma on a new line. ([637ff49](https://github.com/lesshint/lesshint/commit/637ff4917d5721d987b1baaeb273e80026058602))
* Fixed an issue where `finalNewline` would sometimes report the wrong line. ([12981cd](https://github.com/lesshint/lesshint/commit/12981cde36c02a5b81586debbab0c4f9533a701e))
* Updated ESLint to `2.x` ([4c14d3a](https://github.com/lesshint/lesshint/commit/4c14d3af674267bc22ccbfc6068e774c6c4eef69))

## 1.3.1 (2016-02-12)
* Fixed an issue where `spaceAroundOperator` would erroneously try to check negative values. ([fe37b21](https://github.com/lesshint/lesshint/commit/fe37b21b29c2d5ae9e1a18b5060a16ba4eec9168))
* Fixed an issue where `spaceAroundOperator` would erroneously report `font-size/line-height` shorthand declarations. ([4819346](https://github.com/lesshint/lesshint/commit/4819346b2f07ee3138d2c7a2612c6db9e6510643))

## 1.3.0 (2016-02-12)
* Added the following linters:
    * `spaceAroundOperator` ([ac689c7](https://github.com/lesshint/lesshint/commit/ac689c7d9658bd5609df8286361864e73f42339a))
* Added the possibility to override linter `severity` and added a new exit status code for it. See linter docs for more info. ([0bc95e1](https://github.com/lesshint/lesshint/commit/0bc95e1750a5d4c2312db9f0de47e707b2eebcf2), [062950f](https://github.com/lesshint/lesshint/commit/062950f5df9c29df22af91e6fc9c023ac293b584), [e1d6831](https://github.com/lesshint/lesshint/commit/e1d68311705ea2691671b728b2178bb5c6b59a9c))
* Fixed an issue where excludedFiles in the config file weren't honored in the CLI. ([974d0fa](https://github.com/lesshint/lesshint/commit/974d0fa6debfa5033c01c6b50a66a94c34e31a41))
* Updated lodash to `4.x`. ([ac52619](https://github.com/lesshint/lesshint/commit/ac5261998e2b8a7369312c0c034aefdac4351b39))
* Some other minor improvements to `singleLinePerProperty`. ([072664d](https://github.com/lesshint/lesshint/commit/072664df836e4a8c30f0b062da0ab49b7152e97e), [bc439e7](https://github.com/lesshint/lesshint/commit/bc439e73e0662c74c42590c8976dcc96cd198148))

## 1.2.2 (2016-01-26)
* Fixed an issue where local variable declarations would crash `duplicateProperty`. ([2955198](https://github.com/lesshint/lesshint/commit/295519811590f98bb77ad493e1072bf242eea9bc))

## 1.2.1 (2015-12-14)
* Fixed an issue in `selectorNaming` where it would sometimes fail if there is no selector name. ([8b48fee](https://github.com/lesshint/lesshint/commit/8b48fee9589c8cf1f6778c771eab45eb9731269a))
* Fixed an issue in `singleLinePerProperty` where it would erroneously report "chained" mixins. ([71f2afe](https://github.com/lesshint/lesshint/commit/71f2afee9a79dbf74bdd25831bae84b3c96d5138))
* Fixed an issue in `qualifyingElement` where it wouldn't check parent selectors. ([8b090c9](https://github.com/lesshint/lesshint/commit/8b090c99d474c797a0c5c2b27c66e5a9deda8578))

## 1.2.0 (2015-12-10)
* Added `selectorNaming` linter. ([94639fa](https://github.com/lesshint/lesshint/commit/94639fa5b210a13e47060033f75c9d59aa9701ac))
* Reporters now require a `report` method, and the old use is now deprecated. ([72263bc](https://github.com/lesshint/lesshint/commit/72263bc303bb7f3f2abed569efe7d07b69705db2))
* Fixed an issue where nested media queries would be erroneously reported by `singleLinePerProperty`. ([3f251e1](https://github.com/lesshint/lesshint/commit/3f251e157e15d6fca6a15c2d1256b11568ad4521))
* Fixed an issue where declarations without a semicolon would erroneously trigger `singleLinePerProperty`. ([3f251e1](https://github.com/lesshint/lesshint/commit/3f251e157e15d6fca6a15c2d1256b11568ad4521))

## 1.1.0 (2015-11-21)
* Replaced our Less parser, `gonzales-pe`, with our own fork to solve various parsing issues. ([a31a790](https://github.com/lesshint/lesshint/commit/a31a790a0aeaa201764087125167c6991ef8f91d))
* Byte order marks are now stripped from config files. ([9d2721e](https://github.com/lesshint/lesshint/commit/9d2721ef4847a89da89d1d34e012f170aa599624))
* New test suite, using Chai and Gulp. ([7915ac5](https://github.com/lesshint/lesshint/commit/7915ac566117bf08dcc547a878efece414cf0573), [44a367c](https://github.com/lesshint/lesshint/commit/44a367ca5c4cece00eef8811cb97f3c338e72932))
* Updated dependencies. ([fc714bd](https://github.com/lesshint/lesshint/commit/fc714bd9a43b486cdf43d22f26a465b3653018c3), [62f3d72](https://github.com/lesshint/lesshint/commit/62f3d720acb1f26ce2a1c7185d3e8ab04614bcfd))

## 1.0.1 (2015-10-22)
* Fixed an issue where local variable declarations would crash `propertyUnits`. ([06bee99](https://github.com/lesshint/lesshint/commit/06bee99413d5c5fa2d2fc06ba03157a98aa67f89))
* Fixed an issue where `importPath` wouldn't check `url()` statements. ([91cf906](https://github.com/lesshint/lesshint/commit/91cf90619b86050691af71d357bc343ea779167c))
* Fixed an issue where `urlQuotes` wouldn't check `@import url()` statements. ([a038ec5](https://github.com/lesshint/lesshint/commit/a038ec5b99c2310e3e351c0031436c452c802a57))
* Fixed issues where `singleLinePerProperty` wouldn't check mixins, variables, and detached rulesets. ([ae16888](https://github.com/lesshint/lesshint/commit/ae16888f85c9357e880ec8ed882743a24d9fcade))
* Fixed incorrect checking of absolute URLs in `importPath`. ([2709dc9](https://github.com/lesshint/lesshint/commit/2709dc9c781263191e1560e4e5429b61f25b577a), [0756cba](https://github.com/lesshint/lesshint/commit/0756cba7f1ee68ce0a05c4d89862bf8ed474416d))

## 1.0.0 (2015-10-19)
* Complete linter refactor. ([92bb70a](https://github.com/lesshint/lesshint/commit/92bb70a7c53310cfdf00b4ec771d38a1ebee66ff))
* Merged `spaceAfterComma` and `spaceBeforeComma` into `spaceAroundComma` ([28497b0](https://github.com/lesshint/lesshint/commit/28497b0899fe75757d2a0e77fe859154622c890f)).
* Merged `leadingZero` and `trailingZero` into `decimalZero` ([12d34a5](https://github.com/lesshint/lesshint/commit/12d34a529144bbbfe4d57d63110c43c7f05a3260)).
* Removed the quote style option from `attributeQuotes`. ([c0b229e](https://github.com/lesshint/lesshint/commit/c0b229ea7755d9a46af596407395f34eeb62b80f))
* The `comment` linter is now disabled by default. ([c93121f](https://github.com/lesshint/lesshint/commit/c93121fa49e251912910b914f1e2b47dec533abb))
* The default value for `zeroUnit` is now `keep_unit`. ([0c9ef81](https://github.com/lesshint/lesshint/commit/0c9ef818afcfd7c3c181a811ff3ab6e4fc2655ab))
* The following changes has been made to `propertyUnits`: ([8b85210](https://github.com/lesshint/lesshint/commit/8b85210a2e8053b4ec1a5455dda7a906f7dea2df))
    * Renamed `global` to `valid`.
    * Added an `invalid` option.
* Lint results are now sorted by line and column numbers. ([50d223f](https://github.com/lesshint/lesshint/commit/50d223fa21f726838222cc50963c6a660afeab7f))
* Better handling of parse errors, they are now returned together with the lint results. ([f6efb3c](https://github.com/lesshint/lesshint/commit/f6efb3cd01d523495d366e62ba2fe47c4d9dc828))
* Updated `gonzales-pe` to `3.x`. ([ac47970](https://github.com/lesshint/lesshint/commit/ac479703d018bec2f8e28bd58535b404319a9305), [9cba245](https://github.com/lesshint/lesshint/commit/9cba245b528bb235f5d0c4d17770e039e5133663))
* Updated other dependencies. ([acb5e10](https://github.com/lesshint/lesshint/commit/acb5e108d6dd9b73e6fe50a440e9f03e7a72e458), [fcdf05d](https://github.com/lesshint/lesshint/commit/fcdf05d2eee7eac21fc17da48568d8d784022c32))

## 0.9.4 (2015-09-25)
* Fix for bad `0.9.3`.

## 0.9.3 (2015-09-25)
* Fixed an issue where `propertyOrdering` would try to check variables and crash.

## 0.9.2 (2015-09-23)
* Fixed an issue where `spaceBeforeBrace` wouldn't check `@media` queries. Props [@kokarn](https://github.com/kokarn). ([#61](https://github.com/lesshint/lesshint/issues/61)).
* Fixed an issue where `finalNewline` would fail on empty files.
* Fixed an issue where `trailingWhitespace` would fail on empty files.

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
