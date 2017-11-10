'use strict';

const util = require('util');

module.exports = {
    name: 'spaceAroundBang',
    nodeTypes: ['decl', 'rule'],
    message: 'Exclamation marks should%s be %s by %s space.',

    lint: function spaceAroundCommaLinter (config, node) {
        let important;

        if (node.important && node.raws.important) {
            important = node.raws.important;
        } else if (node.important) {
            important = ' !important';
        } else {
            return;
        }

        let message;

        switch (config.style) {
            case 'after':
                if (important !== '! important') {
                    message = util.format(this.message, '', 'followed', 'one');
                }

                break;
            case 'before':
                if (important !== ' !important') {
                    message = util.format(this.message, '', 'preceded', 'one');
                }

                break;
            case 'both':
                if (important !== ' ! important') {
                    message = util.format(this.message, '', 'preceded and followed', 'one');
                }

                break;
            case 'none':
                if (important !== '!important') {
                    message = util.format(this.message, ' not', 'preceded nor followed', 'any');
                }

                break;
            default:
                throw new Error(`Invalid setting value for spaceAroundBang: ${ config.style }`);
        }

        if (message) {
            const position = node.positionBy({
                word: important.trim()
            });

            return [{
                column: position.column,
                line: position.line,
                message: message
            }];
        }
    }
};
