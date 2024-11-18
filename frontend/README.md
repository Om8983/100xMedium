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