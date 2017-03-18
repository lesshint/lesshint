'use strict';

const path = require('path');

class LesshintError extends Error {
    constructor (error, errorPath) {
        super(error);

        errorPath = errorPath || error.path;

        this.message = error.message || error;
        this.name = this.constructor.name;
        this.path = path.resolve(process.cwd(), errorPath);
        this.stack = error.stack;
    }
}

module.exports = LesshintError;
