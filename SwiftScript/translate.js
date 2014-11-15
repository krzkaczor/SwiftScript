(function() {
  var nodes = require("SwiftAST/SwiftAST/builder/nodes");

  nodes.TopLevelBlock.prototype.translate = function() {
    return "(function() {\n{0};\n}\n)()".format(this.statements.map(function(s) {return s.translate()}).join(";\n"));
  };

  nodes.ConstantDeclaration.prototype.translate = function() {
    return "var {0} = {1}".format(this.pattern.translate(), this.expression.translate());
  };

  nodes.IntegerNumberLiteral.prototype.translate = function() {
    return this.value;
  };

  nodes.DoubleNumberLiteral.prototype.translate = function() {
    return this.value;
  };

  nodes.IdentifierPattern.prototype.translate = function() {
    return this.name;
  };

  nodes.ParenthesizedExpression.prototype.translate = function() {
    var self = this;
    return "{\n{0}\n}".format(this.expressions.map(function(expr, i) {
      return "{0} : {1}".format(self.ids[i]?self.ids[i]:i, expr.translate())
    }).join(",\n"));
  }
})();