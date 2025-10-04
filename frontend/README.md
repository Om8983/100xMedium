# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

<!-- Features to add  -->

<!-- 1. create /profile endpoint where user info will be there and also an option to update the user info. For this create a backend endpoint to update the user info. -->

<!-- apply onclick functionality over the author image and name when particular blog post is opened and the name and image of the author is shown -->

<!-- create a route for the users who visit the particular author profile and will be able to see their blog post...
A backend request must go out that fetches the users particular data and blogs written by that user and is rendered over the screen -->

<!-- When a blog is posted the headings, titles, emphasized words must be bold and emphasized. -->

<!-- don't forget to add a "Create Blog" option on the
"/blogs" page  -->

<!-- Explanation to update profile
-> firstly on Backend I made sure that even if from frontend the input is empty, don't include the empty value field and update the user with rest of the fields
-> On frontend i had created this functional state component ::

```
 const handleChange = (field: string, changedVal: string) => {
        setChanges((prev) => ({
            ...prev, [field]: changedVal
        }))
    }
```
which onChange call set the "changes" object to include the changed username and the changed email if any.
-> added a "cancel" btn in order if user doesn't want to edit or even if he tried to do so then also no backend call will be sent

-> the whole point of adding the "fieldUpdate" state was to avoid the controlled and uncontrolled changes in react. If you want to know search about it. -->

<!-- Explanation for editor.destroy() in Tiptap.tsx -->

<!-- As we know that tiptap being an editor does the dynamic changes over the DOM tree, for instance adding text, heading, ul, ol, eventListeners, onclick's etc. That means editor mounts the nodes to the DOM tree dynamically that says editor is dynamic component and is mounted everytime the navigation happens. The editor brings the Floating & bubbleMenu with itself for structured texts.
When any navigation or any state changes happen again the editor gets loaded again. But as we said editor is a dynamic component and it gets mounted. Here if we think deeply over this, the conclusion we derive from this is, when the previous editor unmounts the changes remain the same. That means even if editor isn't there but still the dynamic menus it comes with still exists which would cause potential errors and bad user experience.

A common error you see is "hide() was called on destroyed instance"
other errors ::
Stale references: Menus or plugins trying to interact with a destroyed editor instance.
Bad user experience: Menus or UI elements behaving incorrectly or being visible when they shouldn’t.

For this reason the editor component that was mounted at initial phase needs to be UNMOUNTED to avoid these errors and have a consistent editor instance.
code :::
useEffect(() => {
editor.destroy();
}, [editor])

Consistency Across Mounts
• By cleaning up the previous editor instance, you ensure that a fresh editor instance starts from a consistent state, reducing the likelihood of bugs or stale behaviors. -->

<!-- lessons learnt while publish post  -->
<!-- 1.Always remember that while working with input box onChange() always provide a "value" before "onChange()". That means you are tieing the input box functionality with the state variable. This way if the value, later, set to empty the box will be cleared

2. Whenever working with "array" or "object" state variables. So while updating the state you got that "prev" parameter which accesst the previous states and can be used to add another state to the state variable.

3. how the filter method is efficiently used here to remove the elements from the array rather not removing but creating a new array where the current tag wasn't included. It mustn't be visible by our naked eyes though while updating that array.
This same functionality could also be performed using "splice" method -->

<!-- useEffect needed for adding highlightjs class -->
<!-- when the tiptap data / html/css data converted to json data via editor.getJson() method, the attributes and classes and styling is being removed from the html elements.
For this when we convert the json received data from backend to html, on frontend, we need to specify extensions in order to get all the data that is dependent on that extension be loaded.
Also for codeblocks, the classes are being removed during conversion. Hence the useEffect() that i use, is supposed to get the "pre code" elements via queryselector and add the highlightjs class to it.
The reason why we are using useEffect() is while applying the classes for highlight js, if has any side-effects, those must be avoided. -->

<!-- Infinite Scrolling jargons -->
<!-- 1. documentElement : if you see the docs you'll find properties named Element.scrollHeight, Element.offsetWidth etc. This "Element" is the element present within the document i.e. the main document or the root. Similarly "documentElement"  means we are targetting the root element of the document since we want the root elements height.

2. offsetHeight :: We have seen offsetHeight before when creating the "follower" in framer-motion/1-framer. The offsetHeight basically gives the height of the element including padding, border etc but excluding the "margin" of the element. Here rather targeting a single element we are targetting the entire documentElement, so we will get the total height of the documentElement.

3. scrollTop :: scrollTop determines how much the tagetted element is being scrolled from the top

4. window.innerHeight :: it returns the height of the window including the scrollbar height.
5. window.outerHeight :: it return the whole browser` window height including the topbar, that includes bookmarkbar, tabbar etc... -->

<!-- alternate way to filter the ids ( you can find this line in Blogs.tsx useEffect()) -->
<!-- const filtered = newIdBatch.filter((item) => !prev.some(existingId => existingId.id === item.id)) -->

<!-- debounceLike()  -->
<!-- i have used debounceLike to delay the like function call becuase previously I was facing issues if a user tries to simultaneously hit the like button which could lead to potential issues on the backend or far more taking the backend server down.
To avoid the concurrent request to backend i added a debounced function which would delay the post like function call to the backend.  -->

<!-- about the recoil values for the specific blog evaluation in the blogcard component -->

<!--

things to take care of
1. if the user is logged out or has no access or refresh token then a "user must relogin" page should be shown which is also called as error page and you must render it whenever this happens. I noticed it in Myblogs.tsx wheer i haven't added this error page. Make sure to add this page everywhere where it could be possible to avoid website getting broke

just mentioning where i left off.

1. also make sure on userprofilecard.tsx you design the follower counts in a mobile first design mannner.
2. make sure to create a fallback error component if post goes undefined.
  -->

<!-- the main home screen previous animation  -->
<!-- {/* the first h1 will be visible to screen-reader only "sr-only", but the other h1 won't be visible to screen-readers. While this is the opposite of how the user sees. The user would see the other h1 but won't be able to visit the first h1 */}
                    <h1 className="sr-only">{title}</h1>
                    <h1 aria-hidden className="text-7xl md:text-8xl font-[boy] font-bold ">
                        {title
                            .split("")
                            .map((letter,index) =>
                                <motion.span key={index} className={`inline-block ${letter === " " && "w-4"}`} variants={children} >
                                    {letter}
                                </motion.span>)
                        }
                    </h1> -->
