# Changelog
## 4.6.5 (2018-03-01)
* Fixed an issue where `propertyOrdering` wouldn't check at-rules with only declarations. ([1441a55](https://github.com/lesshint/lesshint/commit/1441a55fa5272c31dea1b8280e6631b20c8c509a))

## 4.6.4 (2018-02-02)
* Fixed an issue where multiple inline disables of same the rule wouldn't disable each one properly. ([80e8475](https://github.com/lesshint/lesshint/commit/80e84752b31ae139d9f33f6ed64a1fcd01f335a1))

## 4.6.3 (2018-01-05)
* Fixed a CLI glob matching/excluded files regression introduced in `4.5.0`. ([c4fea99](https://github.com/lesshint/lesshint/commit/c4fea992dc1cc3047315232b3daa1be506815c0e))

## 4.6.2 (2017-12-14)
* The full file path will now be passed to `postcss` so it'll be available on all AST nodes. ([3d409fc](https://github.com/lesshint/lesshint/commit/3d409fcab4001f1a5d606589ca750c163ad861e6))

## 4.6.1 (2017-12-12)
* Fixed an issue where `idSelector` would sometimes report the incorrect position. ([8f12cb1](https://github.com/lesshint/lesshint/commit/8f12cb19773f1dedaf6cf58294da83cdc26f76cb))
* Fixed an issue with enabling all comments with inline configuration comments. ([8840589](https://github.com/lesshint/lesshint/commit/88405898763453958792e8520263093a47ffb530))

## 4.6.0 (2017-12-11)
* Improved the inline configuration comments. Read more about it in the [docs](https://github.com/lesshint/lesshint/blob/master/docs/user-guide/configuration.md#inline-configuration). ([4c546bc](https://github.com/lesshint/lesshint/commit/4c546bc687e5f5a3eaab4d71bbdbaa213afce7bf))
* Added an `allowedValues` option to `variableValue` ([dbceb6d](https://github.com/lesshint/lesshint/commit/dbceb6d48b592d6990f415ca385fad55f83d1cd4))

## 4.5.0 (2017-11-27)
* Added a `Lesshint.checkFiles()` method. This is a more general-purpose method working on globs instead of directories/file names. ([dc939cd](https://github.com/lesshint/lesshint/commit/dc939cdfa1b99aba08ec2bdbb028c550bcc2ac35))
* Deprecated the following methods: ([dc939cd](https://github.com/lesshint/lesshint/commit/dc939cdfa1b99aba08ec2bdbb028c550bcc2ac35))
    * `Lesshint.checkDirectory()`
    * `Lesshint.checkFile()`
    * `Lesshint.checkPath()`
* The CLI will now also utilize the `Lesshint.checkFiles()` method. ([dc939cd](https://github.com/lesshint/lesshint/commit/dc939cdfa1b99aba08ec2bdbb028c550bcc2ac35))

## 4.4.0 (2017-11-10)
* Added a `spaceAroundBang` linter. ([b459b8b](https://github.com/lesshint/lesshint/commit/b459b8b6e72960a4fae0ed5ef23baa1305028c8a))
* CI tests are run on Node 9. ([7f8e58a](https://github.com/lesshint/lesshint/commit/7f8e58ae4078ca13176ae0ac7f84a3c074c94f5e))

## 4.3.0 (2017-10-28)
* Updated `postcss-values-parser` to `1.3.0`. ([218ca20](https://github.com/lesshint/lesshint/commit/218ca20d0b8ba54b64bd24c0ded10f1ded978bb2))
* Added a `hasQuotes` util. ([86feef6](https://github.com/lesshint/lesshint/commit/86feef6af64723dba4b35d31ab14e0468ca033fb))
* Replaced some instances of string concatenation with template strings. ([73fd66e](https://github.com/lesshint/lesshint/commit/73fd66e1e3c94f869ed62e52d0466d4235122d8e))

## 4.2.0 (2017-10-24)
* Updated `postcss-selector-parser` to `3.0.0`. ([6fac21a](https://github.com/lesshint/lesshint/commit/6fac21a404a8c8ff48564fa21e5357efaca9b94d))
* The `parseSelector` util can also accept PostCSS `Rule` nodes which gives better errors. ([6fac21a](https://github.com/lesshint/lesshint/commit/6fac21a404a8c8ff48564fa21e5357efaca9b94d))
* Updated `sinon` to `4.0.0`.
([82ee2aa](https://github.com/lesshint/lesshint/commit/82ee2aa8c4bb2116dc7010375cec46483e506c3c))

## 4.1.3 (2017-09-25)
* Fixed an issue where `finalNewline` would erroneously report files with CRLF line endings. ([5aff629](https://github.com/lesshint/lesshint/commit/5aff62999cb00dbf323a0001cefe640f3f48334c))

## 4.1.2 (2017-09-20)
* Fixed an issue where `spaceBeforeBrace` would erroneously report whitespace before a new line. ([8078c85](https://github.com/lesshint/lesshint/commit/8078c855676f4497c658693a23264fa84c7dbc20))
* Fixed an issue where the inline config rule name check wouldn't properly accept all characters in rule names. ([9fde6bf](https://github.com/lesshint/lesshint/commit/9fde6bf9c9ed67e14393ae2b71bb5ffe3e55eac7))
* Fixed a typo in the `trailingWhitespace` error message. ([a5fa514](https://github.com/lesshint/lesshint/commit/a5fa5146c9904b855e70f344a144c3dd30264758))
* Fixed a typo in the `trailingWhitespace` docs. ([bc94cdc](https://github.com/lesshint/lesshint/commit/bc94cdc7a0e00429820c7e6c2b53f09079374f00))
* Added docs on allowed characters in rule names. ([3bb78af](https://github.com/lesshint/lesshint/commit/3bb78afb5e1f7efc2da235891c8d307196bbc3e5))

## 4.1.1 (2017-07-26)
* Downgraded `postcss-values-parser` to `1.2.2`. ([c26f1e6](https://github.com/lesshint/lesshint/commit/c26f1e6842fbe02051069961df1875e7e7cbc8e1))

## 4.1.0 (2017-07-24)
* `Lesshint.configure()` now returns the final config object. ([076f8fe](https://github.com/lesshint/lesshint/commit/076f8fe06a900e432c48b40a510dc7f865ad90cb))
* The `parseValue` util can now accept `postcss-values-parser` options. ([c2f8d53](https://github.com/lesshint/lesshint/commit/c2f8d53fd10c668be797194c586339731883e8f7))
* Updated `postcss-values-parser` to `1.3.0`. ([e49f4d7](https://github.com/lesshint/lesshint/commit/e49f4d793542ab3ce02f2a802f81a16b599430c2))
* Refactored position reporting in the following linters:
    * `borderZero` ([836ff0f](https://github.com/lesshint/lesshint/commit/836ff0f53b3954dcf7a3201590f81899efb0dcef))
    * `colorVariables` ([277f1aa](https://github.com/lesshint/lesshint/commit/277f1aa866ccf62781095552cf45de928b132c2a))
    * `decimalZero` ([d33fa2c](https://github.com/lesshint/lesshint/commit/d33fa2ca05436d4ce0178a75ed97bd6990f38be6))
    * `hexLength` ([e599d8b](https://github.com/lesshint/lesshint/commit/e599d8bd90b31046ff29da50dac0e6db58734fe5))
    * `hexNotation` ([60e7485](https://github.com/lesshint/lesshint/commit/60e7485a61894f9967b3c840be8abf4fdf65ba28))
    * `hexValidation` ([7b441aa](https://github.com/lesshint/lesshint/commit/7b441aac1947d0dc401085267077807f909b2415))
    * `idSelector` ([d8b298b](https://github.com/lesshint/lesshint/commit/d8b298b1aa6e3199296c0e918dfa32f9a658834a))
    * `importantRule` ([ba733a6](https://github.com/lesshint/lesshint/commit/ba733a666f1f77cc008b3f74abbfc02dd38ee8fd))
    * `propertyUnits` ([da6353e](https://github.com/lesshint/lesshint/commit/da6353ee0afa0abe7d71c9b0137d9c8a4986c702))
    * `qualifyingElement` ([58a3f03](https://github.com/lesshint/lesshint/commit/58a3f0327df1e753dc2fd2a1009c4782508605c1))
    * `selectorNaming` ([7b2f08e](https://github.com/lesshint/lesshint/commit/7b2f08e8f3744febd257812d8b07324f96dcc6b6))
    * `spaceAfterPropertyName` ([871bf2c](https://github.com/lesshint/lesshint/commit/871bf2c659dcfc197440aa69273d279fd4b1e391))
    * `spaceAfterPropertyValue` ([7395a16](https://github.com/lesshint/lesshint/commit/7395a16d23872b992a7c29a2dab0dafbacba6b7c))
    * `spaceBeforeBrace` ([36979f4](https://github.com/lesshint/lesshint/commit/36979f4e798d088e43c1e9f724980159cc848188))
    * `universalSelector` ([4aaf666](https://github.com/lesshint/lesshint/commit/4aaf666782baedd3db206fccb30898dd849855bc))
    * `urlFormat` ([56a4c64](https://github.com/lesshint/lesshint/commit/56a4c64f243d2d722a5a872c865e63fcccf4ec92))
    * `urlQuotes` ([56a4c64](https://github.com/lesshint/lesshint/commit/56a4c64f243d2d722a5a872c865e63fcccf4ec92))
    * `variableValue` ([de75d7e](https://github.com/lesshint/lesshint/commit/de75d7ed7c46558a614eb5dc4909a692e18f78b6))
    * `zeroUnit` ([b24c91a](https://github.com/lesshint/lesshint/commit/b24c91a4e4fe39fdf51dfcbe736967ddfd092a67))

## 4.0.2 (2017-07-20)
* Lockdown `postcss-values-parser` to `~` range. ([d198ed6](https://github.com/lesshint/lesshint/commit/d198ed6b6807464a0d9b443c4e592368bb4ede05))

## 4.0.1 (2017-07-10)
* Fixed an issue where incomplete rules would crash `lesshint`. ([31b54c1](https://github.com/lesshint/lesshint/commit/31b54c1ef48840d457ddbfd04c9b08dd4fad936d))
* Fixed faulty column reporting in `spaceAroundOperator`. ([87cb546](https://github.com/lesshint/lesshint/commit/87cb546697c5424800393b1bc6902c875fac3650))
* Added `fr` to `propertyUnits` defaults. ([80fb2b4](https://github.com/lesshint/lesshint/commit/80fb2b4b18d4657a9944d79a149e20d9a1d61f4a))
* The `isColor` from `postcss-values-parser` is now used where applicable. ([2c038af](https://github.com/lesshint/lesshint/commit/2c038afa8c04399427b4eb7b2ee4acddcd0e5f02))

## 4.0.0 (2017-06-25)
* **Breaking** Updated `postcss-less` to `1.0.0`, could cause issues if custom linters are used. ([03107e5](https://github.com/lesshint/lesshint/commit/0a020df33c3cf04c7e0f12305311efeeb0a3611d))
* **Breaking** Updated `postcss` to `6.0.0`, could cause issues if custom linters are used. ([4e49588](https://github.com/lesshint/lesshint/commit/4e495883b1c510cb2a3aee23e3a27e37af57f03a))
* **Breaking** Warnings no longer give exit code `1`, and errors give exit code `1` instead of `2`. ([5bc9e3f](https://github.com/lesshint/lesshint/commit/5bc9e3faae8a7326e53a65ec388240fac217fe30))
* Fixed an issue where config objects passed to the `Linter` class would be modified. ([da93ccb](https://github.com/lesshint/lesshint/commit/da93ccb8359df9602c64afcd228dd97105a05589))
* Added docs for the `at_least_one_space` option on `spaceAfterPropertyColon`. ([767e022](https://github.com/lesshint/lesshint/commit/767e022a5c4d9534c32948923cd6655cc25fa667))
* Updated ESLint to `4.0`. ([63c2a11](https://github.com/lesshint/lesshint/commit/63c2a119802ec15217dd63e86664b51ea45b926d))
* Updated `nyc` to `11.0`. ([e6318a5](https://github.com/lesshint/lesshint/commit/e6318a5bd7459c13ce7293e12d65cac9ae979b13))
* Updated `chai` to `4.0`. ([f79cea4](https://github.com/lesshint/lesshint/commit/f79cea4d7f34d5fb34bb84c309fbf404efb32048))

## 3.3.1 (2017-05-08)
* Updated `postcss-less` to `0.16.0`. ([03107e5](https://github.com/lesshint/lesshint/commit/03107e5837a872d3a0f2ba8e063f2c7025e0dcfb))
* Updated `postcss-values-parser` to `1.2.1`. ([1728ff1](https://github.com/lesshint/lesshint/commit/1728ff1234f56180a0e1ef7af57f5c6515313a73))

## 3.3.0 (2017-05-03)
* Added a `colorVariables` linter. ([a4b46fc](https://github.com/lesshint/lesshint/commit/a4b46fc0a8709c67f0f7ab71eae17b9ccb5efa72))
* Added utils to help with common operations:
    * `isAbsoluteURL` ([87a4cd1](https://github.com/lesshint/lesshint/commit/87a4cd138eec08e568fb33eb284ce74669648a06))
    * `isVariable` ([c212054](https://github.com/lesshint/lesshint/commit/c2120541a6ed0b2fdafe0a3c7abe5d90b60c8268))
    * `parseSelector` ([6b5bd0f](https://github.com/lesshint/lesshint/commit/6b5bd0ffec9e18a0fd044ced7871406038b461fa))
    * `parseValue` ([6ac05d7](https://github.com/lesshint/lesshint/commit/6ac05d72907980098015ddba8d5382e55a9223ce))
* Fixed an issue with `spaceAfterPropertyValue` and `!important`. ([b69ff98](https://github.com/lesshint/lesshint/commit/b69ff9848ead0621bd71795bcacaf12309588252))

## 3.2.0 (2017-04-22)
* Added a custom linter loading fallback where the path will be resolved against the `.lesshintrc` location. ([40cffa2](https://github.com/lesshint/lesshint/commit/40cffa2972f381305ed06f1a7a2b0d4163bd4591))
* The `Linter` class was refactored. ([49b7e3b](https://github.com/lesshint/lesshint/commit/49b7e3b47832bb095402f7c4bea71001c046637f))
* Added docs on linter loading. ([0101934](https://github.com/lesshint/lesshint/commit/0101934d5a1a15de29688c5ad323e37a3e0555b4))

## 3.1.1 (2017-03-27)
* Fixed an issue where `finalNewline` would report the wrong position when double `\n` characters were used. ([d234a20](https://github.com/lesshint/lesshint/commit/d234a20b91184e842685d87c646eed122e24bbe5))
* Fixed an issue where `spaceAroundOperator` would erroneously report numbers surrounded by parentheses. ([98953c0](https://github.com/lesshint/lesshint/commit/98953c0f4a0b1d6c2e4bf03ff3c8a92701e27ae7))
* Made sure internal error classes can handle both strings and error objects. ([2a8a52a](https://github.com/lesshint/lesshint/commit/2a8a52a150e0615ea3d6f46a12a6389ea09890ab))
* Fixed an issue where `urlQuotes` would erroneously report variables. ([4508e81](https://github.com/lesshint/lesshint/commit/4508e81a6cdd5ddc6b380ee58fea64be57fff6b9))
* Updated `gulp-mocha` to `4.x`. ([7f392ee](https://github.com/lesshint/lesshint/commit/7f392eea547692e80e8e72f0fff4bfb5d4028446))
* Replaced `istanbul` with `nyc`. ([92d59f8](https://github.com/lesshint/lesshint/commit/92d59f832904012dbc73b213c584edf9faf56a3a))
* Updated `sinon` to `2.x`. ([f94cae6](https://github.com/lesshint/lesshint/commit/f94cae67eb3b61993335cc216cd3a8525af57b18))
* Fixed an `singleLinePerProperty` example config typo. ([5acc9d7](https://github.com/lesshint/lesshint/commit/5acc9d709abdc1f92624d8158d0e963fcd47638c))
* Added a more prominent way to access rule docs from the `README`. ([bc6cc3e](https://github.com/lesshint/lesshint/commit/bc6cc3e06c30e4e84569845f87d591f1a9a8f84f))

## 3.1.0 (2017-02-16)
* Added a `variableValue` linter. ([1a9d48d](https://github.com/lesshint/lesshint/commit/1a9d48d09e8d5eada852b428330eea40214f7c73))
* Added a `universalSelector` linter. ([781e372](https://github.com/lesshint/lesshint/commit/781e372b48523def310fac7b32de5675952a8b0b))
* Fixed an issue where `spaceAroundComma` would crash on stray commas. ([37aaa9a](https://github.com/lesshint/lesshint/commit/37aaa9abdc0726f7f9ac0583e7c253b51612f4ca))
* Fixed faulty line reporting issues in:
    * `attributeQuotes` ([998045e](https://github.com/lesshint/lesshint/commit/998045e976129287a96217acdf3efa60916c2593))
    * `idSelector` ([c1f2808](https://github.com/lesshint/lesshint/commit/c1f28083ff6b2cd35fada47b3cd06b71415ba7c0))
    * `propertyUnits` ([34e3c83](https://github.com/lesshint/lesshint/commit/34e3c83502f676bbf7dbc7218ff8b899d093a1a8))
    * `selectorNaming` ([da04c37](https://github.com/lesshint/lesshint/commit/da04c370f4241c1e879fe3de19748b755ed45765))

## 3.0.1 (2017-02-10)
* Lockdown `postcss-values-parser` to `~` range. ([7e03dbc](https://github.com/lesshint/lesshint/commit/7e03dbcd7db5a61498bc9f3bad1c23f78067877c))

## 3.0.0 (2017-02-08)
* **Breaking** Dropped support for Node < 4. ([7a142ee](https://github.com/lesshint/lesshint/commit/7a142eec6a51c124270a4baa865cba7d8a700a7d))
* **Breaking** The public Node API now exposes multiple classes instead of just the `Lesshint` class. ([5013aae](https://github.com/lesshint/lesshint/commit/5013aaee0d551923f3dba63d3ee832a0d4bee543))
* **Breaking** All `Promise`s returned from `Lesshint` methods are now native ones instead of `Vow`. ([afda593](https://github.com/lesshint/lesshint/commit/afda593da9c5a3b0e27127757c29ccd75c5dda8d))
* **Breaking** Whenever an inaccessible file is encountered, `lesshint` will now throw an error. ([63d258](https://github.com/lesshint/lesshint/commit/63d25894fef5bf2c1c9e1530c7e12482fd2ceb32))
* Added a `Lesshint.getConfig()` method to search for config files using `lesshint`'s logic. ([7850cbf](https://github.com/lesshint/lesshint/commit/7850cbfaea6cec7410d48ec8674cc96f322ad992))
* A complete ES6 rewrite was performed. ([879160f](https://github.com/lesshint/lesshint/commit/879160fedccdf14ff86affb6700f44c6dee10354))
* A new `Runner` class has been added, exposing the full CLI API to Node consumers. ([7c9e76a](https://github.com/lesshint/lesshint/commit/7c9e76abd18c21dcb2e7a9f668e0cbb78c0f9443))
* `excludedFiles` will now be checked on all paths before `lesshint` tries to access them. ([7bc3ab2](https://github.com/lesshint/lesshint/commit/7bc3ab20d60ea1cc15473db3b3b1eca157e15d53))
* The `fullPath` property in linting results will now always be a full, absolute path. ([dab57d4](https://github.com/lesshint/lesshint/commit/dab57d4c14acab3663f985aa1ca91197115d37ef))
* Relative custom linter paths will now be resolved against `process.cwd()`. ([6f2b5d9](https://github.com/lesshint/lesshint/commit/6f2b5d97917609a29b451dca36152c2c56b14cd5))
* The default reporter can now be explicitly required. ([587c215](https://github.com/lesshint/lesshint/commit/587c2151e1cc1749b0adad60be5a903ec76236a9))
* Replaced use of the `exit` module with `process.exitCode`. ([004ae71](https://github.com/lesshint/lesshint/commit/004ae715dd22620501126a046863192ef3b932c9))
* Passing `-1` to the `--max-warnings` flag is no longer supported. Simply omit the flag for the same behavior. ([f8473d1](https://github.com/lesshint/lesshint/commit/f8473d18a7db6815ec1c4738624ed207bdf5cd6a))
* `postcss-values-parser` was updated to `1.1.0`. ([a91aabb](https://github.com/lesshint/lesshint/commit/a91aabb786fd939f3cb8f5ab72cb32c2e39a1b30))
* A huge documentation refresh. ([3addaf0](https://github.com/lesshint/lesshint/commit/3addaf02c7503438802443a9af225e76c56fd3f1))
* Added the `engines` field to `package.json`. ([a62da86](https://github.com/lesshint/lesshint/commit/a62da86c83a0ad87980b14b4ecb2a3566b43507d))
* Added tests for the `lesshint` binary. ([2a16a17](https://github.com/lesshint/lesshint/commit/2a16a171e3e65578c35801b96e2998a8a19f2704))

## 2.4.0 (2016-12-14)
* Added a `allowSingleLineRules` option to `singleLinePerProperty`. ([52879a7](https://github.com/lesshint/lesshint/commit/52879a7acfe4bba6d532a8a231b338616a5ce42c))
* Added a `position` field to results. ([6292387](https://github.com/lesshint/lesshint/commit/62923873b287ed1a347532eac233e8347a5213af))
* Test console spies are now restored before doing assertions. ([00f2f1d](https://github.com/lesshint/lesshint/commit/00f2f1d8b16740b83e6456676ed16193b942c66c))
* Added issue and PR templates. ([33f767d](https://github.com/lesshint/lesshint/commit/33f767de2ef3119024088cfecf8ec95f4c927e2e))
* Fixed a "there's"/"there are" typo in the README. ([31e5eb3](https://github.com/lesshint/lesshint/commit/31e5eb3043c1f0b2d61b9b3c7347fd008d8d04ee))

## 2.3.0 (2016-11-29)
* Added a `-x`/`--max-warnings` CLI flag. ([21e184d](https://github.com/lesshint/lesshint/commit/21e184d1006317bd60e7b5b98b2d52edfe0fc90c))
* Added a JSON reporter. ([a69bdee](https://github.com/lesshint/lesshint/commit/a69bdee9d48502bf1fa266c583d06d7129dfe8f8))
* Reporters can now also be objects and not just file paths.  ([376940c](https://github.com/lesshint/lesshint/commit/376940c0923bcd6b72138518a8dc6694639d662f))
* Fixed a "is"/"are" typo in the README. ([282fdea](https://github.com/lesshint/lesshint/commit/282fdea03ad8cc0f4a88e4d96e6ecadb539beef5))

## 2.2.1 (2016-10-30)
* Fixed a `newlineAfterBlock` regression from `2.2.0`. ([117a2b5](https://github.com/lesshint/lesshint/commit/117a2b55bd44f508a334f1b7b540afc44702bd61))

## 2.2.0 (2016-10-27)
* Rules without any options can now be enabled by just setting it to to `true`. ([5071ce9](https://github.com/lesshint/lesshint/commit/5071ce9d90f922a4690da282cf148d52db22290d))
* Invalid inline rules are now properly reported. ([df2fcac](https://github.com/lesshint/lesshint/commit/df2fcacd64d26d2d30e936e160a33360db9c4662))
* When `lesshint` fails for some reason, the currently checked file is now included in the output. ([b783f9c](https://github.com/lesshint/lesshint/commit/b783f9c816b4673e976da90b5a364da6ffc8b74c))
* Fixed an issue where `duplicateProperty` would erroneously report properties using the Less merge feature. ([317a7af](https://github.com/lesshint/lesshint/commit/317a7afc0782f239ba20317b2946ab9e1437e0e0))
* Fixed an issue where `newlineAfterBlock` would give false positives with lines containing trailing whitespace.
([ed2c9f6](https://github.com/lesshint/lesshint/commit/ed2c9f6df2811d696067bf5f29fdde19a53a4467))
* Fixed an issue `stringQuotes` would erroneously report some at-rules. ([5f1a2b6](https://github.com/lesshint/lesshint/commit/5f1a2b6d0bb00c6d94369d18bc7da19e32831803))
* Fixed a typo in the "Unknown error" output. ([059e162](https://github.com/lesshint/lesshint/commit/059e162e52c6008a276d596731bc37e8b008a337))
* Fixed a typo in the CLI flags documentation. ([a77fca0](https://github.com/lesshint/lesshint/commit/a77fca09b024356c09086adec86d2bce01118d42))

## 2.1.1 (2016-09-11)
* Fixed a false positive in `newlineAfterBlock` with nested blocks. ([e64c360](https://github.com/lesshint/lesshint/commit/e64c3600abcaef740d04c3154d074accc39395af))
* Fixed an issue where `singleLinePerSelector` would report the same selector multiple times. ([507e89](https://github.com/lesshint/lesshint/commit/507e89a3bb02e5789126221cd1cbca24a037b18b))
* Fixed an issue in `spaceBeforeBrace` where indented blocks would be erroneously reported with the `new_line` setting. ([45d166e](https://github.com/lesshint/lesshint/commit/45d166e250a81338ce0aeb0d36c3d9cf589d72df))
* Fixed an issue in `spaceBeforeBrace` where the `one_space` option would erroneously allow other spaces than just a single one. ([45d166e](https://github.com/lesshint/lesshint/commit/45d166e250a81338ce0aeb0d36c3d9cf589d72df))
* Removed old `spaceBeforeComma` setting in the default config. ([d7bb4f6](https://github.com/lesshint/lesshint/commit/d7bb4f6a0021aa6c1d9e83edacd261519d9a3b97))

## 2.1.0 (2016-09-02)
* Added `maxCharPerLine` linter. ([af69e95](https://github.com/lesshint/lesshint/commit/af69e9545ac8fc89ff508064741d77e21e29c926))
* Added `newlineAfterBlock` linter. ([05d48e1](https://github.com/lesshint/lesshint/commit/05d48e1500a4b0e95b3cceee3d5b137c116a472e))
* Fixed an issue where `stringQuotes` wouldn't check at-rules. ([aaf1d84](https://github.com/lesshint/lesshint/commit/aaf1d847cc34c20b48903bc65d03202ebfdf90fc))
* Fixed an issue where `spaceBetweenParens` would report the wrong line. ([fa6ff41](https://github.com/lesshint/lesshint/commit/fa6ff41917744af62e418dfb8489901dfcfde37c))
* Added tests for failing linter plugins. ([02aeef0](https://github.com/lesshint/lesshint/commit/02aeef0c06f9f2f43f0b885b2b845ba928b41835))
* Added some examples on how to use `lesshint` from custom code. ([0a87b24](https://github.com/lesshint/lesshint/commit/0a87b24a41e5c4f111493a54aa04d2256f1908b9))

## 2.0.3 (2016-08-09)
* Fixed an issue where `importPath` wouldn't handle [Less import options](http://lesscss.org/features/#import-options). ([dc099ee](https://github.com/lesshint/lesshint/commit/dc099eeb8bc11db07e487b01fd3f15245eb1bccc))
* Fixed two issues where `urlFormat` and `urlQuotes` wouldn't report multiple URLs in the same declaration. ([ec5bd4a](https://github.com/lesshint/lesshint/commit/ec5bd4a46c0c9ee4f4ddb6779bc8bbe4e762f7cf))
* Updated `gulp-mocha` to `3.x`. ([28c80b8](https://github.com/lesshint/lesshint/commit/28c80b86a3ad42888f019c20e3be0c14fd555747))

## 2.0.2 (2016-07-31)
* Fixed an issue where the wrong line was reported in `decimalZero`. ([e0c8e94](https://github.com/lesshint/lesshint/commit/e0c8e942fcf7bd0a741e24e3b26aa1a953400d59))
* Removed unnecessary `gulp-debug-finder` dependency. ([967968b](https://github.com/lesshint/lesshint/commit/967968bd75a916581517cf85fb97e7725560b317))
* Bumped `postcss-values-parser` to `0.1.7` and added tests for a bug fixed there. ([22e11eb](https://github.com/lesshint/lesshint/commit/22e11eb0b76dfd8fc5e806b9bb35aaea6a1ee765))
* Fixed some broken tests. ([44b542f](https://github.com/lesshint/lesshint/commit/44b542fdf5f3c0ed8bf6380f871203d20673575f))

## 2.0.1 (2016-07-25)
* Fixed an issue where `finalNewline` and `trailingWhitespace` weren't called. ([6386b4c](https://github.com/lesshint/lesshint/commit/6386b4c846e5bbb5aa9ba834a78f3a3fb0241925))

## 2.0.0 (2016-07-13)
* Added the possibility to use custom linters. ([97e7268](https://github.com/lesshint/lesshint/commit/97e7268f639dfe956cf337885fdd44de2ac61982))
* Added a `allowNewline` option to `spaceAroundComma`. ([1cb009a](https://github.com/lesshint/lesshint/commit/1cb009a1487c3f609bac6bdc65a8b4ae2f502d32))
* Made a small behavioral change in decimalZero where it now only checks if there's always/never a leading/trailing decimal number.
([95e8037](https://github.com/lesshint/lesshint/commit/95e8037250bca1c09d74b282351ab8915fb0ea7b))
* Fixed an issue where `qualifyingElement` would report `&.classname`. ([af37172](https://github.com/lesshint/lesshint/commit/af371726ca47e073cfe38ab54e2e2b95fd606a10))
* Fixed an issue where `spaceBetweenParens` would fail on mulitiline definitions. ([846ebb0](https://github.com/lesshint/lesshint/commit/846ebb02c8f7310885e90c6e81dc117969de0a13))
* Fixed an issue where `decimalZero` would erroneously report whole numbers when `style` was `none`.
([b46be32](https://github.com/lesshint/lesshint/commit/b46be32dc5653915006e3e62ef924d29d84b5ecf))
* Fixed a ton of other bugs found after the parser back-end switch. ([Full diff from `2.0.0-rc1`](https://github.com/lesshint/lesshint/compare/v2.0.0-rc...v2.0.0))

## 2.0.0-rc1 (2016-05-16)
* Completely new parser back-end, using PostCSS. Please report any issues! ([1894408](https://github.com/lesshint/lesshint/commit/18944083bbd69dc0f3d607f24617732a15093e2e))
* Removed support for old reporter style. ([49a2dba](https://github.com/lesshint/lesshint/commit/49a2dbaede9dd2e73fc035f60a80d09bdbaf25f6))
* Added a `Lesshint.getReporter()` method for loading of reporters using `lesshint`'s logic. ([6fc0041](https://github.com/lesshint/lesshint/commit/6fc0041aa42c8cfac9aadb0d671e88cf37d153b5))
* Fixed an issue where paths would sometimes include double slashes. ([0a197db](https://github.com/lesshint/lesshint/commit/0a197dbaac095b281d5084686bdd87d024cdb151))

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
