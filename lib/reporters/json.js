'use strict';

module.exports = {
    name: 'json',
    report: function report (results, logger) {
        logger.log(JSON.stringify(results));
    }
};
