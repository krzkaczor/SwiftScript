class Matrix {
    let values: [Double]
    let rows: Int
    let cols: Int
    
    init(cols:Int, rows: Int, values : [Double]){
        self.cols = cols
        self.rows = rows
        self.values = values
    }
    
    func add(other: Matrix) -> Matrix {
        var result : [Double] = []
        let count = self.values.count
        for i in 0..<count {
            result.append(self.values[i] + other.values[i]);
        }
        
        return Matrix(cols:self.cols, rows:self.rows, values:result)
    }
    
    func subtract(other: Matrix) -> Matrix {
        var result : [Double] = []
        let count = self.values.count
        
        for i in 0..<count {
            result.append(self.values[i] - other.values[i]);
        }
        
        return Matrix(cols:self.cols, rows:self.rows, values:result)
    }
}

