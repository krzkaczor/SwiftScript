SwiftScript
===========


###Description

Swift is awesome, expressive language. Why shouldn't you use it for web development? SwiftScript allows you to run your swift code directly in browser by translating it into JavaScript.

There are also awesome possibilities like taking models and business logic from your existing swift project, translating it into JavaScript, build some interface upon that and BOOM! Now you have web version of your application and you saved a lot of time/money.

###Status
Proof of concept created on hackathon. Only basic language constructs are covered. There is a lot of ugly hacks but generally speaking it worked. See [Future plans](#future).

###Dependencies
We are using [SwiftAST](https://github.com/krzKaczor/SwiftAST) to get Abstract Syntax Tree out of swift code.

###Live demo
To use live demo you have to:

1. Start grunt (default task)
2. Open in xcode playground file
3. Open in your browser (only chrome was tested) file live.html
4. Open developer console

Now, whatever you will type in xcode will be automatically translated and developer console will be reloaded with new content.

###Samples
Checkout [MatrixCalculator branch](https://github.com/krzKaczor/SwiftScript/tree/demo/MatrixCalculator) and original [ios project](https://github.com/sanderus2311/enterthematrix) (by `sanderus2311`). We have shown that SwiftScript can be used to translating models of existing ios applications.

###<a name="future">Future plans</a>

I want to focus on development of [SwiftAST](https://github.com/krzKaczor/SwiftAST) project and then start `SwiftScript` from beginning with better knowledge and experience. If you want to help me contact with me!
