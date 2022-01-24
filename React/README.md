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

### What are the major features of React?

* It uses **VirtualDOM** instead of RealDOM considering that RealDOM manipulations are expensive.
* Supports **server-side rendering**.
* Follows **Unidirectional** data flow or data binding.
* Uses **reusable/composable** UI components to develop the view.

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

---

## Common questions

### What is the difference between Element and Component?

An *Element* is a plain object describing what you want to appear on the screen in terms of the DOM nodes or other components. *Elements* can contain other *Elements* in their props. Creating a React element is cheap. Once an element is created, it is never mutated.

The object representation of React Element would be as follows:

```javascript
const element = React.createElement(
  'div',
  {id: 'login-btn'},
  'Login'
)
```

The above `React.createElement()` function returns an object:

```
{
  type: 'div',
  props: {
    children: 'Login',
    id: 'login-btn'
  }
}
```

And finally it renders to the DOM using `ReactDOM.render()`:

```html
<div id='login-btn'>Login</div>
```

Whereas a **component** can be declared in several different ways. It can be a class with a `render()` method or it can be defined as a function. In either case, it takes props as an input, and returns a JSX tree as the output:

```javascript
const Button = ({ onLogin }) =>
  <div id={'login-btn'} onClick={onLogin}>Login</div>
```

Then JSX gets transpiled to a `React.createElement()` function tree:

```javascript
const Button = ({ onLogin }) => React.createElement(
  'div',
  { id: 'login-btn', onClick: onLogin },
  'Login'
)
```

<br/>
<br/>

### What are Pure Components

TODO 

https://medium.com/technofunnel/working-with-react-pure-components-166ded26ae48

https://www.youtube.com/watch?v=X94LfGK7I9Y


<br/>
<br/>

### What is the purpose of callback function as an argument of `setState()`?

The callback function is invoked when setState finished and the component gets rendered. Since `setState()` is **asynchronous** the callback function is used for any post action.

**Note:** It is recommended to use lifecycle method rather than this callback function.

```javascript
setState({ name: 'John' }, () => console.log('The name has updated and component re-rendered'))
```

<br/>
<br/>

### Refs 

* The ref is used to return a reference to the element. They should be avoided in most cases, however, they can be useful when you need a direct access to the DOM element or an instance of a component.

