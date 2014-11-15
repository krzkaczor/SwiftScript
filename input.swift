class Matrix {
    var a = 0;
    var b = 0;
    
    init(a: Int, b: Int) {
        self.a = a;
        self.b = b;
    }
    
    func swap() {
        let tmp = self.a;
        self.a = self.b;
        self.b = tmp;
    }
    
}

let m = Matrix(a:5,b:10);
m.swap();