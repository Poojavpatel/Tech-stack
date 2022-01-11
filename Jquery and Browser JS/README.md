```js
import $ from "jquery";

const rootApp = document.getElementById("root");
rootApp.innerHTML = `<div id="mainArea">
  <p>button count: <span class="count">0</span></p>
  <button id="mainButton">Increase</button>
</div>`;

$("#mainButton").click((evt) => {
  // get current counter
  const currentCount = $(".count")[0].innerHTML;
  // increase counter by 1 and set latest counter
  $(".count")[0].innerHTML = parseInt(currentCount) + 1;
});
```

### HTML5 form validations
```html
<input type="email" name="email" required placeholder="Enter a valid email address">
<input type="url" name="website" required>
<input type="number" size="6" name="age" min="18" max="99" value="21"><br>
input type="url" pattern="https?://.+"
input type="text" pattern="\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}"
input type="text" pattern="\d{1,2}/\d{1,2}/\d{4}"
```

### Event capturing and Event Bubbling
> Capturing happens before bubbling. The three phases of event propagation are: capturing, target, and bubbling.
* Event capturing is one of two ways to do event propagation in the HTML DOM. 
* In event capturing, an event propagates from the outermost element to the target element. It is the opposite of event bubbling, where events propagate outwards from the target to the outer elements.
* 