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

