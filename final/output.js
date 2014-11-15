(function() {
  var Matrix = function Matrix(a, b) {
    "use strict";
    this.a = a;
    this.b = b;
  };
  ($traceurRuntime.createClass)(Matrix, {swap: function() {
      "use strict";
      var tmp = a;
      this.a = b;
      this.b = tmp;
    }}, {});
  var m = new Matrix(5, 10);
  m.swap();
})();