* Refs are created using React.createRef() method and attached to React elements via the ref attribute. In order to use refs throughout the component, just assign the ref to the instance property within constructor.

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }
  render() {
    return <div ref={this.myRef} />
  }
}
```

<br/>
<br/>

### Virtual DOM, Reconciliation, Diffing

* The Virtual DOM (VDOM) is an in-memory representation of Real DOM. The representation of a UI is kept in memory and synced with the "real" DOM. It's a step that happens between the render function being called and the displaying of elements on the screen. This entire process is called reconciliation.
* The Virtual DOM works in three simple steps.
1. Whenever any underlying data changes, the entire UI is re-rendered in Virtual DOM representation.
1. Then the difference between the previous DOM representation and the new one is calculated.
1. Once the calculations are done, the real DOM will be updated with only the things that have actually changed.

Virtual DOM: React uses Virtual DOM exists which is like a lightweight copy of the actual DOM(a virtual representation of the DOM). So for every object that exists in the original DOM, there is an object for that in React Virtual DOM. It is exactly the same, but it does not have the power to directly change the layout of the document. Manipulating DOM is slow, but manipulating Virtual DOM is fast as nothing gets drawn on the screen. So each time there is a change in the state of our application, virtual DOM gets updated first instead of the real DOM. You may still wonder, “Aren’t we doing the same thing again and doubling our work? How can this be faster?” Read below to understand how things will be faster using virtual DOM.

How Virtual DOM actually make the things faster: When anything new is added to the application, a virtual DOM is created and it is represented as a tree. Each element in the application is a node in this tree. So, whenever there is a change in state of any element, a new Virtual DOM tree is created. This new Virtual DOM tree is then compared with the previous Virtual DOM tree and make a note of the changes. After this, it finds the best possible ways to make these changes to the real DOM. Now only the updated elements will get rendered on the page again.

How Virtual DOM helps React: In react, everything is treated as a component be it a functional component or class component. A component can contain a state. Each time we change something in our JSX file or let’s put it in simple terms, whenever the state of any component is changed react updates it’s Virtual DOM tree. Though it may sound that it is ineffective but the cost is not much significant as updating the virtual DOM doesn’t take much time. React maintains two Virtual DOM at each time, one contains the updated Virtual DOM and one which is just the pre-update version of this updated Virtual DOM. Now it compares the pre-update version with the updated Virtual DOM and figures out what exactly has changed in the DOM like which components have been changed. This process of comparing the current Virtual DOM tree with the previous one is known as ‘diffing’. Once React finds out what exactly has changed then it updated those objects only, on real DOM. React uses something called as batch updates to update the real DOM. It just mean that the changes to the real DOM are sent in batches instead of sending any update for a single change in the state of a component. We have seen that the re-rendering of the UI is the most expensive part and React manages to do this most efficiently by ensuring that the Real DOM receives batch updates to re-render the UI. This entire proces of transforming changes to the real DOM is called Reconciliation

This significantly improves the performance and is the main reason why React and it’s Virtual DOM is much loved by developers all around.

<br/>

Diffing - The process of checking the difference between the new VDOM tree and the old VDOM tree is called "diffing". Diffing is accomplished by a heuristic O(n) algorithm.
During this process, React will deduce the minimum number of steps needed to update the real DOM, eliminating unnecessary costly changes

<br/>
<br/>


### What is JSX, How does JSX work
* JSX syntax is different than JavaScript, but while we write anything in JSX, at last, it will be converted into JavaScript using Babel. 
* When we create any component, at that time every element into the component will be transpired into a React.createElement () call. It means that every element should be converted into the React element before rendering
* Eg - 
```
render() { return ( <div> <h1>Hello World</h1> </div> ); }, 
<h1> element will be converted using React.createElement() like this.
React.createElement("h1", {}, "Hello, World");
```

<br/>
<br/>

### Event Delegation in React

> Event delegation is a method of attaching event handlers not to the elements from which you actually want to handle events, but to a higher-level element.

Perhaps the key points of delegation:

* Centralization (which makes it possible to monitor events)
* Tracking (from whom the event came)
* Filtering (decide to react or not)

Let's say you have an unordered list \<ul> with 1000 list items, and you want to do something each time a list item is clicked.    
With event delegation approach, instead of adding one event listener to each of the child items, you only add 1 event listener to the parent \<ul>. 

Should I use event delegation in React - The short answer is "No". It does not give you any noticeable performance benefit. The reason is that React already does this performance optimization internally

<br/>
<br/>

### React Children
```jsx
<Button>
  <Icon name="dollars"/>            // passing children to a Button component:
  <span>BUY NOW</span>
</Button>

