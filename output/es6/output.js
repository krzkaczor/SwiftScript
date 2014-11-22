export class Matrix {
constructor(cols,rows,values) {
this.cols = cols;
this.rows = rows;
this.values = values;
}


add(other) {
let result = [];
let length = this.values.length;
for(var i = 0; i < length && i >= 0;i++) {
result.append(this.values[i] + other.values[i])
}

return new Matrix(this.cols,this.rows,result)
}


subtract(other) {
let result = [];
let length = this.values.length;
for(var i = 0; i < length && i >= 0;i++) {
result.append(this.values[i] - other.values[i])
}

return new Matrix(this.cols,this.rows,result)
}
}
