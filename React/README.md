# React js

> Javascript Library for building User Interfaces, Developed by Facebook

## Why Use React
* Has a **massive ecosystem** and support
* React does not itself handle **Routing, state management, animation** but there are tons of libaries for each use case
* Eg- **Gatsby** for static site, **Next js** for server side rendering, **Spring** for animation, **Redux, Flux** for state mangement
* **React Native** can be used to develop mobile apps for Android and IOS
* Most in-demand skill for frontend developers

## What React Does
* We use it to build components that represent **Logical, Resuable Parts** of the UI
* A component is just a **Javascript Function** 
* The return value of this function is a HTML or UI, which is written in a special syntax called **JSX (allows to easily combine javascript with HTML markup)**
* **To pass data to a component, we pass it as props** argument, which can be then referenced inside funcion body or in the UI
* **If the value changes, React will react and update the UI**
* To give our component an internal state, we use 'useState' hook
* **The hook is just a function that return (a value, and a function to change the value)**   
Eg - const [count, setCount] = useState(0);
* Count returns the most recent value, setCount can be binded to a button click event

## React Class Components Vs. Functional Components
* They both render JSX (which is React’s way of writing HTML and JavaScript)
* Class component
  ```javascript
  class Welcome extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  }
  ```
* We define a class that extends the React.Component library
* class components must have an additional render() method for returning JSX.
* class component uses the “this” keyword
* Functional component
  ```javascript
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }

  const Welcome = (props) => { 
    return <h1>Hello, {props.name}</h1>; 
  }
  ```
* The functional component however, is exactly how it sounds, a plain old Javascript function
* functional component does not utilize “this”

### Differences
* One major way these two component types differ is how props are passed down
* For the functional component, you have to pass down props as an argument in the function explicitly
```javascript
const Welcome = (props) => { 
  return <h1>Hello, {props.name}</h1>; 
}
```
* The class component doesn’t have to explicitly pass props as an argument, it already has access to it
```javascript
// app.js
class App extends Component {
  render(){
    return <Welcome name="pooja"/>
  }
}

// welcome.js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
* State and Lifecycle Methods - We used to use class components because of "state". In the older versions of React (version < 16.8), it was not possible to use state inside functional components.
* Therefore, we needed functional components for rendering UI only, whereas we'd use class components for data management and some additional operations (like life-cycle methods).
* This has changed with the introduction of React Hooks, and now we can also use states in functional components as well