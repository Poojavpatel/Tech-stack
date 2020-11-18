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