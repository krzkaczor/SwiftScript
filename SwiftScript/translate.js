(function() {
  var nodes = require("SwiftAST/SwiftAST/builder/nodes");

  nodes.TopLevelBlock.prototype.translate = function() {
    return this;
  }
})();