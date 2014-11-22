(function() {
  var nodes = require("SwiftAST/SwiftAST/builder/nodes");

  nodes.TopLevelBlock.prototype.translate = function() {
    return "{0}".format(this.statements.map(function(s) {return s.translate()}).join("\n"));
  };

  nodes.VariableDeclaration.prototype.translate = nodes.ConstantDeclaration.prototype.translate = function() {
    if (this.expression)
      return "let {0} = {1};".format(this.pattern.translate(), this.expression.translate());
    else
      return "let {0};".format(this.pattern.translate());
  };

  nodes.ArrayLiteral.prototype.translate = function() {
    return "[{0}]".format((this.elements?this.elements:[]).map(function(e) {
      return e.translate();
    }));
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

  nodes.StringLiteral.prototype.translate = function() {
    return '"{0}"'.format(this.value);
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

  nodes.OperatorCall.prototype.translate = function() {
    var left = this.left.translate();  //... 3 hours till presentations
    if (left.endsWith && left.endsWith(".values")) {
      left += "[i]";
    }
    var right = this.right.translate();
    if (right.endsWith && right.endsWith(".values")) {
      right += "[i]";
    }
    return "{0} {1} {2}".format(left,this.operator, right);
  };

  nodes.ClassDeclaration.prototype.translate = function() {
    this.rewrite();
    return ("export class {0} {\n" +
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

  nodes.ClosureExpression.prototype.translate = function() {
    return "function({0}) {1}".format(this.parameters.map(function(p) {
      return p.translate();
    }), this.block.translate());
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

  nodes.ReturnStatement.prototype.translate = function() {
    return "return {0}".format(this.expression.translate());
  }

  nodes.ForInLoop.prototype.translate = function() {
    if (this.iteratorExpr.operator == "..<") {
      //translate it just like common for loop
      return "for({0}; {1} && {2};{3}++) {4}".format(
          "var {0} = {1}".format(this.iteratorId.translate(), this.iteratorExpr.left.translate()),
          "{0} < {1}".format(this.iteratorId.translate(), this.iteratorExpr.right.translate()),
          "{0} >= {1}".format(this.iteratorId.translate(), this.iteratorExpr.left.translate()),
          this.iteratorId.translate(),
          this.block.translate()
      );
    }
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
    //if (this.scope && !this.scope.silentResolve(this.value, true)) {
    //  this.value = "this." + this.value; //enough for hackathon XD
    //};
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
    if (this.callee.value == "Matrix")  //3.5h till presentations...
      this.callee.type.isConstructor = true;
    if (this.callee.type && this.callee.type.isConstructor)
      return "new {0}{1}".format(this.value, this.args.translate());
    else
      return "{0}{1}".format(this.value, this.args.translate());
  };

  nodes.FunctionCall.prototype.rewrite = function() {
    this.args.isArgs = true;
  }

})();