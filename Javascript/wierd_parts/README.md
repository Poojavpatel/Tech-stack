## Javascript - The wierd parts

1. ### Closure
    JavaScript variables can belong to the local or global scope.   
    Global variables can be made local (private) with closures.   

    > Global and local variables with the same name are different variables. Modifying one, does not modify the other.   
    > Variables created without the keyword var, are always global, even if they are created inside a function.

    ```javascript
    /*To use a closure, simply define a function inside another function and expose it. To expose a function, return it or pass it to another function.

    The inner function will have access to the variables in the outer function scope, even after the outer function has returned.*/

    var add = (function () {
    var counter = 0;
    return function () {counter += 1; return counter}
    })();
    ```
    The variable add is assigned the return value of a self-invoking function.

    The self-invoking function only runs once. It sets the counter to zero (0), and returns a function expression.

    This way add becomes a function. The "wonderful" part is that it can access the counter in the parent scope.

    This is called a JavaScript closure. It makes it possible for a function to have "private" variables.

    The counter is protected by the scope of the anonymous function, and can only be changed using the add function.
    > A closure is a function having access to the parent scope, even after the parent function has closed.
    ---


1. ### Hoisting

```javascript

```

1. ### Scope and Context

```javascript

```

1. ### Hoisting

```javascript

```

1. ### Hoisting

```javascript

```