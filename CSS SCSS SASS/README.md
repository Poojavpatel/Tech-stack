### Mixins
> A Mixin is a block of code that lets us group CSS declarations we may reuse throughout our site.
Mixins allow you to define styles that can be re-used throughout your stylesheet.    
They make it easy to avoid using non-semantic classes like . float-left , and to distribute collections of styles in libraries.   
A mixin's name can be any Sass identifier, and it can contain any statement other than top-level statements.
```css
/* Creating a Mixin */
@mixin flex {
  display: -webkit-flex;
  display: flex;
}

/* Use a Mixin */
.row {
  @include flex;
}
```

```css
/* Passing Arguments to Mixins */
@mixin grid($flex: true) {
  @if $flex {
    @include flex;
  } @else {
    display: block;
  }
}

@include grid(true);
```