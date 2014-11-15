(function() {
  var nodes = require("SwiftAST/SwiftAST/builder/nodes");

  nodes.TopLevelBlock.prototype.translate = function() {
    return "(function() {\n\n\n{0}\n\n})()".format(this.statements.map(function(s) {return s.translate()}).join("\n"));
  };

  nodes.VariableDeclaration.prototype.translate = nodes.ConstantDeclaration.prototype.translate = function() {
    return "let {0} = {1};".format(this.pattern.translate(), this.expression.translate());
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
    if (this.isArgs) {
      return "({0})".format(this.expressions.map(function(expr) {
        return expr.translate();
      }));
    }
    return "{\n{0}\n}".format(this.expressions.map(function(expr, i) {
      return "{0} : {1}".format(self.ids[i]?self.ids[i]:i, expr.translate())
    }).join(",\n"));
  };

  nodes.ClassDeclaration.prototype.translate = function() {
    this.rewrite();
    return ("class {0} {\n" +
        "{1}" +
        "}\n").format(this.name, this.declarations.map(function(decl) {
          return decl.translate();
        }).join("\n\n"));
  };

  nodes.ClassDeclaration.prototype.rewrite = function() {
    this.declarations = this.declarations.filter(function(decl) {
      return decl.CLASS != 'VariableDeclaration' && decl.CLASS != 'ConstantDeclaration';
    }).map(function(decl) {
      decl.isMethod = true;
      return decl;
    });
  };

  nodes.InitializerDeclaration.prototype.translate = function() {
    this.rewrite();
    return "constructor({0}) {1}".format(this.parameters.map(function(param) {
      return param.translate();
    }), this.block.translate());
  };

  nodes.InitializerDeclaration.prototype.rewrite = function() {
    this.type.isConstructor = true;
  }

  nodes.Parameter.prototype.translate = function() {
    return this.name;
  };

  nodes.Block.prototype.translate = function() {
    return "{\n{0}\n}\n".format(this.statements.map(function(stat) {
      return stat.translate();
    }).join("\n"));
  };

  nodes.AssignmentStatement.prototype.translate = function() {
    return "{0} = {1};".format(this.leftExpression.translate(), this.rightExpression.translate());
  };

  nodes.MemberAccess.prototype.translate = function() {
    return "{0}.{1}".format(this.left.translate(), this.right.translate());
  };

  nodes.Id.prototype.translate = function() {
    this.rewrite();
    return this.value;
  };

  nodes.Id.prototype.rewrite = function() {
    if (this.value == "self") {
      this.value = "this";
    }
  };

  nodes.FunctionDeclaration.prototype.translate = function() {
    if (this.isMethod) {
      return "{0}({1}) {2}".format(this.name, this.parameters.map(function(param) {
        return param.translate();
      }), this.block.translate()
      );
    }
  };

  nodes.FunctionCall.prototype.translate = function() {
    this.rewrite();
    if (this.callee.type && this.callee.type.isConstructor)
      return "new {0}{1}".format(this.value, this.args.translate());
    else
      return "{0}{1}".format(this.value, this.args.translate());
  };

  nodes.FunctionCall.prototype.rewrite = function() {
    this.args.isArgs = true;

  }

})();