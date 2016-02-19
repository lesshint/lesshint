'use strict';
/*
depthLevel

Sets the depth of nested styles in every parent style.

Option Description
depth   1-n, 3(default)

Invalid (depth 3)
.foo {
    margin-right: 0;
    .foo-2 {
      color: red;
      .foo-3{
        width: 100%;
        .foo-4{
          height: 100%;
        }
      }
    }
}

Valid

.foo {
    margin-right: 0;
    .foo-2 {
      color: red;
      .foo-3{
        width: 100%;
      }
    }
}
*/
var util = require('util');
/*Validates that a less style wont containt more than 'n' nested styles, identifies the style parent that contains the error
* Uses the Configuracion Param "Depth" for the number of permited levels that a style can be nested inside another style
*/
module.exports = {
    name: 'depthLevel',
    nodeTypes: ['block'],
    message: "There shouldn't be more than '%s' levels deep from the style's parent, check the children's depth.",

    lint: function deepLevelLinter (config, node) {
      let depth = config.depth || 2;
      let error = false;
      node.eachFor('ruleset',function(childNode,i) {
        let levelsTotal = 1;
        levelsTotal = countLevels(childNode, i, levelsTotal);
        if (levelsTotal > depth) {
          error = true;
          return;
        }
      });

      if (error) {
          return [{
              message: util.format(this.message, depth)
          }];
      }
    }
};

/*Checks how many nested classes have every node*/
var countLevels = function (childNode,i, total) {
  total += 1;
  var block = childNode.first('block') || {};
  block.eachFor('ruleset',function(subchildNode,i) {
    total = countLevels(subchildNode, i, total);
  });
  return total;
};