function Button(props) {
  return (
    <button>
      {props.children}              // Access in button component
    </button>
  );
}
```

<br/>
<br/>

### 

<br/>
<br/>

### 

<br/>
<br/>

### What are the different phases of component lifecycle?

  The component lifecycle has three distinct lifecycle phases:

  1. **Mounting:** The component is ready to mount in the browser DOM. This phase covers initialization from `constructor()`, `getDerivedStateFromProps()`, `render()`, and `componentDidMount()` lifecycle methods.

  2. **Updating:** In this phase, the component gets updated in two ways, sending the new props and updating the state either from `setState()` or `forceUpdate()`. This phase covers `getDerivedStateFromProps()`, `shouldComponentUpdate()`, `render()`, `getSnapshotBeforeUpdate()` and `componentDidUpdate()` lifecycle methods.

  3. **Unmounting:** In this last phase, the component is not needed and gets unmounted from the browser DOM. This phase includes `componentWillUnmount()` lifecycle method.

  It's worth mentioning that React internally has a concept of phases when applying changes to the DOM. They are separated as follows

  1. **Render** The component will render without any side-effects. This applies for Pure components and in this phase, React can pause, abort, or restart the render.

  2. **Pre-commit** Before the component actually applies the changes to the DOM, there is a moment that allows React to read from the DOM through the `getSnapshotBeforeUpdate()`.

  3. **Commit** React works with the DOM and executes the final lifecycles respectively `componentDidMount()` for mounting, `componentDidUpdate()` for updating, and `componentWillUnmount()` for unmounting.
    
### What are the lifecycle methods of React?

  Before React 16.3

  - **componentWillMount:** Executed before rendering and is used for App level configuration in your root component.
  - **componentDidMount:** Executed after first rendering and here all AJAX requests, DOM or state updates, and set up event listeners should occur.
  - **componentWillReceiveProps:** Executed when particular prop updates to trigger state transitions.
  - **shouldComponentUpdate:** Determines if the component will be updated or not. By default it returns `true`. If you are sure that the component doesn't need to render after state or props are updated, you can return false value. It is a great place to improve performance as it allows you to prevent a re-render if component receives new prop.
  - **componentWillUpdate:** Executed before re-rendering the component when there are props & state changes confirmed by `shouldComponentUpdate()` which returns true.
  - **componentDidUpdate:** Mostly it is used to update the DOM in response to prop or state changes.
  - **componentWillUnmount:** It will be used to cancel any outgoing network requests, or remove all event listeners associated with the component.

  React 16.3+

  - **getDerivedStateFromProps:** Invoked right before calling `render()` and is invoked on *every* render. This exists for rare use cases where you need derived state. Worth reading [if you need derived state](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html).
  - **componentDidMount:** Executed after first rendering and where all AJAX requests, DOM or state updates, and set up event listeners should occur.
  - **shouldComponentUpdate:** Determines if the component will be updated or not. By default it returns `true`. If you are sure that the component doesn't need to render after state or props are updated, you can return false value. It is a great place to improve performance as it allows you to prevent a re-render if component receives new prop.
  - **getSnapshotBeforeUpdate:** Executed right before rendered output is committed to the DOM. Any value returned by this will be passed into `componentDidUpdate()`. This is useful to capture information from the DOM i.e. scroll position.
  - **componentDidUpdate:** Mostly it is used to update the DOM in response to prop or state changes. This will not fire if `shouldComponentUpdate()` returns `false`.
  - **componentWillUnmount** It will be used to cancel any outgoing network requests, or remove all event listeners associated with the component.



### What is context?

  *Context* provides a way to pass data through the component tree without having to pass props down manually at every level.

  For example, authenticated user, locale preference, UI theme need to be accessed in the application by many components.

  ```javascript
  const {Provider, Consumer} = React.createContext(defaultValue)
  ```


---

## React Hooks

1. useEffect
  ```jsx
  useEffect(() => {}, [])
  ```

1. useInterval()

  This useInterval isn’t a built-in React Hook; it’s a custom Hook (https://overreacted.io/making-setinterval-declarative-with-react-hooks/)

  Use setInterval in functional React component with the same API. Set your callback function as a first parameter and a delay (in milliseconds) for the second argument. You can also stop the timer passing null instead the delay.   

  The main difference between the setInterval you know and this useInterval hook is that its arguments are "dynamic"

  ```jsx
  // declare it in hooks/useInterval.js
  import { useEffect, useRef } from 'react';

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
  export default useInterval;
  ```

  ```jsx
  function CardList() {
    const callMyApi = () => {
      console.log('----------HEYYY-------');
    }
  
    useInterval(() => {
      callMyApi()
    }, 5000);

    return(<>Hello world</>)
  }
  ```


---
## Code

```jsx
// React Functional component 

import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import useCheckSize from "../../../hooks/useCheckSize";
import { object } from "prop-types";
import styles from "./reviewQuestions.module.scss";
import SwipeableBottomSheet from "react-swipeable-bottom-sheet";
import AskQuestionModal from "../../AskQuestionModal";
import { colors } from "../../utils/theme";
import { useSnackbar } from "../../Snackbar/useSnackbar";
import { Snackbar } from "../../Snackbar/snackbar";
import axios from "axios";
import _ from 'lodash';
import CONFIG_CONSTANTS from "../../../constants/apiList";
import LazyLoad from "react-lazyload";
import Loader from "react-loader-spinner";
import { useDebouncedCallback } from "use-debounce";
import { FaChevronRight } from "react-icons/fa";
import ConsultSectionMobile from '../../Banner/ConsultSectionMobile';
import SingleQna from './SingleQna';
import TopQueryResults from './TopQueryResults';
import { Modal } from "react-bootstrap";
import ClevertapReact from "clevertap-react";

const propTypes = {
  data: object,
};

