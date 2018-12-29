'use strict';

const nodeToString = require('../utils/node-to-string');
const util = require('util');

module.exports = {
    name: 'spaceAroundBang',
    nodeTypes: ['atrule', 'decl'],
    message: 'Exclamation marks should%s be %s by %s space.',

    lint: function spaceAroundBangLinter (config, node) {
        if (!node.important) {
            return;
        }

        const nodeString = nodeToString(node);
        let message;

        switch (config.style) {
            case 'after':
                if (!(/! important$/i.test(nodeString))) {
                    message = util.format(this.message, '', 'followed', 'one');
                }

                break;
            case 'before':
                if (!(/ !important$/i.test(nodeString))) {
                    message = util.format(this.message, '', 'preceded', 'one');
                }

                break;
            case 'both':
                if (!(/ ! important$/i.test(nodeString))) {
                    message = util.format(this.message, '', 'preceded and followed', 'one');
                }

                break;
            case 'none':
                if (!(/[^ ]!important$/i.test(nodeString))) {
                    message = util.format(this.message, ' not', 'preceded nor followed', 'any');
                }

                break;
            default:
                throw new Error(`Invalid setting value for spaceAroundBang: ${ config.style }`);
        }

        if (message) {
            const important = node.raws.important || ' !important';
            const { column, line } = node.positionBy({
                index: nodeString.indexOf(important.trim())
            });

            return [{
                column,
                line,
                message
            }];
        }
    }
};
