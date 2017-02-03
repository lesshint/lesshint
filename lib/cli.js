'use strict';

const Runner = require('./runner');

module.exports = function (program) {
    const runner = new Runner(program);

    return runner.run();
};