const ReviewQuestions = ({ category, scrollToStamped, ratingSummary, questions, productId, userProps, customer, questionsJson }) => {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [questionAsked, setQuestionAsked] = useState('');
  const [name, setName] = useState(customer ? `${customer.firstname || ''} ${customer.lastname || ''}` : '');
  const [email, setEmail] = useState(customer ? customer.email : '');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const { isActive, message, openSnackBar } = useSnackbar();
  const [loadMoreCount, setLoadMoreCount] = useState(0);
  const [displayQuestions, setDisplayQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [topQueryTitle, setTopQueryTitle] = useState(null);
  const [topQueryTerm, setTopQueryTerm] = useState(null);
  const [topQuerySheetOpen, setTopQuerySheetOpen] = useState(false);
  const [topQueryResults, setTopQueryResults] = useState([]);
  const [isSearched, setSearched] = useState(false);
  const [searchResultsCount, setSearchResultsCount] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [disableAskQuestion, setDisableAskQuestion] = useState(false);

  const productName = questions && questions.length ? questions[0].question.productName : '';
  const productSKU = questions && questions.length ? questions[0].question.productSKU : '';
  const productUrl = questions && questions.length ? questions[0].question.productUrl : '';
  const productImageUrl = questions && questions.length ? questions[0].question.productImageUrl : '';

  const fetchMoreQuestions = () => {
    let url = `${CONFIG_CONSTANTS.url.GET_PRODUCT_QUESTIONS}?productId=${productId}&page=${loadMoreCount}`;
    if (searchTerm) {
      url += `&search=${searchTerm}`;
    }
    axios.get(url)
      .then(res => {
        setDisplayQuestions([...displayQuestions, ...res.data.results]);
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
      });
  }

  const triggerCtEvent = (query, pdp) => {
    try {
      ClevertapReact.event("Qna Query", {
        clicked: query,
        pdp: pdp
      });
    } catch (error) {
      console.log('Error on ct event:', error);
    }
  }

  useEffect(() => {
    const displayQuestions = questions && questions.length ? questions.slice(0, 3) : []
    setDisplayQuestions(displayQuestions);
  }, [questions]);

  useEffect(() => {
    if (loadMoreCount == 1) {
      if (searchTerm) {
        setLoadMoreCount(loadMoreCount + 1);
      }
      else {
        setDisplayQuestions(questions);
        setLoading(false);
      };
    }
    if (loadMoreCount > 1) {
      fetchMoreQuestions();
    }
  }, [loadMoreCount]);

  const searchInQuestionsDebounced = useDebouncedCallback(() => {
    axios.get(`${CONFIG_CONSTANTS.url.GET_PRODUCT_QUESTIONS}?search=${searchTerm}&productId=${productId}`)
      .then(res => {
        setDisplayQuestions(res.data.results);
        setSearchResultsCount(res.data.total);
      })
      .catch(e => { });
  }, 500);

  const searchTopQueryDebounced = useDebouncedCallback(() => {
    axios.get(`${CONFIG_CONSTANTS.url.GET_PRODUCT_QUESTIONS}?search=${topQueryTerm}&productId=${productId}`)
      .then(res => {
        setTopQueryResults(res.data.results);
      })
      .catch(e => { });
  }, 500);

  const removeSearchInQuestions = () => {
    setDisplayQuestions(questions)
  }

  useEffect(() => {
    if (showSnackbar) {
      _showSnackbarHandler();
      setShowSnackbar(false);
    }
  }, [showSnackbar]);

  const _showSnackbarHandler = () => {
    openSnackBar("Your Question has been submitted");
  };

  const submitAskQuestion = () => {
    if (!disableAskQuestion) {
      axios.post(`${CONFIG_CONSTANTS.url.SUBMIT_PRODUCT_QUESTION}`, {
        productId: productId,
        name: name,
        email: email,
        questionBody: questionAsked,
        productName: productName || '',
        productSKU: productSKU || '',
        productUrl: productUrl || '',
        productImageUrl: productImageUrl || ''
      },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          const newDisplayQuestions = [...displayQuestions];
          newDisplayQuestions.unshift({
            voteDown: 0,
            voteUp: 0,
            question: {
              message: questionAsked,
              dateCreated: new Date(),
              name: name
            },
            customer: {
              name: name,
              email: email
            }
          });
          setDisplayQuestions(newDisplayQuestions);
        })
        .catch(e => { console.log(e); });
    }
  }

  const size = useCheckSize();
  return (
    <LazyLoad>
      <div className={styles['review-wrapper']}>
        <div className={styles['review-search-wrapper']}>
          <div className={styles['title']}>
            <h2 style={{ textAlign: 'left' }} className="section-title-with-bottom-margin">
              {`Question & Answers`}
            </h2>
          </div>
          {
            questions && !!questions.length &&
            <div className={styles['search-bar']}>
              <input
                className={`reusable-dropdown-search-input ${styles['question-search-bar']}`}
                type='text'
                placeholder="Search questions here..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSearched(true);
                  if (e.target.value) {
                    searchInQuestionsDebounced(e.target.value);
                  } else {
                    setSearched(false);
                    removeSearchInQuestions();
                  }
                }}
              />
              <span
                onClick={() => {
                  if (searchTerm) {
                    setSearchTerm('');
                    setSearched(false);
                    removeSearchInQuestions();
                  }
                }}
              >
                <img src={searchTerm ?
                  "https://res.cloudinary.com/mosaic-wellness/image/upload/f_auto,w_27,c_limit/v1630599722/staging/Group_2221.png" :
                  "https://res.cloudinary.com/mosaic-wellness/image/upload/f_auto,w_27,c_limit/v1630569039/staging/Search.png"} />
              </span>
            </div>
          }
        </div>
        <div className={styles['qna-wrapper']}>
          {
            !isSearched && questionsJson && questionsJson.top_queries && Object.keys(questionsJson.top_queries).length > 0 &&
            <div className={styles['top-queries']}>
              <div className={styles['title']}>Top Queries</div>
              <div className={styles['query-wrapper']}>
                {
                  Object.keys(questionsJson.top_queries).map((query, index) => {
                    return (
                      <div
                        key={index}
                        className={styles['query']}
                        style={{
                          color: colors[category].primary,
                          background: colors[category].light,
                          border: `1px solid ${colors[category].lightBorder}`
                        }}
                        onClick={() => {
                          if (query && questionsJson.top_queries[query]) {
                            setTopQueryTitle(query);
                            setTopQueryTerm(questionsJson.top_queries[query]);
                            setTopQueryResults([]);
                            searchTopQueryDebounced(questionsJson.top_queries[query])
                            setTopQuerySheetOpen(true);
                            triggerCtEvent(query, productName);
                          }
                        }}
                      >{query}</div>
                    )
                  })
                }
              </div>
            </div>
          }
          {
            displayQuestions && !!displayQuestions.length &&
            displayQuestions.map((questionData, index) => {
              const entry = questionData.question;
              return (
                <SingleQna
                  entry={entry}
                  key={index}
                />
              )
            })
          }
        </div>
        <div className={styles['btn-wrapper']}>
          <div className={styles["all-reviews-btn"]}>
            <button className={`${styles["reviews-btn"]}`}
              onClick={() => {
                setDisableAskQuestion(false);
                setQuestionAsked('');
                setSheetOpen(true);
              }}
            >
              <a>{"Ask a Question"}<FaChevronRight className={`${styles["next-arrow"]}`} /></a>
            </button>
          </div>
          {
            !!displayQuestions.length &&
            (searchTerm ?
              (displayQuestions.length < searchResultsCount) :
              (!!ratingSummary.countQuestions && displayQuestions.length < ratingSummary.countQuestions)) &&
            <div className={styles["all-reviews-btn"]}>
              <button className={`${styles["loadmore-btn"]}`}
                onClick={() => {
                  setLoading(true);
                  setLoadMoreCount(loadMoreCount + 1)
                }}
              >
                <span>
                  Load More
                </span>
                {isLoading && (
                  <span className={styles["overlay"]}>
                    <Loader
                      className={styles["spinner"]}
                      type="TailSpin"
                      color="#000000"
                      height={20}
                      width={20}
                    />
                  </span>
                )}
              </button>
            </div>
          }
        </div>
      </div>
      {size < 769 ? (
        <div className="ask-question-bottomsheet">
          <SwipeableBottomSheet
            open={isSheetOpen}
            overlay={true}
            defaultOpen={false}
            // fullScreen={true}
            // marginTop={500}
            style={{ zIndex: 99999999 }}
            onChange={(isOpen) => {
              if (!isOpen) { setSheetOpen(false) }
            }}
          >
            <div className={styles['bottom-sheet']}>
              <div className={styles['scroll-me-down']}></div>
              <div className={styles['header']}>
                <div className={styles['title']}>Ask a Question</div>
                <div
                  className={styles['cross']}
                  onClick={() => {
                    setSheetOpen(false);
                  }}
                >
                  <img src="https://res.cloudinary.com/mosaic-wellness/image/upload/f_auto,w_40,c_limit/v1627675735/staging/Home/Images/Subtract.png" />
                </div>
              </div>
              <form>
                <div className={styles['ask-question-text']} style={{ color: colors[category].primary }}>Name</div>
                <input
                  className={`${styles['input-box']} ${styles['input-fixed-height']}`}
                  type="text"
                  name="review-name"
                  placeholder="Your Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  
                />
                <div className={styles['ask-question-text']} style={{ color: colors[category].primary }}>Email</div>
                <input
                  className={`${styles['input-box']} ${styles['input-fixed-height']}`}
                  type="text"
                  name="review-email"
                  placeholder="Your Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <div className={styles['ask-question-text']} style={{ color: colors[category].primary }}>Question</div>
                <textarea
                  className={styles['input-box']}
                  type="text"
                  name="question-asked"
                  placeholder="Type your question here..."
                  value={questionAsked}
                  onChange={e => setQuestionAsked(e.target.value)}
                />
              </form>
              <div className={styles['bottom-sheet-buttons']}>
                {/* <button className={`${styles["cancel-btn"]}`} onClick={() => setSheetOpen(false)}>
                Cancel
              </button> */}
                <button
                  className={`${styles["asknow-btn"]}`}
                  onClick={() => {
                    submitAskQuestion();
                    setDisableAskQuestion(true);
                    setSheetOpen(false);
                    setShowSnackbar(true);
                  }}
                  disabled={!questionAsked}
                >
                  Submit Question
                </button>
              </div>
              {questionsJson && questionsJson.consult &&
                <ConsultSectionMobile consult={questionsJson.consult} />
              }
            </div>
          </SwipeableBottomSheet>
        </div>
      ) : (
        <AskQuestionModal
          show={isSheetOpen}
          onHide={() => setSheetOpen(false)}
          category={category}
          isSheetOpen={isSheetOpen}
          setSheetOpen={setSheetOpen}
          questionAsked={questionAsked}
          setQuestionAsked={setQuestionAsked}
          showSnackbar={showSnackbar}
          setShowSnackbar={setShowSnackbar}
          submitAskQuestion={submitAskQuestion}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          disableAskQuestion={disableAskQuestion}
          setDisableAskQuestion={setDisableAskQuestion}
        />
      )}
      {
        <>
          {size < 769 ? (
            <SwipeableBottomSheet
              open={topQuerySheetOpen}
              overlay={true}
              defaultOpen={false}
              marginTop={100}
              style={{ zIndex: 99999999 }}
              onChange={(isOpen) => {
                if (!isOpen) { setTopQuerySheetOpen(false) }
              }}
            >
              <TopQueryResults
                topQueryResults={topQueryResults}
                topQueryTitle={topQueryTitle}
                topQueryTerm={topQueryTerm}
                setTopQuerySheetOpen={setTopQuerySheetOpen}
                setDisableAskQuestion={setDisableAskQuestion}
                setQuestionAsked={setQuestionAsked}
                setSheetOpen={setSheetOpen}
                setTopQueryResults={setTopQueryResults}
              />
            </SwipeableBottomSheet>
          ) : (
            <Modal
              show={topQuerySheetOpen}
              onHide={() => setTopQuerySheetOpen(false)}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              scrollable={true}
              className={"top-query-modal"}
            >
              <TopQueryResults
                topQueryResults={topQueryResults}
                topQueryTitle={topQueryTitle}
                topQueryTerm={topQueryTerm}
                setTopQuerySheetOpen={setTopQuerySheetOpen}
                setDisableAskQuestion={setDisableAskQuestion}
                setQuestionAsked={setQuestionAsked}
                setSheetOpen={setSheetOpen}
                setTopQueryResults={setTopQueryResults}
              />
            </Modal>
          )}
        </>
      }
      <Snackbar isActive={isActive} message={message} />
    </LazyLoad>
  );
};

