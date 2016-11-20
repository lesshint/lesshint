/*eslint no-console: 0*/

'use strict';

module.exports = {
    name: 'json',
    report: function report (results) {
        console.log(JSON.stringify(results));
    }
};
