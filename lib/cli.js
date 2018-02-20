'use strict';

const Runner = require('./runner');

module.exports = (program) => {
    const runner = new Runner(program);

    return runner.run();
};