const mapStateToProps = (state) => ({
  userProps: state.userStore,
  customer: state.userStore.customer
});

ReviewQuestions.propTypes = propTypes;
export default connect(mapStateToProps, {})(ReviewQuestions);

```

---

## Redux

> Redux is an open-source JavaScript library for managing and centralizing application state

Redux is a predictable state container for JavaScript apps based on the Flux design pattern. Redux can be used together with React, or with any other view library. It is tiny (about 2kB) and has no dependencies.

Redux follows three fundamental principles:

1. Single source of truth: The state of your whole application is stored in an object tree within a single store. The single state tree makes it easier to keep track of changes over time and debug or inspect the application.
1. State is read-only: The only way to change the state is to emit an action, an object describing what happened. This ensures that neither the views nor the network callbacks will ever write directly to the state.
1. Changes are made with pure functions: To specify how the state tree is transformed by actions, you write reducers. Reducers are just pure functions that take the previous state and an action as parameters, and return the next state.

```jsx
// A very simplified eg for very small project

const redux = require('redux');
const rootReducer = ( currentState = 0, action ) => { 
  return currentState;
};
const store = redux.createStore( rootReducer );
console.log(store.getState());
```

```jsx
// Redux folder structure
redux -> store.js, actions, reducers
reducers -> index.js, userReducer.js, cartReducer.js, ...
actions -> types.js, addUser.js, ...
```

```jsx
// redux/store.js
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

