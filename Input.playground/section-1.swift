var doubles: [Double] = [1,2,3.5];
println(doubles);

var d2 = doubles.map({
    (a: Double) -> Double in
    return a+100
});

println(d2);
