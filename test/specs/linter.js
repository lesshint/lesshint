'use strict';

const expect = require('chai').expect;
const path = require('path');
const fs = require('fs');

describe('linter', function () {
    const linter = require('../../lib/linter');

    const readFileSync = function (filePath) {
        return fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf8')
            .replace(/\r\n|\r|\n/g, '\n'); // Normalize line endings
    };

    describe('lint', function () {
        it('should return array of errors', function () {
            const source = '.foo{ color:red; }\n';
            const path = 'test.less';
            const config = {
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'one_space'
                },
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            const results = linter.lint(source, path, config);

            expect(results).to.have.length(2);
        });

        it('should handle all sorts of line endings (#40)', function () {
            const source = '.foo {\r\n margin-right:10px; }\r\n';
            const path = 'test.less';
            const expected = [{
                column: 15,
                file: 'test.less',
                fullPath: 'test.less',
                line: 2,
                linter: 'spaceAfterPropertyColon',
                message: 'Colon after property name should be followed by one space.',
                position: 22,
                severity: 'warning',
                source: ' margin-right:10px; }'
            }];

            const options = {
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            const result = linter.lint(source, path, options);

            expect(result).to.deep.equal(expected);
        });

        it('should pass the filename to the errors list', function () {
            const source = '.foo{ color: red; }\n';
            const path = 'path/to/file.less';
            const expected = [{
                column: 5,
                file: 'file.less',
                fullPath: 'path/to/file.less',
                line: 1,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should be preceded by one space.',
                position: 4,
                severity: 'warning',
                source: '.foo{ color: red; }'
            }];

            const config = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            const result = linter.lint(source, path, config);

            expect(result).to.deep.equal(expected);
        });

        it('should sort results by column and line number', function () {
            const source = '[type="text"], [type=email] {\nmargin-right: 10px;\ncolor: red;\ncolor: blue;\n}';
            const path = 'path/to/file.less';
            const expected = [
                {
                    column: 7,
                    file: 'file.less',
                    fullPath: 'path/to/file.less',
                    line: 1,
                    linter: 'stringQuotes',
                    message: 'Strings should use single quotes.',
                    position: 6,
                    severity: 'warning',
                    source: '[type="text"], [type=email] {'
                },
                {
                    column: 22,
                    file: 'file.less',
                    fullPath: 'path/to/file.less',
                    line: 1,
                    linter: 'attributeQuotes',
                    message: 'Attribute selectors should use quotes.',
                    position: 21,
                    severity: 'warning',
                    source: '[type="text"], [type=email] {'
                },
                {
                    column: 1,
                    file: 'file.less',
                    fullPath: 'path/to/file.less',
                    line: 3,
                    linter: 'propertyOrdering',
                    message: 'Property ordering is not alphabetized',
                    position: 50,
                    severity: 'warning',
                    source: 'color: red;'
                },
                {
                    column: 1,
                    file: 'file.less',
                    fullPath: 'path/to/file.less',
                    line: 4,
                    linter: 'duplicateProperty',
                    message: 'Duplicate property: "color".',
                    position: 62,
                    severity: 'warning',
                    source: 'color: blue;'
                }
            ];

            const config = {
                attributeQuotes: true,
                duplicateProperty: {
                    enabled: true,
                    exclude: []
                },
                propertyOrdering: {
                    enabled: true,
                    style: 'alpha'
                },
                singleLinePerProperty: false,
                stringQuotes: {
                    enabled: true,
                    style: 'single'
                }
            };

            const result = linter.lint(source, path, config);

            expect(result).to.deep.equal(expected);
        });

        it('should not call disabled linters', function () {
            const source = '.foo{}';
            const path = 'test.less';
            const config = {
                spaceBeforeBrace: {
                    enabled: false
                }
            };

            const result = linter.lint(source, path, config);

            expect(result).to.have.length(0);
        });

        it('should not call linters disabled via shorthand', function () {
            const source = '.foo{}';
            const path = 'test.less';
            const config = {
                spaceBeforeBrace: false
            };

            const result = linter.lint(source, path, config);

            expect(result).to.have.length(0);
        });

        it('should not call linter for unwanted node types', function () {
            const source = '.foo {}';
            const path = 'test.less';
            const config = {
                stringQuotes: true
            };

            const result = linter.lint(source, path, config);

            // String quotes should never be called since there no strings in the input
            expect(result).to.have.length(0);
        });

        it('should allow override of result severity', function () {
            const source = '.foo { color:red; }\n';
            const path = 'test.less';
            const expected = [{
                column: 14,
                file: 'test.less',
                fullPath: 'test.less',
                line: 1,
                linter: 'spaceAfterPropertyColon',
                message: 'Colon after property name should be followed by one space.',
                position: 13,
                severity: 'error',
                source: '.foo { color:red; }'
            }];

            const config = {
                spaceAfterPropertyColon: {
                    enabled: true,
                    severity: 'error',
                    style: 'one_space'
                }
            };

            const result = linter.lint(source, path, config);

            expect(result).to.deep.equal(expected);
        });

        it('should only care about the first inline comment', function () {
            const source = readFileSync('./test/data/inline-options/file-options-enabled.less');
            const expected = [{
                column: 5,
                file: 'file-options-enabled.less',
                fullPath: 'file-options-enabled.less',
                line: 6,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should be preceded by one space.',
                position: 95,
                severity: 'warning',
                source: '.bar{'
            }];

            const config = {
                emptyRule: true,
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'one_space'
                },
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            const result = linter.lint(source, 'file-options-enabled.less', config);

            expect(result).to.deep.equal(expected);
        });

        it('should not report rules that are disabled inline', function () {
            const source = readFileSync('./test/data/inline-options/file-options-enabled.less');
            const expected = [{
                column: 5,
                file: 'rule-options.less',
                fullPath: 'rule-options.less',
                line: 6,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should be preceded by one space.',
                position: 95,
                severity: 'warning',
                source: '.bar{'
            }];

            const config = {
                emptyRule: true,
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'one_space'
                },
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            const result = linter.lint(source, 'rule-options.less', config);

            expect(result).to.deep.equal(expected);
        });

        it('should allow disabled rules to be enabled inline', function () {
            const source = readFileSync('./test/data/inline-options/file-options-disabled.less');
            const expected = [{
                column: 11,
                file: 'rule-options.less',
                fullPath: 'rule-options.less',
                line: 3,
                linter: 'spaceAfterPropertyColon',
                message: 'Colon after property name should be followed by one space.',
                position: 110,
                severity: 'warning',
                source: '    color:red;'
            }, {
                column: 1,
                file: 'rule-options.less',
                fullPath: 'rule-options.less',
                line: 6,
                linter: 'emptyRule',
                message: "There shouldn't be any empty rules present.",
                position: 124,
                severity: 'warning',
                source: '.bar {'
            }];

            const config = {
                emptyRule: {
                    enabled: false
                },
                spaceAfterPropertyColon: {
                    enabled: false
                }
            };

            const result = linter.lint(source, 'rule-options.less', config);

            expect(result).to.deep.equal(expected);
        });

        it('should not report rules that are disabled on a single line', function () {
            const source = readFileSync('./test/data/inline-options/line-options.less');
            const expected = [{
                column: 5,
                file: 'line-options.less',
                fullPath: 'line-options.less',
                line: 5,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should be preceded by one space.',
                position: 70,
                severity: 'warning',
                source: '.bar{'
            }];

            const config = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            const result = linter.lint(source, 'line-options.less', config);

            expect(result).to.deep.equal(expected);
        });

        it('should report invalid inline options', function () {
            const source = readFileSync('./test/data/inline-options/options-invalid.less');

            expect(function () {
                linter.lint(source, 'options-invalid.less', {});
            }).to.throw('Invalid inline option on line 1');
        });

        it('should not report comma spaces for selectors that have pseudos', function () {
            const source = '.foo,\n.bar:not(.foo){}';
            const path = 'test.less';
            const result = linter.lint(source, path, {});

            expect(result).to.have.length(0);
        });

        it('should load a custom linter (as a require path)', function () {
            const source = '// boo!\n';
            const path = 'test.less';
            const config = {
                linters: ['../test/plugins/sampleLinter'],
                sample: true
            };

            const expected = [{
                column: 1,
                file: 'test.less',
                fullPath: 'test.less',
                line: 1,
                linter: 'sample',
                message: 'Sample error.',
                position: 0,
                severity: 'warning',
                source: source.trim()
            }];

            const result = linter.lint(source, path, config);

            expect(result).to.deep.equal(expected);
        });

        it('should load a custom linter (as a passed linter)', function () {
            const source = '// boo!\n';
            const path = 'test.less';
            const config = {
                linters: [require('../plugins/sampleLinter')],
                sample: true
            };

            const expected = [{
                column: 1,
                file: 'test.less',
                fullPath: 'test.less',
                line: 1,
                linter: 'sample',
                message: 'Sample error.',
                position: 0,
                severity: 'warning',
                source: source.trim()
            }];

            const result = linter.lint(source, path, config);

            expect(result).to.deep.equal(expected);
        });
    });

    describe('getParser', function () {
        it('should return a parser promise', function () {
            const source = '.foo { color: red; }';
            const parser = linter.getParser(source);

            expect(parser).to.have.property('then'); // If the returned object has a 'then' method, we'll consider it a success
        });
    });
});
