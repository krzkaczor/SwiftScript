var util = require('util');
var fs = require("fs");
require("./SwiftScript/translate");


var input = fs.readFileSync("input.swift", "utf8");

var SwiftAst = require("SwiftAST/SwiftAST/SwiftAst"); //@todo :)
var swiftAst = new SwiftAst();
var ast = swiftAst.ast(input);

var translated = ast.translate();
if (ast) {
  console.log("AST:");
  translated.removeScopes();
  console.log(util.inspect(translated, { depth: null }));
}
