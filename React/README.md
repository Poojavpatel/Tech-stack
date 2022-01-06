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

### Virtual DOM

* The Virtual DOM (VDOM) is an in-memory representation of Real DOM. The representation of a UI is kept in memory and synced with the "real" DOM. It's a step that happens between the render function being called and the displaying of elements on the screen. This entire process is called reconciliation.
* The Virtual DOM works in three simple steps.
1. Whenever any underlying data changes, the entire UI is re-rendered in Virtual DOM representation.
1. Then the difference between the previous DOM representation and the new one is calculated.
1. Once the calculations are done, the real DOM will be updated with only the things that have actually changed.

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

Redux is a predictable state container for JavaScript apps based on the Flux design pattern. Redux can be used together with React, or with any other view library. It is tiny (about 2kB) and has no dependencies.

Redux follows three fundamental principles:

1. Single source of truth: The state of your whole application is stored in an object tree within a single store. The single state tree makes it easier to keep track of changes over time and debug or inspect the application.
1. State is read-only: The only way to change the state is to emit an action, an object describing what happened. This ensures that neither the views nor the network callbacks will ever write directly to the state.
1. Changes are made with pure functions: To specify how the state tree is transformed by actions, you write reducers. Reducers are just pure functions that take the previous state and an action as parameters, and return the next state.

```jsx
// using connect
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