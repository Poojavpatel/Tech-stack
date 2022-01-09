# Vue js

> Javascript Framework for building Front End User Interfaces

## Why Use Vue
* Simplicity but can also be scaled up for complexity - In Vue you can start simple, and add features and tools that you need to build complex web application (Build Core view layer, later can add Router, state management, CLI)
* Plugin systems allows to easliy drop in Routers, state managememt, firebase support etc
* Vue has **best of React and Angular Combined**
* Any JS developer can quickliy be a vue js developer by going through the docs, **very easy to learn**
* **Has good documentation**
* **A sigle file holds the html, styling and the js, but still keeps them seperate**, unlike angular with seperate files for each, or react where everything is combined together in JSX

## What Vue Does
* At its core, it provides a way to build **components that encapsulate data/state in your javascript**   
And then connect that state **Reactievely** to a template in HTML
* We call these components **Declarative views** as the same data input always produces the same UI output
* **When we declare data in the data object, it binds it with the HTML on the template above**
* When the data value changes, the component automatically re-renders, For this the framework uses **virtual DOM** under the hood
* We can interpolate a value/expression in the Template using double braces ( Eg - Hello {{ user }} )
* Vue Template also provides a **variety of directives to control the behaviour of HTML**
* Like v-if, v-else, v-on directive to listen to events on a element
* Methods have access to data

---
## Vuex

---
## Vue Notes

* v-show vs v-if - v-show only toggles the display CSS property of the element.   
  v-if is “real” conditional rendering because it ensures that event listeners and child components inside the conditional block are properly destroyed and re-created during toggles.   

  v-if is also lazy: if the condition is false on initial render, it will not do anything - the conditional block won’t be rendered until the condition becomes true for the first time.   

  v-show is much simpler - the element is always rendered regardless of initial condition, with CSS-based toggling.   

  Generally speaking, v-if has higher toggle costs while v-show has higher initial render costs. So prefer v-show if you need to toggle something very often, and prefer v-if if the condition is unlikely to change at runtime.

* Using v-if and v-for together is not recommended.   
When used together with v-if, v-for has a higher priority than v-if. See the list rendering guide for details.

* To auto typecast user input to a number use 
  ```
  <input v-model.number="age" type="number">
  ```
* If you want whitespace from user input to be trimmed automatically
  ```
  <input v-model.trim="msg">
  ```

---
## Syntax React vs Vue 
* Interpolation
```jsx
{ message }
```
```jsx
{{ message }}
```

---

## Example code 

### Import vue js in simple html page
```html
<html>
   <head>
      <title>VueJs Introduction</title>
      <script type = "text/javascript" src = "js/vue.js"></script>
   </head>
   <body>
      <div id = "intro" style = "text-align:center;">
         <h1>{{ message }}</h1>
      </div>
      <script type = "text/javascript">
         var vue_det = new Vue({
            el: '#intro',
            data: {
               message: 'My first VueJS Task'
            }
         });
      </script>
   </body>
</html>
```

### v-if v-show v-bind v-on v-for
```html
<div v-if="Math.random() > 0.5">Now you see me</div>
<div v-else>Now you don't</div>

<h1 v-show="ok">Hello!</h1>

<a v-bind:href="url"> ... </a>
<a :href="url"> ... </a>

<a v-on:click="doSomething"> ... </a>
<a @click="doSomething"> ... </a>

<ul id="example-2">
  <li v-for="(item, index) in items" v-bind:key="item.id">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>

<div>
  <span v-for="n in 10">{{ n }} </span>
</div>

<!-- v-for to iterate through the properties of an object -->
<div v-for="(value, name, index) in object" v-bind:key="item.id">
  {{ index }}. {{ name }}: {{ value }}
</div>

object: {
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
}
```

### v-model
```html
<!-- You can use the v-model directive to create two-way data bindings on form input, textarea, and select elements. It automatically picks the correct way to update the element based on the input type-->

<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>

<!-- `picked` is a string "a" when checked -->
<input type="radio" v-model="picked" value="a">

<!-- `toggle` is either true or false -->
<input type="checkbox" v-model="toggle">

<!-- `selected` is a string "abc" when the first option is selected -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>

<!--If you want user input to be automatically typecast as a Number-->
<input v-model.number="age" type="number">

<!--If you want whitespace from user input to be trimmed automatically-->
<input v-model.trim="msg">
```

### Modifiers
```jsx
// .prevent modifier tells the v-on directive to call event.preventDefault() on the triggered event:
<form v-on:submit.prevent="onSubmit"> ... </form>
```

### methods
```jsx
<h1>{{mydetails()}}</h1>

methods: {
  mydetails : function() {
      return "I am "+this.firstname +" "+ this.lastname;
  }
}
```

### Computed properties
```jsx
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>

// Using method
<p>Reversed message: "{{ reverseMessage() }}"</p>
methods: {
  reverseMessage: function () {
    return this.message.split('').reverse().join('')
  }
}

// Using computed roperty
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>

var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    reversedMessage: function () {
      return this.message.split('').reverse().join('')
    }
  }
})
```