const initialState = {};

const SET_CLIENT_STATE = 'SET_CLIENT_STATE';
const bindMiddleware = (middleware) => {
  return applyMiddleware(...middleware);
};

export const makeStore = ({ isServer }) => {
  if (isServer) {
    //If it's on server side, create a store
    return createStore(rootReducer, bindMiddleware([thunkMiddleware]));
  }
  else {
    const { persistStore, persistReducer } = require("redux-persist");
    const storage = require("redux-persist/lib/storage").default;
    const persistConfig = {
      key: "nextjs",
      whitelist: ["cartStore", "userStore"],
      storage, // if needed, use a safer storage
    };
    const persistedReducer = persistReducer(persistConfig, rootReducer); // Create a new reducer with our existing reducer

    const store = createStore(
      persistedReducer,
      bindMiddleware([thunkMiddleware])
    ); // Creating the store again

    store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

    return store;
  }
}

// export an assembled wrapper
export const wrapper = createWrapper(makeStore);
export const withRedux = wrapper.withRedux;
```

```jsx
// redux/reducers/index.js
import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import userReducer from "./userReducer";

export default combineReducers({
  cartStore: cartReducer,
  userStore: userReducer
});
```

```jsx
// redux/reducers/userReducer.js
import {
  ADD_USER,
  LOGIN_USER
} from "./../actions/types";

