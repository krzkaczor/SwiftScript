(function() {


class Matrix {
constructor(a,b) {
this.a = a;
this.b = b;
}


swap() {
let tmp = this.a;
this.a = this.b;
this.b = tmp;
}
}

let m = new Matrix(5,10);
m.swap()
console.log(m.a);
console.log(m.b);
})()