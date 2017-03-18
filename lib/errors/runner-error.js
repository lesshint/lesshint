'use strict';

class RunnerError extends Error {
    constructor (error, status) {
        super(error);

        this.message = error.message || error;
        this.name = this.constructor.name;
        this.status = status;
        this.stack = error.stack;
    }
}

module.exports = RunnerError;
