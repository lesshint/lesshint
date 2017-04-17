'use strict';

module.exports = {
    name: 'mixinOrdering',
    // for some reason, gonzales-pe labels mixins as 'include'
    nodeTypes: ['block', 'include'],
    message: 'Mixins should be called %s other properties are declared.',

    lint: function propertyOrderingLinter (config, node) {
        var findIndex = require('lodash.findindex');
        var previousProp = null;
        var results = null;
        var self = this;
        var sprintf = require('sprintf-js').sprintf;
        var properties = [];
        var mixinIndex = -1;
        var location = config.style === 'first' ? 'before' : 'after';
        var found = [];

        // Only support alpha for now
        if (config.style !== 'first' && config.style !== 'last') {
            throw new Error(
                'Invalid setting value for mixinOrdering: ' + config.style
            );
        }

        node.content.forEach(function (element) {
            var property;
            var char;

            if (element.type === 'declaration') {
                property = element.first('property').first('ident');

                if (!property || !property.content) {
                    return;
                }

                char = property.content.toLowerCase().trim().substring(0, 1);
            } else if (element.type === 'include') {
                property = element.first('class');
                // gonzales-pe removes the leading dot
                // we don't care what mixin it is, just that it's one.
                char = '.';
            } else {
                return;
            }

            if (!property) {
                return;
            }

            properties.push({char: char, property: property});
        });

        mixinIndex = findIndex(properties, function (prop) {
            return prop.char === '.';
        });

        if (mixinIndex === -1) {
            return;
        }

        var alphaIndex = -1;

        for (var i = 0; i < properties.length; i++) {
            if (!/^\./.test(properties[i].char)) {
                alphaIndex = i;

                if ((config.style === 'first' && mixinIndex > alphaIndex) ||
                    (config.style === 'last' && mixinIndex < alphaIndex)) {

                    if (found.indexOf(mixinIndex) < 0) {
                        found.push(mixinIndex);
                        results = results || [];
                        results.push({
                            column: properties[mixinIndex].property.start.column,
                            line: properties[mixinIndex].property.start.line,
                            message: sprintf(self.message, location)
                        });
                    }
                }
            } else {
                mixinIndex = i;
            }
        }

        return results;
    }
};
