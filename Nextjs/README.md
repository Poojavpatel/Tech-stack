### NextJS Error: `window is not defined.`

Solutions on stack overflow
* Wrap code in a `useEffect` to ensure that it runs only on client side
* Use dynamic imports - if we want to use third-party libraries that access the window object. If you stumbled across window is not defined after trying to add a third-party module to your application, this is your best bet.
Example uses dynamic imports to import our previously defined Image component. Notice how we pass the parameter ssr: false as the second argument. This way we can ensure that our imported module only runs inside the context of the browser.
  ```jsx
  import dynamic from "next/dynamic";
  const Image = dynamic(() => import("./image"), { ssr: false });
  function Home() {
    return (
      <div>
        <Image src="/cat.png" />
      </div>
    );
  }
  export default Home;
  ```

Solution - 
```jsx
const Explore = (props) => {
  function loadScript(callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (
          script.readyState === "loaded" ||
          script.readyState === "complete"
        ) {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = function () {
        callback();
      };
    }
    script.src = 'https://www.livebecho.com/sdk/js/livebecho.feed.min.js';
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  useEffect(() => {
    loadScript(
      // All code using library functions her
      function () {
        window._livebecho.initializeWidget(initializeLiveBecho);
      }
    );
  }, []);
}


```