### Prefer Computed over Watch
```jsx
<div id="demo">{{ fullName }}</div>

// Instead of
watch: {
  firstName: function (val) {
    this.fullName = val + ' ' + this.lastName
  },
  lastName: function (val) {
    this.fullName = this.firstName + ' ' + val
  }
}

// Use computed
computed: {
  fullName: function () {
    return this.firstName + ' ' + this.lastName
  }
}
```

### Watchers
```jsx
var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    // whenever question changes, this function will run
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
  created: function () {
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },
  methods: {
    getAnswer: function () {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)'
        return
      }
      this.answer = 'Thinking...'
      var vm = this
      axios.get('https://yesno.wtf/api')
        .then(function (response) {
          vm.answer = _.capitalize(response.data.answer)
        })
        .catch(function (error) {
          vm.answer = 'Error! Could not reach the API. ' + error
        })
    }
  }
})
```

### Class bindings
```jsx
<div v-bind:class="{ active: isActive }"></div>
// The above syntax means the presence of the active class will be determined by the truthiness of the data property isActive.

<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>

// We can also bind to a computed property that returns an object
<div v-bind:class="classObject"></div>

computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}

// using ternery
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
```

### Style Bindings
```jsx
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
data: {
  activeColor: 'red',
  fontSize: 30
}

// cleaner way
<div v-bind:style="styleObject"></div>
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

### Props and emit
```
```

```js
<template>
  <div id="app">
   <div class="container">
      <div class="row">
          <table id="mytable" class="table table-bordred table-striped">
              <thead>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Status</th>
                  <th>Remarks</th>
              </thead>
              <tbody>
                  <tr v-for="user in users" :key="user.Name">
                    <td>{{ user.Name || '-' }}</td>
                    <td>{{ user.Email || '-' }}</td>
                    <td>{{ user.Mobile || '-' }}</td>
                    <td>{{ user.status || '-' }}</td>
                    <td>{{ user.remark || '-' }}</td>
                  </tr>
              </tbody>
          </table>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable max-len */
import axios from 'axios';
export default {
  name: 'app',
  data() {
    return {
      users: [],
    };
  },
  async mounted() {
    const response = await axios.get('http://localhost:5000/users');
    const hash = {};
    if (response.data) {
      response.data.forEach((user) => {
        const data = { ...user, status: 'Valid', remark: 'No Remarks' };
        const invalidData = !data.Name || !this.isValidEmail(data.Email) || !this.isValidMobile(data.Mobile);
        const isDuplicate = hash[data.Name] || hash[data.Email] || hash[data.Mobile];
        if (invalidData || isDuplicate) {
          data.status = 'Invalid';
          if (!data.Name) {
            data.remark = 'Name not present';
          }
          if (!this.isValidEmail(data.Email)) {
            data.remark = 'Invalid Email';
          }
          if (!this.isValidMobile(data.Mobile)) {
            data.remark = 'Invalid Mobile';
          }
          if (hash[data.Name]) {
            data.remark = 'Duplicate Name';
          }
          if (hash[data.Email]) {
            data.remark = 'Duplicate Email';
          }
          if (hash[data.Mobile]) {
            data.remark = 'Duplicate Mobile';
          }
        } else {
          if (!hash[data.Name]) hash[data.Name] = true;
          if (!hash[data.Email]) hash[data.Email] = true;
          if (!hash[data.Mobile]) hash[data.Mobile] = true;
        }
        this.users.push(data);
      });
    }
  },
  methods: {
    isValidEmail(email) {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      return !!email && typeof email === 'string' && email.match(emailRegex);
    },
    isValidMobile(mobile) {
      const mobRegex = /^[789]\d{9}$/;
      return !!mobile && mobile.match(mobRegex);
    },
  },
};
</script>

<style>
</style>
```

```jsx
<template>
  <div id="app">
    <h1>Welcome to Customers data</h1>
    <Addcustomer></Addcustomer>
    <Customers v-bind:customers="customers"></Customers>
    <Download></Download>
  </div>
</template>

<script>
import axios from 'axios';
import Customers from './components/Customers';
import Addcustomer from './components/Addcustomer'
import Download from './components/Download'
export default {
  name: 'app',
  components: {
    Customers,
    Addcustomer,
    Download
  },
  data(){
    return{
      customers:[],
    }
  },
  mounted(){
    axios.get('http://localhost:3000/api/customers/listcustomers')
    .then((response) => {
      this.customers = response.data.custlist;
    })
    .catch("error in fetching - axios")
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}
</style>
```

```jsx
<template>
    <div>
        <h1>This is todos component embeded in app</h1>
        <div v-bind:key="todo.id" v-for="todo in todos">
            <p>{{todo.name}}</p>
            <Todoitem v-bind:todo="todo"></Todoitem>
        </div>
    </div>
</template>

<script>
import Todoitem from './Todoitem'
export default {
    name:'Todos',
    components:{
        Todoitem,
    },
    props:["todos"],
    data(){
        return{
        }
    }
}
</script>

<style>
</style>
```

```jsx
<template>
    <div v-bind:class="{'iscomplete':todo.completed}">
        <p>
        {{todo}}
        </p>
    </div>
</template>

<script>
export default {
    name:"Todoitem",
    props:["todo"],
}
</script>

<style scoped>
    .iscomplete{
        text-decoration: line-through;
    }
</style>
```