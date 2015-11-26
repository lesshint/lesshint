'use strict';

var helpers = require('../helpers');
var util = require('util');

module.exports = {
    name: 'duplicateProperty',
    nodeTypes: ['block'],
    message: 'Duplicate property: "%s".',

    lint: function duplicatePropertyLinter (config, node) {
        var properties = [];
        var results = [];
        var self = this;

        node.forEach('declaration', function (declaration) {
            var property = declaration.first('property');

            property = helpers.ensureObject(property.first('ident'));

            if (properties.indexOf(property.content) !== -1) {
                results.push({
                    message: util.format(self.message, property.content),
                    column: property.start && property.start.column,
                    line: property.start && property.start.line
                });
            }

            if (config.exclude.indexOf(property.content) === -1) {
                properties.push(property.content);
            }
        });

        if (results.length) {
            return results;
        }
    }
};
