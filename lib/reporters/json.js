/*eslint no-console: 0*/

'use strict';

module.exports = {
    name: 'json',
    report: function report (results) {
        results.forEach(function (result) {
            console.log(JSON.stringify(result));
        });
    }
};
