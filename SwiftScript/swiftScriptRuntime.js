function print(s) {
  console.log(s);
}

function println(s) {
  console.log(s);
}

Array.prototype.append = function(e) {
  this.push(e);
}