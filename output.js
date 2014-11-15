(function() {


  class Matrix {
    constructor(a,b) {
      this.a = a;
      this.b = b;
    }


    swap() {
      let tmp = a;
      this.a = b;
      this.b = tmp;
    }
  }

  let m = new Matrix(5,10);
  m.swap()
})()