const initialState = {
  customer: {},
  token: "",
  isLoggedIn: false
};

let addUser = (state, action) => {
  let stateObj = { ...state };
  stateObj.customer = action.payload;
  stateObj.isLoggedIn = true;
  return stateObj;
};

let loginUser = (state, action) => {
  let stateObj = { ...state };
  let token = action.payload;
  stateObj.token = token;
  stateObj.isLoggedIn = true;
  return stateObj;
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return addUser(state, action);
    case LOGIN_USER:
      return loginUser(state, action);
    default:
      return state;
  }
};
export default userReducer;
```

```jsx
// redux/actions/types.js
export const ADD_USER = "ADD_USER";
export const LOGIN_USER = "LOGIN_USER";
```

```jsx
// redux/actions/addUser.js
import { ADD_USER } from "./types";
export const addUser = (addData) => {
  return (dispatch) => {
    dispatch({
      type: ADD_USER,
      payload: addData,
    });
  };
};
```

```jsx
// access redux store into components using connect
import React from 'react'
import { connect } from 'react-redux'

class App extends React.Component {
  render() {
    return <div>{this.props.containerData}</div>
  }
}

function mapStateToProps(state) {
  return { containerData: state.data }
}

export default connect(mapStateToProps)(App)
```

```jsx
// Dispatching an action
import { connect, useDispatch } from "react-redux";

const MyComponent = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: SELECT_ADDRESS,
      address: props.customer.addresses[0],
    });
  }, [address]);
}
```