var util = require('util');
var fs = require("fs");
require("./SwiftScript/translate");

global.NL = require('os').EOL;

var input = fs.readFileSync("input.swift", "utf8");

var SwiftAst = require("SwiftAST/SwiftAST/SwiftAst"); //@todo :)
var swiftAst = new SwiftAst();
var ast = swiftAst.ast(input);

if (ast) {
  console.log("INPUT:");
  ast.removeScopes();
  console.log(util.inspect(ast, { depth: null }));

  console.log("OUTPUT:");

  var translated = ast.translate();
  console.log(translated);
}