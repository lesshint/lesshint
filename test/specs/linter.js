'use strict';

const Linter = require('../../lib/linter');
const expect = require('chai').expect;
const path = require('path');
const fs = require('fs');

describe('linter', function () {
    const readFileSync = function (filePath) {
        return fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf8')
            .replace(/\r\n|\r|\n/g, '\n'); // Normalize line endings
    };

    describe('lint', function () {
        it('should return array of errors', function () {
            const source = '.foo{ color:red; }\n';
            const testPath = 'test.less';
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

            const linter = new Linter(source, testPath, config);
            const result = linter.lint();

            expect(result).to.have.length(2);
        });

        it('should handle all sorts of line endings (#40)', function () {
            const source = '.foo {\r\n margin-right:10px; }\r\n';
            const testPath = path.resolve(process.cwd(), 'test.less');
            const expected = [{
                column: 15,
                file: 'test.less',
                fullPath: testPath,
                line: 2,
                linter: 'spaceAfterPropertyColon',
                message: 'Colon after property name should be followed by one space.',
                position: 22,
                severity: 'warning',
                source: ' margin-right:10px; }'
            }];

            const config = {
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            const linter = new Linter(source, testPath, config);
            const result = linter.lint();

            expect(result).to.deep.equal(expected);
        });

        it('should pass the filename to the errors list', function () {
            const source = '.foo{ color: red; }\n';
            const testPath = path.resolve(process.cwd(), './path/to/file.less');
            const expected = [{
                column: 5,
                file: 'file.less',
                fullPath: testPath,
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

            const linter = new Linter(source, testPath, config);
            const result = linter.lint();

            expect(result).to.deep.equal(expected);
        });

        it('should sort results by column and line number', function () {
            const source = '[type="text"], [type=email] {\nmargin-right: 10px;\ncolor: red;\ncolor: blue;\n}';
            const testPath = path.resolve(process.cwd(), './path/to/file.less');
            const expected = [
                {
                    column: 7,
                    file: 'file.less',
                    fullPath: testPath,
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
                    fullPath: testPath,
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
                    fullPath: testPath,
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
                    fullPath: testPath,
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

            const linter = new Linter(source, testPath, config);
            const result = linter.lint();

            expect(result).to.deep.equal(expected);
        });

        it('should not call disabled linters', function () {
            const source = '.foo{}';
            const testPath = 'test.less';
            const config = {
                spaceBeforeBrace: {
                    enabled: false
                }
            };

            const linter = new Linter(source, testPath, config);
            const result = linter.lint();

            expect(result).to.have.length(0);
        });

        it('should not call linters disabled via shorthand', function () {
            const source = '.foo{}';
            const testPath = 'test.less';
            const config = {
                spaceBeforeBrace: false
            };

            const linter = new Linter(source, testPath, config);
            const result = linter.lint();

            expect(result).to.have.length(0);
        });

        it('should not call linter for unwanted node types', function () {
            const source = '.foo {}';
            const testPath = 'test.less';
            const config = {
                stringQuotes: true
            };

            const linter = new Linter(source, testPath, config);
            const result = linter.lint();

            // String quotes should never be called since there no strings in the input
            expect(result).to.have.length(0);
        });

        it('should allow override of result severity', function () {
            const source = '.foo { color:red; }\n';
            const testPath = path.resolve(process.cwd(), 'test.less');
            const expected = [{
                column: 14,
                file: 'test.less',
                fullPath: testPath,
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

            const linter = new Linter(source, testPath, config);
            const result = linter.lint();

            expect(result).to.deep.equal(expected);
        });

        it('should honor inline configuration comments', function () {
            const testPath = path.resolve(process.cwd(), './test/data/inline-options/file-options.less');
            const source = readFileSync('./test/data/inline-options/file-options.less');
            const expected = [{
                column: 1,
                file: 'file-options.less',
                fullPath: testPath,
                line: 11,
                linter: 'emptyRule',
                message: "There shouldn't be any empty rules present.",
                position: 119,
                severity: 'warning',
                source: '.baz {'
            }];

            const config = {
                emptyRule: true,
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            const linter = new Linter(source, testPath, config);
            const result = linter.lint();

            expect(result).to.deep.equal(expected);
        });

        it('should allow inline disabling/enabling of all rules', function () {
            const testPath = path.resolve(process.cwd(), './test/data/inline-options/file-options-all.less');
            const source = readFileSync('./test/data/inline-options/file-options-all.less');
            const expected = [{
                column: 1,
                file: 'file-options-all.less',
                fullPath: testPath,
                line: 11,
                linter: 'universalSelector',
                message: "The universal selector shouldn't be used.",
                position: 75,
                severity: 'warning',
                source: '* {'
            }];

            const config = {
                emptyRule: true,
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'one_space'
                },
                universalSelector: true
            };

            const linter = new Linter(source, testPath, config);
            const result = linter.lint();

            expect(result).to.deep.equal(expected);
        });

        it('should honor single line inline configuration comments', function () {
            const testPath = path.resolve(process.cwd(), './test/data/inline-options/line-options.less');
            const source = readFileSync('./test/data/inline-options/line-options.less');
            const expected = [
                {
                    column: 5,
                    file: 'line-options.less',
                    fullPath: testPath,
                    line: 6,
                    linter: 'spaceBeforeBrace',
                    message: 'Opening curly brace should be preceded by one space.',
                    position: 76,
                    severity: 'warning',
                    source: '.bar{'
                },
                {
                    column: 17,
                    file: 'line-options.less',
                    fullPath: testPath,
                    line: 8,
                    linter: 'spaceAfterPropertyColon',
                    message: 'Colon after property name should be followed by one space.',
                    position: 159,
                    severity: 'warning',
                    source: '    margin-left:10px;'
                }
            ];

            const config = {
                hexLength: {
                    enabled: true,
                    style: 'long'
                },
                hexNotation: {
                    enabled: true,
                    style: 'lowercase'
                },
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'one_space'
                },
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                },
                universalSelector: true
            };

            const linter = new Linter(source, testPath, config);
            const result = linter.lint();

            expect(result).to.deep.equal(expected);
        });

        it('should enable all disabled rules even when no rules to enable are specified', function () {
            const testPath = path.resolve(process.cwd(), './test/data/inline-options/disable-enable-all.less');
            const source = readFileSync('./test/data/inline-options/disable-enable-all.less');
            const expected = [{
                column: 1,
                file: 'disable-enable-all.less',
                fullPath: testPath,
                line: 7,
                linter: 'idSelector',
                message: 'Selectors should not use IDs.',
                position: 82,
                severity: 'warning',
                source: '#bar {'
            }];

            const config = {
                idSelector: {
                    enabled: true,
                    exclude: []
                }
            };

            const linter = new Linter(source, testPath, config);
            const result = linter.lint();

            expect(result).to.deep.equal(expected);
        });

        it('should report invalid inline configuration comments', function () {
            const testPath = path.resolve(process.cwd(), './test/data/inline-options/options-invalid.less');
            const source = readFileSync('./test/data/inline-options/options-invalid.less');
            const expected = [{
                column: 1,
                file: 'options-invalid.less',
                fullPath: testPath,
                line: 1,
                linter: 'parse error',
                message: 'Invalid inline configuration comment: "lesshint-disbale foobar"',
                severity: 'error'
            }];

            const config = {};

            const linter = new Linter(source, testPath, config);
            const result = linter.lint();

            expect(result).to.deep.equal(expected);
        });

        it('should only care about the first inline comment (old style)', function () {
            const testPath = path.resolve(process.cwd(), './test/data/old-inline-options/file-options-enabled.less');
            const source = readFileSync('./test/data/old-inline-options/file-options-enabled.less');
            const expected = [{
                column: 5,
                file: 'file-options-enabled.less',
                fullPath: testPath,
                line: 6,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should be preceded by one space.',
                position: 90,
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

            const linter = new Linter(source, testPath, config);
            const result = linter.lint();

            expect(result).to.deep.equal(expected);
        });

        it('should not report rules that are disabled inline (old style)', function () {
            const testPath = path.resolve(__dirname, './test/data/old-inline-options/file-options-enabled.less');
            const source = readFileSync('./test/data/old-inline-options/file-options-enabled.less');
            const expected = [{
                column: 5,
                file: 'file-options-enabled.less',
                fullPath: testPath,
                line: 6,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should be preceded by one space.',
                position: 90,
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

            const linter = new Linter(source, testPath, config);
            const result = linter.lint();

            expect(result).to.deep.equal(expected);
        });

        it('should allow disabled rules to be enabled inline (old style)', function () {
            const testPath = path.resolve(__dirname, './test/data/old-inline-options/file-options-disabled.less');
            const source = readFileSync('./test/data/old-inline-options/file-options-disabled.less');
            const expected = [{
                column: 11,
                file: 'file-options-disabled.less',
                fullPath: testPath,
                line: 3,
                linter: 'spaceAfterPropertyColon',
                message: 'Colon after property name should be followed by one space.',
                position: 110,
                severity: 'warning',
                source: '    color:red;'
            }, {
                column: 1,
                file: 'file-options-disabled.less',
                fullPath: testPath,
                line: 6,
                linter: 'emptyRule',
                message: "There shouldn't be any empty rules present.",
                position: 118,
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

            const linter = new Linter(source, testPath, config);
            const result = linter.lint();

            expect(result).to.deep.equal(expected);
        });

        it('should not report rules that are disabled on a single line (old style)', function () {
            const testPath = path.resolve(__dirname, './test/data/old-inline-options/line-options.less');
            const source = readFileSync('./test/data/old-inline-options/line-options.less');
            const expected = [{
                column: 5,
                file: 'line-options.less',
                fullPath: testPath,
                line: 5,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should be preceded by one space.',
                position: 65,
                severity: 'warning',
                source: '.bar{'
            }];

            const config = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            const linter = new Linter(source, testPath, config);
            const result = linter.lint();

            expect(result).to.deep.equal(expected);
        });

        it('should report invalid inline options (old style)', function () {
            const source = readFileSync('./test/data/old-inline-options/options-invalid.less');

            expect(function () {
                const linter = new Linter(source, 'options-invalid.less', {});

                linter.lint();
            }).to.throw('Invalid inline option on line 1');
        });

        it('reports positions after multiple consecutive endline characters', function () {
            const testPath = path.resolve(__dirname, './test/data/endlines.less');
            const source = readFileSync('./test/data/endlines.less');
            const expected = [{
                column: 5,
                file: 'endlines.less',
                fullPath: testPath,
                line: 10,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should be preceded by one space.',
                position: 58,
                severity: 'warning',
                source: '.baz{'
            }];

            const config = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            const linter = new Linter(source, testPath, config);
            const result = linter.lint();

            expect(result).to.deep.equal(expected);
        });

        it('should not report comma spaces for selectors that have pseudos', function () {
            const source = '.foo,\n.bar:not(.foo){}';
            const testPath = 'test.less';

            const linter = new Linter(source, testPath, {});
            const result = linter.lint(source, testPath, {});

            expect(result).to.have.length(0);
        });

        it('should throw if a linter does not return an array', function () {
            const source = '// foo\n';
            const config = {
                linters: ['../test/plugins/noArrayLinter'],
                noArray: true
            };

            expect(function () {
                const linter = new Linter(source, 'test.less', config);

                linter.lint();
            }).to.throw('Linter "noArray" must return an array.');
        });

        it('should load a custom linter (as a require path)', function () {
            const source = '// boo!\n';
            const testPath = path.resolve(process.cwd(), 'test.less');
            const config = {
                linters: ['../test/plugins/sampleLinter'],
                sample: true
            };

            const expected = [{
                column: 1,
                file: 'test.less',
                fullPath: testPath,
                line: 1,
                linter: 'sample',
                message: 'Sample error.',
                position: 0,
                severity: 'warning',
                source: source.trim()
            }];

            const linter = new Linter(source, testPath, config);
            const result = linter.lint();

            expect(result).to.deep.equal(expected);
        });

        it('should load a custom linter (as require path relative to .lesshintrc)', function () {
            const source = '// boo!\n';
            const testPath = path.resolve(process.cwd(), 'test.less');
            const config = {
                configPath: '../test/.lesshintrc',
                linters: ['plugins/sampleLinter'],
                sample: true
            };

            const expected = [{
                column: 1,
                file: 'test.less',
                fullPath: testPath,
                line: 1,
                linter: 'sample',
                message: 'Sample error.',
                position: 0,
                severity: 'warning',
                source: source.trim()
            }];

            const linter = new Linter(source, testPath, config);
            const result = linter.lint();

            expect(result).to.deep.equal(expected);
        });

        it('should load a custom linter (as a passed linter)', function () {
            const source = '// boo!\n';
            const testPath = path.resolve(process.cwd(), 'test.less');
            const config = {
                linters: [require('../plugins/sampleLinter')],
                sample: true
            };

            const expected = [{
                column: 1,
                file: 'test.less',
                fullPath: testPath,
                line: 1,
                linter: 'sample',
                message: 'Sample error.',
                position: 0,
                severity: 'warning',
                source: source.trim()
            }];

            const linter = new Linter(source, testPath, config);
            const result = linter.lint();

            expect(result).to.deep.equal(expected);
        });
    });

    describe('configure', function () {
        it('should throw on invalid "linters" value', function () {
            const config = {
                linters: 'invalid'
            };

            expect(function () {
                new Linter('', '', config);
            }).to.throw('Linters should be an array of file paths and/or linters');
        });
    });
});
