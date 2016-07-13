'use strict';

var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');

describe('linter', function () {
    var linter = require('../../lib/linter');

    describe('lint', function () {
        it('should return array of errors', function () {
            var source = '.foo{ color:red; }\n';
            var path = 'test.less';
            var results;

            var config = {
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'one_space'
                },
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            results = linter.lint(source, path, config);

            expect(results).to.have.length(2);
        });

        it('should handle all sorts of line endings (#40)', function () {
            var source = '.foo {\r\n margin-right:10px; }\r\n';
            var path = 'test.less';
            var result;

            var expected = [{
                column: 15,
                file: 'test.less',
                fullPath: 'test.less',
                line: 2,
                linter: 'spaceAfterPropertyColon',
                message: 'Colon after property name should be followed by one space.',
                severity: 'warning',
                source: ' margin-right:10px; }'
            }];

            var options = {
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            result = linter.lint(source, path, options);

            expect(result).to.deep.equal(expected);
        });

        it('should pass the filename to the errors list', function () {
            var source = '.foo{ color: red; }\n';
            var path = 'path/to/file.less';
            var result;

            var expected = [{
                column: 5,
                file: 'file.less',
                fullPath: 'path/to/file.less',
                line: 1,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should be preceded by one space.',
                severity: 'warning',
                source: '.foo{ color: red; }'
            }];

            var config = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            result = linter.lint(source, path, config);

            expect(result).to.deep.equal(expected);
        });

        it('should sort results by column and line number', function () {
            var source = '[type="text"], [type=email] {\nmargin-right: 10px;\ncolor: red;\ncolor: blue;\n}';
            var path = 'path/to/file.less';
            var result;

            var expected = [
                {
                    column: 7,
                    file: 'file.less',
                    fullPath: 'path/to/file.less',
                    line: 1,
                    linter: 'stringQuotes',
                    message: 'Strings should use single quotes.',
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
                    severity: 'warning',
                    source: 'color: blue;'
                }
            ];

            var config = {
                attributeQuotes: {
                    enabled: true
                },
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

            result = linter.lint(source, path, config);

            expect(result).to.deep.equal(expected);
        });

        it('should not call disabled linters', function () {
            var source = '.foo{}';
            var path = 'test.less';
            var result;

            var config = {
                spaceBeforeBrace: {
                    enabled: false
                }
            };

            result = linter.lint(source, path, config);

            expect(result).to.have.length(0);
        });

        it('should not call linters disabled via shorthand', function () {
            var source = '.foo{}';
            var path = 'test.less';
            var result;

            var config = {
                spaceBeforeBrace: false
            };

            result = linter.lint(source, path, config);

            expect(result).to.have.length(0);
        });

        it('should not call linter for unwanted node types', function () {
            var source = '.foo {}';
            var path = 'test.less';
            var result;

            var config = {
                stringQuotes: {
                    enabled: true
                }
            };

            result = linter.lint(source, path, config);

            // String quotes should never be called since there no strings in the input
            expect(result).to.have.length(0);
        });

        it('should allow override of result severity', function () {
            var source = '.foo { color:red; }\n';
            var path = 'test.less';
            var result;

            var expected = [{
                column: 14,
                file: 'test.less',
                fullPath: 'test.less',
                line: 1,
                linter: 'spaceAfterPropertyColon',
                message: 'Colon after property name should be followed by one space.',
                severity: 'error',
                source: '.foo { color:red; }'
            }];

            var config = {
                spaceAfterPropertyColon: {
                    enabled: true,
                    severity: 'error',
                    style: 'one_space'
                }
            };

            result = linter.lint(source, path, config);

            expect(result).to.deep.equal(expected);
        });

        it('should only care about the first inline comment', function () {
            var source = fs.readFileSync(path.resolve(process.cwd(), './test/data/inline-options/file-options-enabled.less'), 'utf8');
            var result;

            var expected = [{
                column: 5,
                file: 'file-options-enabled.less',
                fullPath: 'file-options-enabled.less',
                line: 6,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should be preceded by one space.',
                severity: 'warning',
                source: '.bar{'
            }];

            var config = {
                emptyRule: {
                    enabled: true
                },
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'one_space'
                },
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            result = linter.lint(source, 'file-options-enabled.less', config);

            expect(result).to.deep.equal(expected);
        });

        it('should not report rules that are disabled inline', function () {
            var source = fs.readFileSync(path.resolve(process.cwd(), './test/data/inline-options/file-options-enabled.less'), 'utf8');
            var result;

            var expected = [{
                column: 5,
                file: 'rule-options.less',
                fullPath: 'rule-options.less',
                line: 6,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should be preceded by one space.',
                severity: 'warning',
                source: '.bar{'
            }];

            var config = {
                emptyRule: {
                    enabled: true
                },
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'one_space'
                },
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            result = linter.lint(source, 'rule-options.less', config);

            expect(result).to.deep.equal(expected);
        });

        it('should allow disabled rules to be enabled inline', function () {
            var source = fs.readFileSync(path.resolve(process.cwd(), './test/data/inline-options/file-options-disabled.less'), 'utf8');
            var result;

            var expected = [{
                column: 11,
                file: 'rule-options.less',
                fullPath: 'rule-options.less',
                line: 3,
                linter: 'spaceAfterPropertyColon',
                message: 'Colon after property name should be followed by one space.',
                severity: 'warning',
                source: '    color:red;'
            }, {
                column: 1,
                file: 'rule-options.less',
                fullPath: 'rule-options.less',
                line: 6,
                linter: 'emptyRule',
                message: "There shouldn't be any empty rules present.",
                severity: 'warning',
                source: '.bar {'
            }];

            var config = {
                emptyRule: {
                    enabled: false
                },
                spaceAfterPropertyColon: {
                    enabled: false
                }
            };

            result = linter.lint(source, 'rule-options.less', config);

            expect(result).to.deep.equal(expected);
        });

        it('should not report rules that are disabled on a single line', function () {
            var source = fs.readFileSync(path.resolve(process.cwd(), './test/data/inline-options/line-options.less'), 'utf8');
            var result;

            var expected = [{
                column: 5,
                file: 'line-options.less',
                fullPath: 'line-options.less',
                line: 5,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should be preceded by one space.',
                severity: 'warning',
                source: '.bar{'
            }];

            var config = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            result = linter.lint(source, 'line-options.less', config);

            expect(result).to.deep.equal(expected);
        });

        it('should not report comma spaces for selectors that have pseudos', function () {
            var source = '.foo,\n.bar:not(.foo){}';
            var path = 'test.less';
            var result;

            result = linter.lint(source, path, {});

            expect(result).to.have.length(0);
        });

        it('should load a custom linter (as a require path)', function () {
            var source = '// boo!\n';
            var path = 'test.less';
            var result;

            var config = {
                linters: ['../test/plugins/sampleLinter'],
                sample: {
                    enabled: true
                }
            };

            var expected = [{
                column: 1,
                file: 'test.less',
                fullPath: 'test.less',
                line: 1,
                linter: 'sample',
                message: 'Sample error.',
                severity: 'warning',
                source: source.trim()
            }];

            result = linter.lint(source, path, config);

            expect(result).to.deep.equal(expected);
        });

        it('should load a custom linter (as a passed linter)', function () {
            var source = '// boo!\n';
            var path = 'test.less';
            var result;

            var config = {
                linters: [require('../plugins/sampleLinter')],
                sample: {
                    enabled: true
                }
            };

            var expected = [{
                column: 1,
                file: 'test.less',
                fullPath: 'test.less',
                line: 1,
                linter: 'sample',
                message: 'Sample error.',
                severity: 'warning',
                source: source.trim()
            }];

            result = linter.lint(source, path, config);

            expect(result).to.deep.equal(expected);
        });
    });

    describe('getParser', function () {
        it('should return a parser promise', function () {
            var source = '.foo { color: red; }';
            var parser = linter.getParser(source);

            expect(parser).to.have.property('then'); // If the returned object has a 'then' method, we'll consider it a success
        });
    });
});
