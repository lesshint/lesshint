/*eslint no-console: 0*/

'use strict';

module.exports = {
    name: 'default',
    report: function report (results) {
        results.forEach((result) => {
            let output = '';

            if (result.severity === 'error') {
                output += 'Error: ';
            } else {
                output += 'Warning: ';
            }

            output += `${ result.file }: `;

            if (result.line) {
                output += `line ${ result.line }, `;
            }

            if (result.column) {
                output += `col ${ result.column }, `;
            }

            output += `${ result.linter }: `;
            output += result.message;

            console.log(output);
        });
    }
};
