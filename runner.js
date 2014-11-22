var util = require('util');
var fs = require("fs");
require("./SwiftScript/translate");
var path = require('path');

global.NL = require('os').EOL;

var input = fs.readFileSync(path.join(__dirname, "Input.playground/section-1.swift"), "utf8");

var SwiftAst = require("SwiftAST/SwiftAST/SwiftAst"); //@todo :)
var swiftAst = new SwiftAst();

var ast = swiftAst.buildAst(input);
attachRuntime(ast);
ast.analyze();

console.log("OUTPUT:");
var translated = afterTranslating(ast.translate());

console.log("INPUT:");
ast.removeScopes();
console.log(util.inspect(ast, {depth: null}));

console.log(translated);

console.log("saving to output dir...");
fs.writeFile(path.join(__dirname,"./output/es6/output.js"), translated, function(err) {
  if (err) {
    console.error("Error: " + err);
  } else {
    console.log("Success!");
  }
});

function afterTranslating(input) {
  return input.replace(/count/g, "length"); //hacksss
}

function attachRuntime(ast) {
  var externalType = require("SwiftAST/SwiftAST/analyzer/typeSystem/externalType");
  var symbols = require("SwiftAST/SwiftAST/analyzer/typeSystem/symbols");

  var builtInTypes = require("SwiftAST/SwiftAST/analyzer/typeSystem/typeSystem").builtInTypes;
  builtInTypes.print = new symbols.FunctionSymbol("print", new externalType());
  builtInTypes.println = new symbols.FunctionSymbol("println", new externalType());
}